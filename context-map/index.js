import { createProjection } from './projection.js';
// Mirrors the installed Session surface interpreter; keeps a directory-linked bundle self-contained.
const types = new Set(['system/message', 'developer/message', 'user/message', 'assistant/message', 'tool/result']);
function isSurfaceEvent(event) { return event&&types.has(event.type) && event.surfaceOp !== undefined; }
function deriveEventMessage(event) {
  if(!event||!event.data)return null;
  if (event.type === 'user/message') return event.data||null;
  if (event.type === 'tool/result') return event.data?.message||null;
  if (['system/message', 'developer/message', 'assistant/message'].includes(event.type)) {
    const msg=event.data?.message;
    return msg&&Array.isArray(msg.content)&&msg.content.length?msg:null;
  }
  return null;
}

export const inject = ['sessionProjections', 'tokenMeter'];
export function apply(ctx) {
  if(!ctx||!ctx.sessionProjections||!ctx.tokenMeter){
    console.warn('@local/dsh-context-map: apply() called with incomplete context');
    return;
  }
  ctx.sessionProjections.register(createProjection(message => ctx.tokenMeter.estimateMessage(message), deriveEventMessage, isSurfaceEvent));
}
