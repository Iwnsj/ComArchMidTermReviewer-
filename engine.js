(function(root){
const normalize=s=>String(s??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]/g,'');
function isCorrect(term,value){const candidates=[term.term,term.term.replace(/\s*\([^)]*\)/g,''),...(term.aliases||[])];return normalize(value).length>0&&candidates.some(x=>normalize(x)===normalize(value));}
function shuffle(items,rng=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function sample(terms,count,rng=Math.random){const groups=shuffle([...new Set(terms.map(t=>t.topic))],rng).map(topic=>shuffle(terms.filter(t=>t.topic===topic),rng));const out=[];while(out.length<Math.min(count,terms.length)){for(const group of groups){if(group.length&&out.length<count)out.push(group.pop());}}return shuffle(out,rng);}
function questions(selected,bank,mode='mixed',rng=Math.random){
 const pool=shuffle(selected,rng),out=[];let i=0,turn=0;
 while(i<pool.length){
  let type=mode==='mixed'?['mcq','identification','matching'][turn%3]:mode;
  if(type==='matching'&&pool.length-i<2)type='mcq';
  if(type==='matching'){const group=pool.slice(i,i+4);out.push({type,ids:group.map(t=>t.id),options:shuffle(group.map(t=>t.id),rng)});i+=group.length;}
  else {const term=pool[i++];const near=shuffle(bank.filter(t=>t.id!==term.id&&t.topic===term.topic&&t.section===term.section),rng);const farther=shuffle(bank.filter(t=>t.id!==term.id&&!near.some(n=>n.id===t.id)),rng);out.push({type,ids:[term.id],options:type==='mcq'?shuffle([term.id,...[...near,...farther].slice(0,3).map(t=>t.id)],rng):[]});}
  turn++;
 }
 return out;
}
function grade(question,answer,bank){return question.ids.map(id=>{const t=bank.find(x=>x.id===id);const given=question.type==='matching'?(answer[id]||''):String(answer||'');return {id,given,correct:question.type==='identification'?isCorrect(t,given):given===id};});}
function summary(results,bank){const rows=Object.values(results),correct=rows.filter(x=>x.correct).length;return {total:rows.length,correct,percent:rows.length?Math.round(correct/rows.length*100):0,byTopic:[...new Set(bank.map(t=>t.topic))].map(topic=>{const a=rows.filter(r=>bank.find(t=>t.id===r.id)?.topic===topic);return {topic,total:a.length,correct:a.filter(r=>r.correct).length};})};}
root.StudyEngine={normalize,isCorrect,shuffle,sample,questions,grade,summary};
if(typeof module!=='undefined')module.exports=root.StudyEngine;
})(typeof window!=='undefined'?window:globalThis);
