/* Exercise the real service-worker handlers in a minimal Cache API harness. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const scope='https://heartclear.test/human-practice-prototype/';
const root=path.resolve(__dirname,'..');
const url=request=>new URL(typeof request==='string'?request:request.url,scope).href;
const stores=new Map();
const caches={
 async open(name){
  if(!stores.has(name))stores.set(name,new Map());
  const rows=stores.get(name);
  return {
   async add(request){const response=await network(request);if(!response.ok)throw Error('Not cached');await this.put(request,response)},
   async put(request,response){rows.set(url(request),response.clone())},
   async match(request){return rows.get(url(request))?.clone()}
  };
 },
 async keys(){return [...stores.keys()]},
 async delete(name){return stores.delete(name)},
 async match(request){for(const name of stores.keys()){const r=await(await this.open(name)).match(request);if(r)return r}}
};
let online=true;
async function network(request){
 if(!online)throw Error('Offline');
 const file=path.join(root,new URL(url(request)).pathname.replace('/human-practice-prototype/',''));
 try{return new Response(fs.readFileSync(file),{status:200})}catch{return new Response('',{status:404})}
}
const handlers={};
class ScopedRequest extends Request{constructor(input,options){super(typeof input==='string'?url(input):input,options)}}
vm.runInNewContext(fs.readFileSync(path.join(root,'sw.js'),'utf8'),{
 self:{registration:{scope},addEventListener:(event,fn)=>{handlers[event]=fn},skipWaiting:async()=>{},clients:{claim:async()=>{}}},
 caches,fetch:network,Request:ScopedRequest,Response,Headers,URL,console
});
const lifecycle=async name=>{let promise;handlers[name]({waitUntil:p=>{promise=p}});await promise};
const navigate=async pathname=>{let promise;handlers.fetch({request:{method:'GET',mode:'navigate',url:url(pathname)},respondWith:p=>{promise=p}});return promise};
(async()=>{
 // A release must never clear downloaded media or a sibling app's cache.
 const media=await caches.open('heartclear-media-v1');await media.put('./saved.mp3',new Response('original recording'));
 const sibling=await caches.open('other-app-v1');await sibling.put('./saved',new Response('sibling data'));
 await lifecycle('install');
 const reader='./human-knowledge/ali-letter-31.html';
 assert(await caches.match(reader),'Letter reader must be precached, even before first visit');
 assert(await caches.match('./human-knowledge/ali-letter-31-arabic.js'),'Complete Arabic must be precached');
 online=false;
 const response=await navigate(reader);
 assert((await response.text()).includes('<title>A Letter to a Son'),'Offline reader must not become the home page');
 assert((await(await navigate(reader+'?from=library')).text()).includes('<title>A Letter to a Son'),'Tracking query must not break offline reader lookup');
 await lifecycle('activate');
 assert.equal(await(await media.match('./saved.mp3')).text(),'original recording');
 assert.equal(await(await sibling.match('./saved')).text(),'sibling data');
 assert((await(await navigate('./books/shadows-of-truth-reader.html')).text()).includes('<html'),'Existing offline book still opens');
 console.log('PASS: Letter 31 offline route and complete data, existing books and saved media preserved');
})().catch(e=>{console.error(e);process.exitCode=1});
