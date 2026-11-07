const {test}=require('node:test');
const assert=require('node:assert/strict');
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
test('first visit renders seven recipes without runtime errors',()=>{const app=boot();assert.ifError(app.error);assert.match(app.elements.get('#root').innerHTML,/Mes essais culinaires/);assert.equal(app.run('db.recipes.length'),7)});
test('unreadable local data stays intact and displays a persistent recovery warning',()=>{const app=boot('broken-json');assert.ifError(app.error);assert.equal(app.data.get('atelier-saveurs-v1'),'broken-json');assert.match(app.run("$('#storageWarning').innerHTML"),/illisibles/);app.run('save(makeSeed())');assert.equal(app.data.get('atelier-saveurs-v1'),'broken-json')});
test('denied storage does not crash startup or claim success',()=>{const app=boot(null,true);assert.ifError(app.error);assert.equal(app.run('save(db)'),false);assert.match(app.run("$('#storageWarning').innerHTML"),/stockage/i)});
test('quota failure preserves stored data and keeps the recipe editor open',()=>{const app=boot();app.run('newRecipe();');app.run("$('#r_name').value='Soupe';$('#r_steps').value='Cuire'");const before=app.run('JSON.stringify(db)');app.run("localStorage.setItem=()=>{throw Error('quota')};act('saveRecipe')");assert.equal(app.run('JSON.stringify(db)'),before);assert.equal(app.run('view'),'recipeForm');assert.doesNotMatch(app.elements.get('#toast').textContent,/Recette enregistrée/)});
test('nested malformed imports, duplicate IDs and broken references are rejected',()=>{const app=boot();assert.ifError(app.error);for(const edit of ["d.recipes[0].steps='bad'","d.projects.push({...d.projects[0]})","d.recipes[0].projectId='missing'","d.recipes[0].id='x\" onclick=\"bad'","d.trials.push({id:'t'})"]){assert.throws(()=>app.run(`(()=>{const d=makeSeed();${edit};return validateData(d)})()`))}assert.equal(app.run('validateData(makeSeed()).schema'),1)});
test('backup navigation opens JSON and Markdown controls',()=>{const app=boot();app.run("act('nav:backup')");assert.match(app.elements.get('#root').innerHTML,/importFile/);assert.match(app.elements.get('#root').innerHTML,/exportJson/)});
