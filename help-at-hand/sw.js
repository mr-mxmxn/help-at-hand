const V='hah-v1',SHELL=['./','index.html','manifest.webmanifest','icons/logo.jpg','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png'];
const QR='https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL).then(()=>c.add(QR).catch(()=>{}))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('index.html',cp));return res}).catch(()=>caches.match('index.html')));return}
e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok&&(new URL(r.url).origin===location.origin||r.url===QR)){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})))});
