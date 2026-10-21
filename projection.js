import { z } from 'zod';

const count=z.number().int().nonnegative();
const segment=z.object({kind:z.enum(['prompt','tools','memory','user','assistant']),tokens:count,seq:z.number().int(),def:z.boolean().optional()});
const node=z.object({seq:z.number().int(),segments:z.array(segment)});
const request=z.object({seq:count,turn:count,step:count,attempt:count,provider:z.string(),model:z.string(),time:z.number(),status:z.enum(['success','failed']),segments:z.array(segment),estimated:count,usageInput:count.nullable(),contextWindow:count.positive().nullable()});
const view=z.object({requests:z.array(request),pending:z.boolean(),dropped:count});
const stateSchema=z.object({surface:z.array(node),header:z.object({seq:z.number().int(),provider:z.string(),model:z.string(),toolTokens:count}),contextWindow:count.positive().nullable(),open:z.object({turn:count,step:count,attempt:count}).nullable(),requests:z.array(request),dropped:count});

/** Pure log fold. Inject the installed Harness message interpreter and estimator. No content is retained. */
export function createProjection(estimateMessage,deriveEventMessage,isSurfaceEvent) {
  function segmentsOf(event) {
    const message=deriveEventMessage(event);
    if(!message)return [];
    const price=Math.max(0,Math.round(estimateMessage(message)));
    const base=event.type==='system/message'||event.type==='developer/message'?'prompt':event.type==='tool/result'?'tools':event.type==='assistant/message'?'assistant':'user';
    const memory=event.type==='user/message'&&event.data?.source?.kind==='compact-checkpoint';
    if(memory)return [{kind:'memory',tokens:price,seq:event.seq}];
    const toolBlocks=message.content&&Array.isArray(message.content)?message.content.filter(b=>['tool-call','tool-addition','tool-removal'].includes(b.type)):[];
    if(!toolBlocks.length)return [{kind:base,tokens:price,seq:event.seq}];
    if(toolBlocks.length===message.content.length)return [{kind:'tools',tokens:price,seq:event.seq}];
    // Both partial estimates contain role framing; subtract it before allocating a mixed message.
    const tools=Math.min(price,Math.max(0,Math.round(estimateMessage({...message,content:toolBlocks}))-4));
    return [{kind:base,tokens:price-tools,seq:event.seq},{kind:'tools',tokens:tools,seq:event.seq}];
  }
  return {
    key:'contextMap',stateVersion:2,stateSchema,
    init:(sessionId)=>({surface:[],header:{seq:-1,provider:'',model:'',toolTokens:0},contextWindow:null,open:null,requests:[],dropped:0}),
    apply(state,event,context) {
      // Guard against undefined state or event
      if(!state||!event||!event.type)return state||{surface:[],header:{seq:-1,provider:'',model:'',toolTokens:0},contextWindow:null,open:null,requests:[],dropped:0};
      let next=state;
      const data=event.data||{};
      if(event.type==='step/start'){
        const {turn,step}=data;
        if(turn!==undefined&&step!==undefined)next={...next,open:{turn,step,attempt:0}};
      }
      else if(event.type==='step/end')next={...next,open:null};
      else if(event.type==='request/header') {
        const header=data.header;
        if(header&&header.config){
          next={...next,header:{seq:event.seq,provider:header.config.provider||'',model:header.config.model||'',toolTokens:header.tools?.length?Math.ceil(JSON.stringify(header.tools).length/4)+4:0}};
        }
      } else if(event.type==='request/context'){
        const {contextWindow}=data;
        next={...next,contextWindow:Number.isFinite(contextWindow)&&contextWindow>0?contextWindow:null};
      }
      if(event.type==='assistant/message'||event.type==='assistant/attempt') {
        const {turn,step,usage}=data;
        const open=next.open;
        if(open&&turn!==undefined&&step!==undefined&&open.turn===turn&&open.step===step) {
          const segments=next.surface.flatMap(n=>n.segments);
          if(next.header.toolTokens)segments.push({kind:'tools',tokens:next.header.toolTokens,seq:next.header.seq,def:true});
          const usageInput=usage?.inputTokens;
          const snapshot={seq:event.seq,turn,step,attempt:open.attempt+1,provider:next.header.provider,model:next.header.model,time:event.time,status:event.type==='assistant/message'?'success':'failed',segments,estimated:segments.reduce((n,s)=>n+s.tokens,0),usageInput:Number.isInteger(usageInput)&&usageInput>=0?usageInput:null,contextWindow:next.contextWindow};
          const requests=[...next.requests,snapshot];
          const excess=Math.max(0,requests.length-256);
          next={...next,open:{...open,attempt:open.attempt+1},requests:excess?requests.slice(excess):requests,dropped:next.dropped+excess};
        }
      }
      if(isSurfaceEvent(event)) {
        const priced={seq:event.seq,segments:segmentsOf(event)};
        if(event.surfaceOp==='append')next={...next,surface:[...next.surface,priced]};
        else {
          const {startSeq,endSeq}=event.surfaceOp;
          const start=next.surface.findIndex(n=>n.seq===startSeq),end=next.surface.findIndex(n=>n.seq===endSeq);
          if(start<0||end<start)return next;
          next={...next,surface:[...next.surface.slice(0,start),priced,...next.surface.slice(end+1)]};
        }
      }
      return next;
    },
    wire:{viewSchema:view,view:state=>({requests:state.requests,pending:state.open!==null,dropped:state.dropped})}
  };
}
