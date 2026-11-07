const fs=require('node:fs');
const vm=require('node:vm');
const script=fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
function boot(raw=null, storageFailure=false){
 const elements=new Map(); const data=new Map(raw===null?[]:[['atelier-saveurs-v1',raw]]);const timers=[];
 const element=()=>({innerHTML:'',textContent:'',classList:{add(){},remove(){},toggle(){}},value:''});
 const context=vm.createContext({console,crypto:require('node:crypto').webcrypto,document:{querySelector:s=>{if(!elements.has(s))elements.set(s,element());return elements.get(s)},querySelectorAll:()=>[],addEventListener(){}},window:{scrollTo(){}},navigator:{},location:{protocol:'http:'},setTimeout:f=>timers.push(f),clearTimeout(){},localStorage:{getItem:k=>{if(storageFailure)throw Error('blocked');return data.get(k)??null},setItem:(k,v)=>{if(storageFailure)throw Error('quota');data.set(k,v)}}});
 let error;try{vm.runInContext(script,context)}catch(e){error=e}
 return {context,elements,data,error,run:code=>vm.runInContext(code,context)};
}
module.exports={boot};
