// Faller’OS service worker: cache-first app shell, pełny offline
const V='fallerOS-v1';
const FILES=['./','index.html','app.html','manifest.json','kuce-theme.mp3','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
async function ranged(req,res){ // Safari/iOS wymaga obsługi Range dla audio/wideo
  const b=await res.blob(),m=/bytes=(\d*)-(\d*)/.exec(req.headers.get('range')||'');
  const s=m&&m[1]?+m[1]:0,e=m&&m[2]?+m[2]:b.size-1;
  return new Response(b.slice(s,e+1),{status:206,headers:{'Content-Type':res.headers.get('Content-Type')||'audio/mpeg','Content-Range':`bytes ${s}-${e}/${b.size}`,'Content-Length':e-s+1}});
}
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==location.origin)return;
  e.respondWith((async()=>{
    const c=await caches.open(V);let res=await c.match(r,{ignoreSearch:true});
    if(!res){try{res=await fetch(r);if(res.ok&&res.status===200)c.put(r,res.clone())}catch(_){res=await c.match(r.mode==='navigate'?'app.html':r)||Response.error()}}
    return r.headers.has('range')&&res.status===200?ranged(r,res):res;
  })());
});
