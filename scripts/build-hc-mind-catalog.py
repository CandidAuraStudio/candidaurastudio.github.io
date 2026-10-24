"""Create a small, dated public-figure snapshot from Wikidata CC0 statements.
No user answers are collected. Ambiguous name matches and non-human entities are skipped.
"""
import datetime,json,pathlib,re,subprocess,time,unicodedata,urllib.parse,urllib.request
ROOT=pathlib.Path(__file__).resolve().parents[1]
API='https://www.wikidata.org/w/api.php'
AGENT='HeartClearMindCatalog/1.0 (https://github.com/CandidAuraStudio/candidaurastudio.github.io)'
def request(**params):
    params.update(format='json',maxlag=5)
    url=API+'?'+urllib.parse.urlencode(params)
    req=urllib.request.Request(url,headers={'User-Agent':AGENT,'Accept':'application/json'})
    with urllib.request.urlopen(req,timeout=40) as response: data=json.load(response)
    if data.get('error'): raise RuntimeError(str(data['error']))
    time.sleep(.15)
    return data
def normal(value):
    return ''.join(c for c in unicodedata.normalize('NFKD',value).casefold() if c.isalnum())
source=(ROOT/'human-practice-prototype/hc-explore-adaptive-v156.js').read_text()
raw=json.loads(re.search(r'var people=("(?:\\.|[^"\\])*"),others=',source).group(1))
names=[line.split('|')[0] for line in raw.split('\n')]
base=json.loads(subprocess.check_output(['node','-e',"const c=require('./human-practice-prototype/hc-explore-core');process.stdout.write(JSON.stringify(c.bank.filter(x=>x.tags.includes('public')).map(x=>x.name)))"],cwd=ROOT))
names=list(dict.fromkeys(base+names))
resolved={}; skipped=[]; name_candidates={}
for name in names:
    search=re.sub(r'\s*\([^)]*\)','',name).strip()
    results=request(action='wbsearchentities',search=search,language='en',uselang='en',type='item',limit=5).get('search',[])
    exact=[r for r in results if normal(r.get('label',''))==normal(search) or normal(r.get('match',{}).get('text',''))==normal(search)]
    if not exact: skipped.append({'name':name,'reason':'absent exact name'});continue
    name_candidates[name]=[r['id'] for r in exact]
    for match in exact:resolved.setdefault(match['id'],name)
    print('Candidates',name,','.join(name_candidates[name]),flush=True)
def ids(entity,prop):
    return [c.get('mainsnak',{}).get('datavalue',{}).get('value',{}).get('id') for c in entity.get('claims',{}).get(prop,[]) if c.get('rank')!='deprecated' and isinstance(c.get('mainsnak',{}).get('datavalue',{}).get('value'),dict)]
def year(entity,prop):
    values=[]
    for claim in entity.get('claims',{}).get(prop,[]):
        if claim.get('rank')=='deprecated':continue
        value=claim.get('mainsnak',{}).get('datavalue',{}).get('value',{})
        if isinstance(value,dict) and value.get('precision',0)>=9:
            match=re.match(r'([+-]?\d+)-',value.get('time',''))
            if match:values.append(int(match[1]))
    return values[0] if len(set(values))==1 else None
entities={}
keys=list(resolved)
for i in range(0,len(keys),25):
    entities.update(request(action='wbgetentities',ids='|'.join(keys[i:i+25]),props='info|claims|labels|descriptions|sitelinks',languages='en',sitefilter='enwiki').get('entities',{}))
occupation_ids=sorted({q for e in entities.values() for p in ['P106','P27'] for q in ids(e,p) if q})
labels={}
for i in range(0,len(occupation_ids),50):
    result=request(action='wbgetentities',ids='|'.join(occupation_ids[i:i+50]),props='labels',languages='en')
    labels.update({q:v.get('labels',{}).get('en',{}).get('value',q) for q,v in result.get('entities',{}).items()})
eligible=set()
for name,choices in name_candidates.items():
    humans=[q for q in choices if 'Q5' in ids(entities.get(q,{}),'P31')]
    if len(humans)>1:
        expected='Vijay (actor)' if name in ['Vijay','Vijay (Tamil actor)'] else re.sub(r'\s*\([^)]*\)','',name).strip()
        main_article=[q for q in humans if normal(entities[q].get('sitelinks',{}).get('enwiki',{}).get('title',''))==normal(expected)]
        if len(main_article)==1:humans=main_article
    if len(humans)==1:eligible.add(humans[0])
    else:skipped.append({'name':name,'reason':'ambiguous or absent verified human'})
items=[]
for q,e in entities.items():
    if q not in eligible:continue
    sex=ids(e,'P21');sex='female' if sex==['Q6581072'] else 'male' if sex==['Q6581097'] else None
    items.append({'id':'wd:'+q,'name':resolved[q],'canonicalName':e.get('labels',{}).get('en',{}).get('value',resolved[q]),'description':e.get('descriptions',{}).get('en',{}).get('value',''),
      'source':'https://www.wikidata.org/wiki/'+q,'revision':e.get('lastrevid'),'sex':sex,'birthYear':year(e,'P569'),'deathYear':year(e,'P570'),
      'citizenships':[v for v in ids(e,'P27') if v],'occupations':[{'id':v,'label':labels.get(v,v)} for v in ids(e,'P106') if v]})
items.sort(key=lambda x:x['name'].casefold())
if len(items)<100:raise RuntimeError('Too few verified public figures: '+str(len(items)))
country_labels={q:labels[q] for item in items for q in item['citizenships'] if q in labels}
payload={'schema':1,'builtAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'source':'Wikidata CC0; P31, P21, P27, P569, P570, P106','items':items,'countryLabels':country_labels,'skipped':skipped}
out=ROOT/'human-practice-prototype/hc-mind-catalog.js'
out.write_text('/* Public-figure facts: Wikidata CC0. No user data. */\n(function(r){const d='+json.dumps(payload,ensure_ascii=False,separators=(',',':'))+';if(typeof module==="object"&&module.exports)module.exports=d;else r.HCMindCatalog=d;})(typeof globalThis!=="undefined"?globalThis:this);\n')
print('CATALOG:',len(items),'people;',len(skipped),'skipped;',out.stat().st_size,'bytes',flush=True)
