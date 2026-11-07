// Bump for changes to the offline shell. localStorage's independent key is unchanged.
const CACHE='atelier-saveurs-v7';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(ASSETS);await self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('atelier-saveurs-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
 const url=new URL(e.request.url);
 if(e.request.method!=='GET'||url.origin!==self.location.origin)return;
 const navigation=e.request.mode==='navigate';
 // Network first for the shell: a normal reload sees the published HTML.
 if(!navigation&&!ASSETS.some(p=>new URL(p,self.location.href).pathname===url.pathname))return;
 e.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  const index=new URL('./index.html',e.request.url).href;
  try{
   const response=await fetch(e.request,{cache:'no-cache'});
   if(response.ok){await cache.put(navigation?index:e.request,response.clone());return response}
   return await cache.match(navigation?index:e.request)||response;
  }catch(error){const cached=await cache.match(navigation?index:e.request);if(cached)return cached;throw error}
 })());
});
