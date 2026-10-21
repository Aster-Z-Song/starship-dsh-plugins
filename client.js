window.__ModuleLoader__.load({
  id: '@local/dsh-context-map',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const colors = {prompt:'#9ca3af',tools:'#34d058',memory:'#ff9f40',user:'#50b5ff',assistant:'#ff6b6b'};
    const dicts = {
      zh: {tab:'上下文',title:'上下文窗口',subtitle:'每格 1k tokens · 按模型输入顺序排列',latest:'跟随最新',request:'模型请求',previous:'上一次',next:'下一次',empty:'模型尝试结算后，这里会显示输入上下文。',loading:'正在等待上下文数据；如持续未更新，请刷新页面。',estimated:'输入估算',reported:'模型报告输入',unreported:'未报告',prompt:'Prompt · 系统 / 开发者指令',tools:'Tool · 定义 / 调用 / 结果',memory:'Memory · 压缩摘要',user:'用户消息',assistant:'助手历史',note:'分类和格子使用启发式 token 估算，可能与模型计费值不同。Memory 表示日志中的压缩摘要；图片也按启发式估算。',pending:'当前模型步骤尚未结算，下面显示最近已记录的尝试。',failed:'未成功结算',success:'已结算',details:'分类占用',order:'格子横向从左到右、逐行连续；混合格按占比分色，末格保留空白。',range:'token 范围',cell:'格子',retained:'仅保留最近 256 次尝试',tokens:'tokens',unknown:'未知模型',requestLabel:'轮 / 步 / 尝试',none:'暂无可展示的输入',summary:'请求摘要',free:'空闲',capacity:'窗口容量',capacityUnknown:'窗口容量未提供，仅展示已占用格子',messageDetails:'消息详情',close:'关闭',resizePanel:'拖动调整宽度，向右拖至边缘收起',closeHint:'点击外部空白或按 Esc 关闭',loadingMessage:'正在读取消息…',noMessage:'这个格子是空闲容量，没有对应消息。',unavailable:'未能读取对应的历史消息',compressionRate:'压缩率',compressionRateTip:'压缩摘要占总输入的比例。越高表示历史对话被压缩得越有效，可以容纳更多轮次。',toolDensity:'工具密度',toolDensityTip:'工具调用结果占总输入的比例。高密度表示这次对话偏向实操和工具使用，而非纯聊天。',health:'健康度',healthTip:'综合评分（0-100）。考虑窗口利用率和分类平衡。绿色≥70良好，橙色50-69需注意，红色<50可考虑 fork 会话。',healthGood:'良好',healthWarning:'注意',healthPoor:'较差',suggest:'优化建议',suggestFork:'窗口即将饱和，建议 fork 会话以保证性能',suggestCompact:'助手历史占比过高，考虑触发自动压缩',suggestBalance:'工具密度过高，工具定义可能冗余',trend:'最近 10 次趋势',trendUp:'上升',trendDown:'下降',trendStable:'稳定',delta:'较上次变化',deltaNew:'新增',deltaReused:'复用',deltaRemoved:'移除',deltaNone:'这是首次记录的请求',topItems:'最大占用项',topItemsEmpty:'暂无数据',itemTokens:'tokens',itemShare:'占比',balance:'分布均衡',balanceTip:'各类别占比中最大的一类所占的百分比。越接近 100% 说明上下文分布越均匀，没有被单一类别挤满。',modelFit:'模型容量对照',modelFitNote:'基于本会话观测到的模型窗口',modelFitOk:'可容纳',modelFitShort:'装不下',modelFitUnknown:'窗口未知',export:'导出',exportMd:'复制 Markdown',exportJson:'复制 JSON',exportDone:'已复制到剪贴板',exportFailed:'复制失败',composition:'输入构成',grew:'增长',toolDefs:'工具定义（每请求重复）',preview:'预览',previewLoading:'读取中…',previewFailed:'无法读取',keyboardHint:'方向键在格子间移动，回车打开详情'},
      en: {tab:'Context',title:'Context window',subtitle:'1k tokens per cell · model input order',latest:'Follow latest',request:'Model request',previous:'Previous',next:'Next',empty:'Input context appears after a model attempt settles.',loading:'Waiting for context data. Refresh the page if it does not update.',estimated:'Estimated input',reported:'Reported input',unreported:'Not reported',prompt:'Prompt · system / developer',tools:'Tool · definitions / calls / results',memory:'Memory · compaction summary',user:'User messages',assistant:'Assistant history',note:'Categories and cells use heuristic token estimates and may differ from provider usage. Memory means a logged compaction summary; image pricing is also heuristic.',pending:'The current model step has not settled. Showing the latest recorded attempts.',failed:'Unsuccessful attempt',success:'Settled',details:'Category occupancy',order:'Cells flow left to right, then down. Mixed cells show proportions; the last cell retains unused space.',range:'Token range',cell:'Cell',retained:'Only the latest 256 attempts are retained',tokens:'tokens',unknown:'Unknown model',requestLabel:'Turn / step / attempt',none:'No input to display',summary:'Request summary',free:'Free',capacity:'Window capacity',capacityUnknown:'Window capacity unavailable; showing occupied cells only',messageDetails:'Message details',close:'Close',resizePanel:'Resize panel; drag right to collapse',closeHint:'Click outside or press Esc to close',loadingMessage:'Loading messages…',noMessage:'This cell is free capacity and contains no message.',unavailable:'Could not read the historical message',compressionRate:'Compression',compressionRateTip:'Ratio of compaction summary to total input. Higher ratio means history is compressed more efficiently, fitting more turns in context.',toolDensity:'Tool density',toolDensityTip:'Ratio of tool results to total input. High density indicates this conversation is tool-heavy rather than pure chat.',health:'Health',healthTip:'Composite score (0–100) balancing window usage and category distribution. Green ≥70: good. Orange 50–69: watch. Red <50: consider forking.',healthGood:'Good',healthWarning:'Warning',healthPoor:'Poor',suggest:'Recommendations',suggestFork:'Context window nearly full; consider forking to maintain performance.',suggestCompact:'Assistant history too high; try triggering auto-compaction.',suggestBalance:'Tool density too high; tool definitions may be redundant.',trend:'Last 10 requests',trendUp:'Rising',trendDown:'Falling',trendStable:'Stable',delta:'Change vs previous',deltaNew:'Added',deltaReused:'Reused',deltaRemoved:'Removed',deltaNone:'This is the first recorded request',topItems:'Largest consumers',topItemsEmpty:'No data',itemTokens:'tokens',itemShare:'share',balance:'Balance',balanceTip:'Share of the single largest category. Closer to 100% means the context is dominated by one kind of content.',modelFit:'Model capacity',modelFitNote:'From models observed in this session',modelFitOk:'Fits',modelFitShort:'Too small',modelFitUnknown:'Window unknown',export:'Export',exportMd:'Copy Markdown',exportJson:'Copy JSON',exportDone:'Copied to clipboard',exportFailed:'Copy failed',composition:'Input composition',grew:'Grew',toolDefs:'Tool definitions (repeated per request)',preview:'Preview',previewLoading:'Loading…',previewFailed:'Cannot read',keyboardHint:'Arrow keys move between cells; Enter opens details'},
    };
    const css = `
.cm-root{height:100%;min-height:0;overflow:auto;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-size:13px;box-sizing:border-box}
.cm-inner{max-width:1000px;margin:0 auto;padding:28px 24px 40px}.cm-title{font-size:22px;font-weight:600;margin:0 0 6px}.cm-muted{color:var(--dsw-alias-label-secondary);line-height:1.6}.cm-toolbar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:24px 0 16px}.cm-control{font:inherit;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:7px;min-height:34px;padding:6px 10px}.cm-control:focus-visible,.cm-cell:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:3px}.cm-control:disabled{opacity:.4}.cm-select{flex:1;min-width:180px;max-width:100%}.cm-stats{display:flex;gap:30px;flex-wrap:wrap;padding:18px 0}.cm-usage-box{flex:1;min-width:240px}.cm-usage-percent{font-size:40px;font-weight:600;font-variant-numeric:tabular-nums;line-height:1.3;margin:8px 0}.cm-usage-bar{height:8px;background:var(--dsw-alias-bg-layer-2);border-radius:999px;margin:12px 0;overflow:hidden}.cm-number{font-size:25px;font-weight:600;font-variant-numeric:tabular-nums;line-height:1.5}.cm-efficiency{display:flex;gap:16px;margin:20px 0;padding:16px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:10px}.cm-metric{flex:1;min-width:0}.cm-metric-value{font-size:28px;font-weight:600;font-variant-numeric:tabular-nums;margin:4px 0}.cm-metric-label{font-size:11px;color:var(--dsw-alias-label-secondary);text-transform:uppercase;letter-spacing:0.5px}.cm-health-good{color:#34d058}.cm-health-warning{color:#ff9f40}.cm-health-poor{color:#ff6b6b}.cm-trend{margin:14px 0;padding:12px 14px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:10px}.cm-trend-head{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--dsw-alias-label-secondary);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px}.cm-trend-svg{display:block;width:100%;height:44px;overflow:visible}.cm-panel-card{padding:14px;margin:14px 0}.cm-card-title{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:var(--dsw-alias-label-secondary);margin-bottom:10px}.cm-delta-row{display:flex;flex-wrap:wrap;gap:14px;font-size:12px;font-variant-numeric:tabular-nums;margin-bottom:10px}.cm-delta-add{color:#34d058}.cm-delta-reuse{color:var(--dsw-alias-label-secondary)}.cm-delta-remove{color:#ff6b6b}.cm-items{display:flex;flex-direction:column;gap:7px}.cm-item{display:flex;align-items:center;gap:8px;font-size:12px;line-height:1.5}.cm-item-dot{width:8px;height:8px;border-radius:2px;flex:none}.cm-item-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cm-item-bar{flex:1;min-width:40px;height:5px;background:var(--dsw-alias-bg-layer-2);border-radius:3px;overflow:hidden}.cm-item-bar>span{display:block;height:100%;border-radius:3px}.cm-item-value{flex:none;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary)}.cm-item-button{width:100%;font:inherit;color:inherit;background:none;border:0;padding:0;text-align:left;cursor:pointer}.cm-item-button:hover .cm-item-name{text-decoration:underline}.cm-item-preview{margin:2px 0 6px;padding:8px 10px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:7px;font:11px/1.6 ui-monospace,monospace;white-space:pre-wrap;overflow-wrap:anywhere;max-height:150px;overflow:auto;user-select:text}.cm-composition{display:flex;height:14px;border-radius:5px;overflow:hidden;background:var(--dsw-alias-bg-layer-2)}.cm-composition-part{display:block;height:100%;min-width:1px}.cm-axis{position:relative;height:14px;margin-top:2px}.cm-axis-tick{position:absolute;top:0;transform:translateX(-50%);font-size:10px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}.cm-axis-tick::before{content:'';position:absolute;left:50%;top:-3px;width:1px;height:3px;background:var(--dsw-alias-border-l2)}.cm-cell-related{outline:2px solid var(--dsw-alias-label-primary);outline-offset:-1px}.cm-delta-grow{color:#ff9f40}.cm-card{border:1px solid var(--dsw-alias-border-l1);border-radius:12px;padding:20px;background:var(--dsw-alias-bg-layer-1)}.cm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(16px,1fr));gap:4px;margin:20px 0}.cm-cell{aspect-ratio:1;border:1px solid var(--dsw-alias-border-l1);border-radius:4px;min-width:0;padding:0;background:var(--dsw-alias-bg-layer-2)}.cm-legend{display:flex;flex-wrap:wrap;gap:10px 20px;line-height:1.7}.cm-dot{display:inline-block;width:9px;height:9px;border-radius:2px;margin-right:7px}.cm-row{display:flex;justify-content:space-between;gap:16px;line-height:2.3}.cm-bar{height:5px;background:var(--dsw-alias-bg-layer-2);border-radius:3px;margin-bottom:8px;overflow:hidden}.cm-note{margin-top:20px;font-size:12px;line-height:1.7}.cm-status{padding:10px 12px;border:1px solid var(--dsw-alias-border-l1);border-radius:7px;margin:12px 0}.cm-detail{min-height:48px;padding:10px 0;border-top:1px solid var(--dsw-alias-border-l1)}@media(max-width:520px){.cm-inner{padding:20px 14px}.cm-card{padding:14px}.cm-stats{gap:20px}.cm-efficiency{flex-direction:column;gap:12px}}
`;
    const interactionCss=`.cm-tooltip{position:fixed;z-index:40;pointer-events:none;width:min(320px,calc(100vw - 24px));max-height:220px;overflow:hidden;white-space:pre-wrap;overflow-wrap:anywhere;padding:12px;border:1px solid var(--dsw-alias-border-l2);border-radius:9px;background:#1a1e2b;color:#eee9f6;box-sizing:border-box;font-size:12px;line-height:1.6}.cm-detail{white-space:pre-wrap;overflow-wrap:anywhere}.cm-cell{cursor:pointer}.cm-dialog{color:#eee9f6;background:#131822;border:1px solid #3a4454;border-radius:12px;box-shadow:0 16px 64px color-mix(in srgb,var(--dsw-alias-label-primary) 20%,transparent);width:min(760px,calc(100vw - 48px));max-height:80vh;padding:20px;box-sizing:border-box}.cm-dialog .cm-muted{color:#c1b5ce}.cm-dialog .cm-control{color:#eee9f6;background:#1a1e2b;border-color:#3a4454}.cm-dialog .cm-message{border-color:#2a3241}.cm-dialog::backdrop{background:#0a0d12cc}.cm-dialog-head{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:16px}.cm-dialog-body{overflow:auto;max-height:60vh}.cm-message{border-top:1px solid var(--dsw-alias-border-l1);padding:14px 0}.cm-message pre{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.7 ui-monospace,monospace;margin:10px 0;user-select:text}.cm-dialog .cm-control:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}`;
    function makeCells(segments) {
      const cells=[]; let position=0;
      for(const seg of segments) {
        let remaining=Math.max(0,Math.round(seg.tokens));
        while(remaining>0) {
          const index=Math.floor(position/1000), offset=position%1000, n=Math.min(1000-offset,remaining);
          if(!cells[index]) cells[index]={parts:[],used:0};
          cells[index].parts.push({kind:seg.kind,tokens:n,seq:seg.seq});
          cells[index].used+=n;position+=n;remaining-=n;
        }
      }
      return cells;
    }
    function messageBody(event) {
      if(event.type==='request/header')return JSON.stringify(event.data.header.tools || [],null,2);
      const message=event.type==='user/message'?event.data:event.data.message;
      if(!message)return JSON.stringify(event.data,null,2);
      return (message.content || []).map(block=>{
        if(block.type==='text'||block.type==='reasoning')return block.text;
        if(block.type==='tool-call')return `${block.name}\n${typeof block.arguments==='string'?block.arguments:JSON.stringify(block.arguments,null,2)}`;
        return JSON.stringify(block,null,2);
      }).join('\n\n');
    }
    /** Short human label for one logged item, read on demand from the session history. */
    function labelOf(event,body) {
      if(event.type==='request/header')return 'tools';
      const data=event.data||{};
      const message=data.message||data;
      const name=data.toolName||data.name||message.toolName||message.name
        ||(Array.isArray(message.content)?message.content.find(b=>b.type==='tool-call')?.name:undefined);
      if(name)return String(name);
      const match=/"(?:toolName|name)"\s*:\s*"([^"]+)"/.exec(body);
      if(match)return match[1];
      const first=(body.split('\n').find(line=>line.trim())||'').trim();
      return first.slice(0,42)||`#${event.seq}`;
    }
    function MessageDialog({cell,index,t,readMessages,onClose}) {
      const dialog=React.useRef(null);
      const [result,setResult]=React.useState(null);
      const [error,setError]=React.useState(null);
      React.useEffect(()=>{
        const node=dialog.current;
        node.showModal();
        let active=true;
        readMessages([...new Set(cell.parts.map(p=>p.seq))]).then(rows=>{if(active)setResult(rows);},err=>{if(active)setError(String(err.message||err));});
        return ()=>{active=false;node.close();};
      },[]);
      return h('dialog',{ref:dialog,className:'cm-dialog','aria-label':`${t('cell')} ${index+1}`,onCancel:e=>{e.preventDefault();onClose();},onClick:e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose();}}},
        h('div',{className:'cm-dialog-head'},h('strong',null,`${t('cell')} ${index+1} · ${t('messageDetails')}`),h('button',{type:'button',className:'cm-control',onClick:onClose,autoFocus:true,'aria-label':t('close')},'×')),
        h('div',{className:'cm-dialog-body'},!result&&!error?h('div',{role:'status'},t('loadingMessage')):null,error?h('div',{role:'alert'},error):null,
          result?.length===0?h('p',null,t('noMessage')):null,
          result?.map(row=>h('article',{key:row.seq,className:'cm-message'},h('div',{className:'cm-muted'},`#${row.seq} · ${row.type}`),h('pre',null,row.body)))),
        h('div',{className:'cm-note cm-muted'},t('closeHint')));
    }
    function View(props) {
      const data=props.useProjection('contextMap');
      const [selected,setSelected]=React.useState(null);
      const [hover,setHover]=React.useState(null);
      const [preview,setPreview]=React.useState('');
      const [anchor,setAnchor]=React.useState(null);
      const [opened,setOpened]=React.useState(null);
      const [metricTip,setMetricTip]=React.useState(null);
      const [cluster,setCluster]=React.useState(null);
      const [focusCell,setFocusCell]=React.useState(0);
      const [expanded,setExpanded]=React.useState(null);
      const [exportState,setExportState]=React.useState(null);
      const gridRef=React.useRef(null);
      const cellRefs=React.useRef(new Map());
      const hoverRequest=React.useRef(0);
      const hoverTimer=React.useRef(null);
      function dismissPreview(){clearTimeout(hoverTimer.current);setAnchor(null);setMetricTip(null);++hoverRequest.current;}
      function showMetricTip(metric,event){
        const rect=event.currentTarget.getBoundingClientRect();
        setMetricTip({metric,left:rect.left,top:rect.top-8});
      }
      const readMessages=React.useCallback(async(seqs)=>{
        if(!seqs.length)return [];
        const binding=props.getBinding(props.sessionId);
        if(!binding)throw new Error(props.t('unavailable'));
        await binding.session.loadThrough(Math.min(...seqs));
        const entries=binding.eventSource.getSnapshot().entries;
        const wanted=new Set(seqs);
        const records=new Map(entries.filter(e=>e.type==='event'&&wanted.has(e.event.seq)).map(e=>[e.event.seq,e]));
        return seqs.map(seq=>{
          const record=records.get(seq);
          if(!record)return {seq,type:props.t('unavailable'),body:props.t('unavailable'),label:`#${seq}`};
          const body=messageBody(record.event);
          return {seq,type:record.event.type,body,label:labelOf(record.event,body)};
        });
      },[props.sessionId,props.getBinding,props.t]);
      function previewCell(i,event){
        const rect=event.currentTarget.getBoundingClientRect();
        setAnchor({left:Math.max(12,Math.min(rect.left,window.innerWidth-340)),top:rect.top>240?rect.top-12:rect.bottom+12,above:rect.top>240});
        setHover(i);
        // Highlight every cell that shares a message with this one.
        const seqs=new Set((cells[i]?.parts||[]).map(p=>p.seq));
        setCluster(seqs.size?seqs:null);
        const cell=cells[i];
        if(!cell||cell.parts.length===0){setPreview('');return;}
        const kinds={};
        for(const p of cell.parts){kinds[p.kind]=(kinds[p.kind]||0)+p.tokens;}
        const lines=Object.entries(kinds).map(([k,n])=>`${t(k)}: ${fmt(n)}`);
        if(cell.used<1000)lines.push(`${t('free')}: ${fmt(1000-cell.used)}`);
        setPreview(lines.join('\n'));
      }
      function columnCount(){
        const grid=gridRef.current;
        if(!grid)return 1;
        const template=getComputedStyle(grid).gridTemplateColumns;
        return Math.max(1,template.split(' ').filter(Boolean).length);
      }
      function moveFocus(from,key){
        const columns=columnCount();
        let next=from;
        if(key==='ArrowLeft')next=from-1;
        else if(key==='ArrowRight')next=from+1;
        else if(key==='ArrowUp')next=from-columns;
        else if(key==='ArrowDown')next=from+columns;
        else if(key==='Home')next=0;
        else if(key==='End')next=cells.length-1;
        else return;
        if(next<0||next>=cells.length)return;
        setFocusCell(next);
        const node=cellRefs.current.get(next);
        if(node){node.focus();node.scrollIntoView({block:'nearest'});}
      }
      function exportSnapshot(format){
        if(!request)return;
        const lines=[
          `# ${t('title')} — ${request.model||t('unknown')}`,
          '',
          `- ${t('estimated')}: ${request.estimated} / ${request.contextWindow||'?'} ${t('tokens')}`,
          `- ${t('reported')}: ${request.usageInput===null?t('unreported'):request.usageInput}`,
          `- ${t('requestLabel')}: ${request.turn} / ${request.step} / ${request.attempt}`,
          `- ${new Date(request.time).toISOString()}`,
          '',
          `## ${t('details')}`,
          ...Object.entries(totals).map(([k,n])=>`- ${t(k)}: ${n} (${sum?Math.round(n/sum*100):0}%)`),
          '',
          `## ${t('topItems')}`,
          ...topItems.map(item=>`- ${labels[item.seq]||'#'+item.seq}: ${item.tokens}`),
        ];
        if(delta)lines.push('',`## ${t('delta')}`,`- ${t('deltaNew')}: ${delta.added}`,`- ${t('grew')}: ${delta.grown}`,`- ${t('deltaReused')}: ${delta.reused}`,`- ${t('deltaRemoved')}: ${delta.removed}`);
        const text=format==='json'?JSON.stringify({model:request.model,estimated:request.estimated,contextWindow:request.contextWindow,usageInput:request.usageInput,totals,topItems:topItems.map(i=>({seq:i.seq,label:labels[i.seq]||null,tokens:i.tokens})),delta},null,2):lines.join('\n');
        const done=()=>{setExportState('done');setTimeout(()=>setExportState(null),1800);};
        const failed=()=>setExportState('failed');
        if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(text).then(done,failed);
        else failed();
      }
      const t=props.t;
      const requests=data?.requests || [];
      const found=requests.findIndex(r=>r.seq===selected);
      const index=selected===null || found<0 ? requests.length-1 : found;
      const request=requests[index];
      const cells=React.useMemo(()=>{
        const occupied=makeCells(request?.segments || []);
        const capacity=request?.contextWindow;
        if(Number.isFinite(capacity)&&capacity>0) {
          const count=Math.ceil(capacity/1000);
          while(occupied.length<count)occupied.push({parts:[],used:0});
        }
        return occupied;
      },[request]);
      React.useEffect(()=>{clearTimeout(hoverTimer.current);setHover(null);setAnchor(null);setPreview('');++hoverRequest.current;},[request?.seq]);
      React.useEffect(()=>()=>{clearTimeout(hoverTimer.current);++hoverRequest.current;},[]);
      const fmt=n=>Number(n||0).toLocaleString();
      function change(i){setSelected(requests[i]?.seq??null);}
      const totals={prompt:0,tools:0,memory:0,user:0,assistant:0};
      for(const s of request?.segments || []) totals[s.kind]=(totals[s.kind]||0)+s.tokens;
      const sum=Object.values(totals).reduce((a,b)=>a+b,0);
      const compressionRate=sum>0?Math.round(totals.memory/sum*100):0;
      const toolDensity=sum>0?Math.round(totals.tools/sum*100):0;
      const usage=request?.contextWindow?request.estimated/request.contextWindow:0;
      // Distribution balance: share of the single largest category. A plain, verifiable ratio —
      // deliberately NOT a synthetic score, which would imply a meaning it cannot carry.
      const balance=sum>0?Math.round(Math.max(...Object.values(totals))/sum*100):0;
      // Per-item occupancy: one logged message (or the tool-definition header) is one row.
      const topItems=React.useMemo(()=>{
        const map=new Map();
        for(const s of request?.segments || []){
          const cur=map.get(s.seq)||{seq:s.seq,tokens:0,kinds:new Set(),def:!!s.def};
          cur.tokens+=s.tokens;cur.kinds.add(s.kind);map.set(s.seq,cur);
        }
        return [...map.values()].sort((a,b)=>b.tokens-a.tokens).slice(0,6);
      },[request]);
      // Delta against the previous recorded attempt. Tool definitions repeat in every request
      // under a fresh header seq, so they are reported apart from genuinely new context.
      const previous=index>0?requests[index-1]:null;
      const delta=React.useMemo(()=>{
        if(!request||!previous)return null;
        const before=new Map();
        for(const s of previous.segments||[])before.set(s.seq,(before.get(s.seq)||0)+s.tokens);
        const after=new Map();
        for(const s of request.segments||[])after.set(s.seq,(after.get(s.seq)||0)+s.tokens);
        let added=0,grown=0,reused=0,removed=0,defs=0;
        const addedItems=[],grownItems=[];
        for(const [seq,tokens] of after){
          const isDef=(request.segments||[]).some(s=>s.seq===seq&&s.def);
          if(isDef){defs+=tokens;continue;}
          const old=before.get(seq)||0;
          if(!old){added+=tokens;addedItems.push({seq,delta:tokens});}
          else if(tokens>old){grown+=tokens-old;grownItems.push({seq,delta:tokens-old});}
          else reused+=tokens;
        }
        for(const [seq,tokens] of before){
          const isDef=(previous.segments||[]).some(s=>s.seq===seq&&s.def);
          if(isDef)continue;
          if(!after.has(seq))removed+=tokens;
        }
        return {added,grown,reused,removed,defs,addedItems:addedItems.sort((a,b)=>b.delta-a.delta).slice(0,6),grownItems:grownItems.sort((a,b)=>b.delta-a.delta).slice(0,6)};
      },[request,previous]);
      // Models observed in this session, with the window each one was recorded against.
      const modelFit=React.useMemo(()=>{
        const map=new Map();
        for(const r of requests){
          if(!r.model)continue;
          const cur=map.get(r.model)||{model:r.model,window:r.contextWindow,seen:0};
          cur.seen++;
          if(Number.isFinite(r.contextWindow)&&r.contextWindow>0)cur.window=Math.max(cur.window||0,r.contextWindow);
          map.set(r.model,cur);
        }
        return [...map.values()].sort((a,b)=>(b.window||0)-(a.window||0));
      },[requests]);
      // Composition in context order: one continuous bar split by category, with a token scale.
      const composition=React.useMemo(()=>{
        const parts=[];
        let position=0;
        for(const s of request?.segments || []){
          const last=parts[parts.length-1];
          if(last&&last.kind===s.kind){last.tokens+=s.tokens;last.end=position+s.tokens;}
          else parts.push({kind:s.kind,tokens:s.tokens,start:position,end:position+s.tokens});
          position+=s.tokens;
        }
        return parts;
      },[request]);
      const [labels,setLabels]=React.useState({});
      const [previews,setPreviews]=React.useState({});
      React.useEffect(()=>{
        const seqs=[...new Set([...topItems.map(i=>i.seq),...(delta?.addedItems||[]).map(i=>i.seq)])].slice(0,12);
        if(!seqs.length)return;
        let active=true;
        readMessages(seqs).then(rows=>{
          if(!active)return;
          const map={},bodies={};
          for(const row of rows){map[row.seq]=row.label;bodies[row.seq]=row.body.slice(0,400);}
          setLabels(map);setPreviews(bodies);
        },()=>{});
        return ()=>{active=false;};
      },[topItems,delta?.addedItems,readMessages]);
      const trend=React.useMemo(()=>{
        const recent=requests.slice(-10);
        if(recent.length<2)return null;
        // Occupancy ratio over time — a measured quantity, not a synthetic score.
        const points=recent.map(r=>r.contextWindow?Math.round(r.estimated/r.contextWindow*100):0);
        const delta=points[points.length-1]-points[0];
        return {points,delta};
      },[requests]);
      function cellText(cell,i){const parts={};for(const p of cell.parts)parts[p.kind]=(parts[p.kind]||0)+p.tokens;return `${t('cell')} ${i+1} · ${t('range')} ${fmt(i*1000)}–${fmt((i+1)*1000)}\n${Object.entries(parts).map(([k,n])=>`${t(k)}: ${fmt(n)}`).join('\n')}${cell.used<1000?`\n${t('free')}: ${fmt(1000-cell.used)}`:''}`;}
      const children=[h('style',{key:'style'},css+interactionCss),h('div',{className:'cm-title',key:'title'},t('title')),h('div',{className:'cm-muted',key:'subtitle'},t('subtitle'))];
      if(!data || !request){children.push(h('div',{className:'cm-status',role:'status',key:'empty'},t(!data?'loading':'empty')));}
      if(data?.pending)children.push(h('div',{className:'cm-status',role:'status',key:'pending'},t('pending')));
      if(request){
        children.push(h('div',{className:'cm-toolbar',key:'toolbar'},
          h('button',{className:'cm-control',disabled:index<=0,onClick:()=>change(index-1),'aria-label':t('previous')},'←'),
          h('select',{className:'cm-control cm-select','aria-label':t('request'),value:request.seq,onChange:e=>setSelected(Number(e.target.value))},requests.map(r=>h('option',{key:r.seq,value:r.seq},`${r.turn} / ${r.step} / ${r.attempt} · ${r.model||t('unknown')} · ${new Date(r.time).toLocaleTimeString()}`))),
          h('button',{className:'cm-control',disabled:index>=requests.length-1,onClick:()=>change(index+1),'aria-label':t('next')},'→'),
          h('label',null,h('input',{type:'checkbox',checked:selected===null,onChange:e=>setSelected(e.target.checked?null:request.seq)}),' ',t('latest')),
          h('span',{style:{flex:1}}),
          h('button',{className:'cm-control',type:'button',onClick:()=>exportSnapshot('md'),'aria-label':t('exportMd')},t('exportMd')),
          h('button',{className:'cm-control',type:'button',onClick:()=>exportSnapshot('json'),'aria-label':t('exportJson')},t('exportJson')),
          exportState?h('span',{className:'cm-muted',role:'status',style:{fontSize:11}},exportState==='done'?t('exportDone'):t('exportFailed')):null));
        const percent=request.contextWindow?Math.round(request.estimated/request.contextWindow*100):0;
        children.push(h('div',{className:'cm-stats',key:'stats','aria-label':t('summary')},
          h('div',{className:'cm-usage-box'},
            h('div',{className:'cm-muted'},t('estimated')),
            h('div',{className:'cm-usage-percent'},`${percent}%`),
            h('div',{className:'cm-muted'},`${fmt(request.estimated)} / ${request.contextWindow?fmt(request.contextWindow)+' tokens':t('capacityUnknown')}`),
            request.contextWindow?h('div',{className:'cm-usage-bar'},h('div',{style:{height:'100%',width:`${percent}%`,background:'var(--dsw-alias-brand-primary)'}})):null),
          h('div',null,h('div',{className:'cm-muted'},t('reported')),h('div',{className:'cm-number'},request.usageInput===null?t('unreported'):fmt(request.usageInput))),
          h('div',null,h('div',{className:'cm-muted'},t('requestLabel')),h('div',{className:'cm-number'},`${request.turn} / ${request.step} / ${request.attempt}`))));
        children.push(h('div',{className:'cm-muted',key:'meta'},`${request.provider||''} / ${request.model||t('unknown')} · ${t(request.status==='success'?'success':'failed')}`));
        children.push(h('div',{className:'cm-card cm-panel-card',key:'delta'},
          h('div',{className:'cm-card-title'},t('delta')),
          !delta?h('div',{className:'cm-muted',style:{fontSize:12}},t('deltaNone')):h(React.Fragment,null,
            h('div',{className:'cm-delta-row'},
              h('span',{className:'cm-delta-add'},`${t('deltaNew')} +${fmt(delta.added)}`),
              delta.grown?h('span',{className:'cm-delta-grow'},`${t('grew')} +${fmt(delta.grown)}`):null,
              h('span',{className:'cm-delta-reuse'},`${t('deltaReused')} ${fmt(delta.reused)}`),
              delta.removed>0?h('span',{className:'cm-delta-remove'},`${t('deltaRemoved')} -${fmt(delta.removed)}`):null),
            delta.defs?h('div',{className:'cm-muted',style:{fontSize:11,marginTop:2}},`${t('toolDefs')} · ${fmt(delta.defs)}`):null,
            delta.addedItems.length?h('div',{className:'cm-items'},delta.addedItems.map(item=>h('div',{key:item.seq,className:'cm-item'},h('span',{className:'cm-item-name'},labels[item.seq]||`#${item.seq}`),h('span',{className:'cm-item-value'},`+${fmt(item.delta)}`)))):null)));
        children.push(h('div',{className:'cm-card cm-panel-card',key:'top'},
          h('div',{className:'cm-card-title'},t('topItems')),
          topItems.length?h('div',{className:'cm-items'},topItems.map(item=>h(React.Fragment,{key:item.seq},
            h('button',{type:'button',className:'cm-item cm-item-button',onClick:()=>setExpanded(expanded===item.seq?null:item.seq),'aria-expanded':expanded===item.seq},
              h('span',{className:'cm-item-dot',style:{background:colors[[...item.kinds][0]]||colors.user}}),
              h('span',{className:'cm-item-name'},labels[item.seq]||`#${item.seq}`),
              h('span',{className:'cm-item-bar'},h('span',{style:{width:`${sum?Math.round(item.tokens/sum*100):0}%`,background:colors[[...item.kinds][0]]||colors.user}})),
              h('span',{className:'cm-item-value'},fmt(item.tokens))),
            expanded===item.seq?h('pre',{className:'cm-item-preview'},previews[item.seq]??t('previewLoading')):null))):h('div',{className:'cm-muted',style:{fontSize:12}},t('topItemsEmpty'))));
        // Input composition in context order — the ruler that answers "what fills the first 50K".
        if(composition.length){
          const total=composition[composition.length-1].end||1;
          children.push(h('div',{className:'cm-card cm-panel-card',key:'composition'},
            h('div',{className:'cm-card-title'},t('composition')),
            h('div',{className:'cm-composition'},composition.map((part,i)=>h('span',{key:i,className:'cm-composition-part',title:`${t(part.kind)} · ${fmt(part.start)}–${fmt(part.end)}`,style:{width:`${(part.tokens/total)*100}%`,background:colors[part.kind]||colors.user}}))),
            h('div',{className:'cm-axis'},Array.from({length:Math.min(6,Math.ceil(total/20000))},(_,i)=>{const at=(i+1)*20000;return at<total?h('span',{key:i,className:'cm-axis-tick',style:{left:`${(at/total)*100}%`}},fmt(at)):null;})),
            h('div',{className:'cm-muted',style:{fontSize:11,marginTop:4}},`0 – ${fmt(total)} ${t('tokens')}`)));
        }
        // Models observed in this session, and whether each window can hold the current usage.
        if(modelFit.length){
          children.push(h('div',{className:'cm-card cm-panel-card',key:'model-fit'},
            h('div',{className:'cm-card-title'},t('modelFit')),
            h('div',{className:'cm-items'},modelFit.map(m=>{
              const fits=!m.window||!request?null:request.estimated<=m.window;
              const color=m.window===null?'cm-muted':fits?'cm-health-good':'cm-health-poor';
              return h('div',{key:m.model,className:'cm-item'},
                h('span',{className:'cm-item-name'},m.model),
                h('span',{className:'cm-item-value'},m.window?fmt(m.window):t('modelFitUnknown')),
                h('span',{className:color,style:{fontSize:11,flex:'none'}},m.window===null?'':fits?t('modelFitOk'):t('modelFitShort')));
            })),
            h('div',{className:'cm-muted',style:{fontSize:11,marginTop:8}},t('modelFitNote'))));
        }
        const balanceColor=balance<50?'cm-health-good':balance<80?'cm-health-warning':'cm-health-poor';
        const metric=(key,value,color)=>h('div',{className:'cm-metric'},
          h('span',{onMouseEnter:e=>showMetricTip(key,e),onMouseLeave:dismissPreview},t(key)),
          h('div',{className:color?('cm-metric-value '+color):'cm-metric-value'},value));
        children.push(h('div',{className:'cm-efficiency',key:'efficiency'},
          metric('compressionRate',`${compressionRate}%`),
          metric('toolDensity',`${toolDensity}%`),
          metric('balance',`${balance}%`,balanceColor)));
        if(trend){
          const w=220,hh=44,pad=4;
          const min=Math.min(...trend.points),max=Math.max(...trend.points);
          const span=Math.max(1,max-min);
          const coords=trend.points.map((p,i)=>[pad+i*(w-pad*2)/Math.max(1,trend.points.length-1),hh-pad-(p-min)/span*(hh-pad*2)]);
          const path=coords.map((c,i)=>`${i?'L':'M'}${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(' ');
          const area=`${path} L${coords[coords.length-1][0].toFixed(1)},${hh-pad} L${coords[0][0].toFixed(1)},${hh-pad} Z`;
          const trendColor=trend.delta>2?'cm-health-good':trend.delta<-2?'cm-health-poor':'cm-health-warning';
          const trendLabel=trend.delta>2?t('trendUp'):trend.delta<-2?t('trendDown'):t('trendStable');
          children.push(h('div',{className:'cm-trend',key:'trend'},
            h('div',{className:'cm-trend-head'},h('span',null,t('trend')),h('span',{className:trendColor},`${trend.delta>0?'+':''}${trend.delta} ${trendLabel}`)),
            h('svg',{viewBox:`0 0 ${w} ${hh}`,className:'cm-trend-svg',role:'img','aria-label':t('trend'),preserveAspectRatio:'none'},
              h('path',{d:area,fill:'var(--dsw-alias-brand-primary)',opacity:0.14,stroke:'none'}),
              h('path',{d:path,fill:'none',stroke:`var(--dsw-alias-brand-primary)`,strokeWidth:2,strokeLinejoin:'round',strokeLinecap:'round'}),
              coords.map((c,i)=>h('circle',{key:i,cx:c[0],cy:c[1],r:2.5,fill:'var(--dsw-alias-brand-primary)'})))));
        }
        if(usage>0.85||totals.assistant>sum*0.5||toolDensity>40){
          let suggest='';
          if(usage>0.85)suggest='suggestFork';
          else if(totals.assistant>sum*0.5)suggest='suggestCompact';
          else if(toolDensity>40)suggest='suggestBalance';
          if(suggest)children.push(h('div',{className:'cm-card',style:{marginTop:16,padding:14,border:'1px solid #ff9f40',background:'color-mix(in srgb,#ff9f40 8%,var(--dsw-alias-bg-layer-1))'},key:'suggest'},h('div',{style:{fontWeight:600,marginBottom:8,fontSize:13}},t('suggest')),h('div',{className:'cm-muted',style:{fontSize:12}},t(suggest))));
        }
        children.push(h('div',{className:'cm-card',key:'card'},
          h('div',{className:'cm-legend'},Object.keys(colors).map(k=>h('span',{key:k},h('span',{className:'cm-dot',style:{background:colors[k]}}),t(k)))),
          h('div',{className:'cm-grid',ref:gridRef,'aria-label':t('title'),role:'grid',onKeyDown:e=>{if(e.key.startsWith('Arrow')||e.key==='Home'||e.key==='End'){e.preventDefault();moveFocus(focusCell,e.key);}}},
            cells.map((cell,i)=>{
            let offset=0;const stops=cell.parts.map(p=>{const start=offset;offset+=p.tokens/10;return `${colors[p.kind]||colors.user} ${start}% ${offset}%`;});
            if(offset<100)stops.push(`var(--dsw-alias-bg-layer-2) ${offset}% 100%`);
            const text=cellText(cell,i);
            const related=cluster&&cell.parts.some(p=>cluster.has(p.seq));
            return h('button',{key:i,type:'button',ref:el=>{if(el)cellRefs.current.set(i,el);else cellRefs.current.delete(i);},tabIndex:i===focusCell?0:-1,className:'cm-cell'+' '+'cm-cell'+(related?' cm-cell-related':''),'aria-label':text,style:{background:cell.parts.length?('linear-gradient(90deg,'+stops.join(',')+')'):'var(--dsw-alias-bg-layer-2)'},onMouseEnter:e=>previewCell(i,e),onFocus:e=>{setFocusCell(i);previewCell(i,e);},onMouseLeave:dismissPreview,onBlur:dismissPreview,onClick:()=>{dismissPreview();setOpened({cell,index:i,requestSeq:request.seq});},'aria-haspopup':'dialog'});
          })),
          h('div',{className:'cm-muted cm-detail','aria-live':'polite'},t('keyboardHint')),
          h('div',{className:'cm-note cm-muted'},t('note'))));
        children.push(h('div',{style:{marginTop:24},key:'breakdown'},h('strong',null,t('details')),Object.entries(totals).map(([k,n])=>h('div',{key:k},h('div',{className:'cm-row'},h('span',null,t(k)),h('span',null,`${fmt(n)} · ${request.estimated?Math.round(n/request.estimated*100):0}%`)),h('div',{className:'cm-bar'},h('div',{style:{height:'100%',width:`${request.estimated?n/request.estimated*100:0}%`,background:colors[k]}}))))));
      }
      if(data?.dropped)children.push(h('div',{className:'cm-note cm-muted',key:'dropped'},`${t('retained')} · ${fmt(data.dropped)}`));
      if(anchor&&hover!==null&&cells[hover]&&!opened)children.push(h('div',{key:'preview',className:'cm-tooltip',role:'tooltip',style:{left:anchor.left,top:anchor.top,transform:anchor.above?'translateY(-100%)':undefined}},`${t('cell')} ${hover+1} · ${t('range')} ${fmt(hover*1000)}–${fmt((hover+1)*1000)}`,h('div',{className:'cm-note',style:{marginTop:8}},preview||t('noMessage'))));
      if(metricTip)children.push(h('div',{key:'metric-tip',className:'cm-tooltip',role:'tooltip',style:{left:metricTip.left,top:metricTip.top,transform:'translateY(-100%)'}},t(metricTip.metric+'Tip')));
      if(opened)children.push(h(MessageDialog,{key:'dialog',...opened,t,readMessages,onClose:()=>setOpened(null)}));
      return h('section',{className:'cm-root'},h('div',{className:'cm-inner'},children));
    }
    const ambientCss=`[data-slot="main.conversation"]:has(.cm-ambient)>div{padding-right:340px;box-sizing:border-box}[data-slot="main.conversation"] :has(.cm-ambient){container-type:normal}.cm-ambient{position:fixed;right:0;top:80px;bottom:0;width:340px;overflow:auto;border-left:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);z-index:5;white-space:normal;container-type:normal}.cm-ambient .cm-inner{padding:18px 14px}.cm-ambient .cm-title{font-size:18px}.cm-ambient .cm-usage-percent{font-size:32px}.cm-ambient .cm-number{font-size:19px}.cm-ambient .cm-stats{gap:12px}.cm-ambient .cm-efficiency{gap:12px;padding:12px}.cm-ambient .cm-metric-value{font-size:22px}.cm-ambient .cm-metric-label{font-size:10px}.cm-ambient .cm-card{padding:12px}.cm-ambient .cm-grid{grid-template-columns:repeat(auto-fill,minmax(14px,1fr));gap:3px}.cm-ambient .cm-legend{font-size:11px;gap:6px}.cm-ambient .cm-select{min-width:120px}.cm-ambient .cm-item{font-size:11px}.cm-ambient .cm-composition{height:10px}.cm-ambient .cm-panel-card{padding:10px;margin:10px 0}@media(max-width:1100px){[data-slot="main.conversation"]:has(.cm-ambient)>div{padding-right:0}.cm-ambient{display:none}}`;
    const StableContextView=React.memo(View);
    function ContextSidebar(props){
      const storageKey='dsh.contextMap.panel';
      const [panel,setPanel]=React.useState(()=>{try{const saved=JSON.parse(localStorage.getItem(storageKey));return {open:saved?.open!==false,width:Math.max(240,Math.min(640,Number(saved?.width)||340))};}catch{return {open:true,width:340};}});
      const drag=React.useRef(null);
      const marker=React.useRef(null);
      const frame=React.useRef(null);
      const moveWidth=React.useRef(null);
      const applyWidth=value=>{
        const node=marker.current;
        if(!node)return;
        node.style.setProperty('--cm-panel-width',`${value}px`);
        const container=node.closest('[data-slot="main.conversation"]');
        if(container)container.style.setProperty('--cm-panel-space',`${window.innerWidth>1100?value:0}px`);
      };
      const [viewport,setViewport]=React.useState(()=>window.innerWidth);
      React.useEffect(()=>{const resize=()=>setViewport(window.innerWidth);window.addEventListener('resize',resize);return ()=>window.removeEventListener('resize',resize);},[]);
      React.useEffect(()=>{try{localStorage.setItem(storageKey,JSON.stringify(panel));}catch{}},[panel]);
      const width=Math.min(panel.width,Math.max(240,viewport-360));
      React.useLayoutEffect(()=>{applyWidth(panel.open?width:0);},[panel.open,width,viewport]);
      React.useEffect(()=>()=>{
        if(frame.current!==null)cancelAnimationFrame(frame.current);
        marker.current?.closest('[data-slot="main.conversation"]')?.style.removeProperty('--cm-panel-space');
      },[]);
      function finish(event,cancel=false){
        if(!drag.current)return;
        const candidate=drag.current.width+drag.current.x-event.clientX;
        drag.current=null;
        if(frame.current!==null){cancelAnimationFrame(frame.current);frame.current=null;}
        marker.current?.classList.remove('cm-dragging');
        applyWidth(cancel?width:candidate<150?0:Math.max(240,Math.min(640,candidate)));
        if(!cancel)setPanel(old=>candidate<150?{...old,open:false}:{open:true,width:Math.max(240,Math.min(640,candidate))});
        if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
      }
      const dynamic=`[data-slot="main.conversation"]:has(.cm-panel-marker)>div{padding-right:var(--cm-panel-space,0px);transition:none!important;box-sizing:border-box}[data-slot="main.conversation"] :has(.cm-panel-marker){container-type:normal}.cm-panel-marker .cm-ambient{display:flex;flex-direction:column;width:var(--cm-panel-width,340px);transition:none!important;overflow:visible;max-width:calc(100vw - 24px)}.cm-panel-content{flex:1;min-height:0;overflow:auto}.cm-panel-handle{position:absolute;top:0;bottom:0;left:-5px;width:10px;padding:0;border:0;background:transparent;cursor:col-resize;touch-action:none;z-index:8}.cm-panel-handle:hover,.cm-panel-handle:focus-visible{background:color-mix(in srgb,var(--dsw-alias-brand-primary) 35%,transparent)}.cm-panel-head{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--dsw-alias-border-l1)}.cm-panel-toggle{font:inherit;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);border-radius:7px;padding:5px 10px;cursor:pointer}.cm-panel-marker .cm-ambient{position:fixed;right:0;top:80px;bottom:0;max-height:none}`;
      return h('span',{className:'cm-panel-marker',ref:marker},h('style',null,ambientCss+dynamic),
        h('button',{className:'cm-panel-toggle',type:'button','aria-expanded':panel.open,'aria-controls':'cm-context-panel',onClick:()=>setPanel(old=>({...old,open:!old.open}))},props.t('tab'),panel.open?' ▸':' ◂'),
        panel.open?h('aside',{id:'cm-context-panel',className:'cm-ambient','aria-label':props.t('title')},
          h('div',{className:'cm-panel-head'},h('strong',null,props.t('tab')),h('button',{type:'button',className:'cm-panel-toggle','aria-label':props.t('close'),onClick:()=>setPanel(old=>({...old,open:false}))},'×')),
          h('div',{role:'separator','aria-label':props.t('resizePanel'),'aria-orientation':'vertical','aria-valuemin':240,'aria-valuemax':640,'aria-valuenow':Math.round(width),tabIndex:0,className:'cm-panel-handle',
            onPointerDown:event=>{if(event.button!==0)return;event.preventDefault();drag.current={x:event.clientX,width};marker.current.classList.add('cm-dragging');event.currentTarget.setPointerCapture(event.pointerId);},
            onPointerMove:event=>{
              if(!drag.current)return;
              moveWidth.current=Math.max(60,Math.min(640,drag.current.width+drag.current.x-event.clientX));
              if(frame.current===null)frame.current=requestAnimationFrame(()=>{frame.current=null;applyWidth(moveWidth.current);});
            },
            onPointerUp:event=>finish(event),onPointerCancel:event=>finish(event,true),onLostPointerCapture:()=>{if(drag.current){drag.current=null;if(frame.current!==null){cancelAnimationFrame(frame.current);frame.current=null;}applyWidth(width);marker.current?.classList.remove('cm-dragging');}},
            onKeyDown:event=>{if(event.key==='Escape'){setPanel(old=>({...old,open:false}));event.preventDefault();}else if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();setPanel(old=>({...old,width:event.key==='Home'?240:event.key==='End'?640:Math.max(240,Math.min(640,old.width+(event.key==='ArrowLeft'?20:-20)))}));}}}),
          h('div',{className:'cm-panel-content'},h(StableContextView,props))):null);
    }
    return {inject:['slots','locale','sessions'],apply(ctx){
      // Global appearance belongs to @local/dsh-theme-orca; this view inherits theme tokens.
      // v2 avoids dictionaries leaked by the original implementation in already-open pages.
      const namespace='context-map.ui.v3';
      for(const [lang,dict] of Object.entries(dicts))ctx.effect(()=>ctx.locale.register(namespace,lang,dict));
      const t=ctx.locale.bind(namespace);
      ctx.slots.inject('conversation.view',()=>ctx.slots.register({name:'conversation.view',id:'context-map',order:30,label:()=>t('tab'),locale:namespace,inject:()=>({getBinding:id=>ctx.sessions.binding(id)})},View));
      ctx.slots.inject('conversation.session.header.utilities',()=>ctx.slots.register({name:'conversation.session.header.utilities',id:'context-map-sidebar',order:100,locale:namespace,inject:()=>({getBinding:id=>ctx.sessions.binding(id)})},ContextSidebar));
    }};
  }
});
