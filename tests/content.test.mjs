import test from 'node:test'
import assert from 'node:assert/strict'
import {readFile,access} from 'node:fs/promises'
import {resolve} from 'node:path'
const root=resolve(import.meta.dirname,'..'),base=resolve(root,'src/features/site-templates/catalog/landfall/content')
const load=async name=>JSON.parse(await readFile(resolve(base,name),'utf8'))
const data=await load('collections.json'),pages=await load('pages.json'),zh=await load('zh.json')
test('完整行程可逐日探索，导游和目的地引用真实存在',()=>{
 assert.equal(data.tours.length,9);assert.equal(data.days.length,65)
 for(const tour of data.tours){const days=data.days.filter(day=>day.tour===tour.slug);assert.equal(days.length,Number(tour.days),tour.slug);assert.ok(data.guides.some(guide=>guide.slug===tour.guide));assert.ok(data.destinations.some(d=>d.name===tour.destination));for(const row of tour.dates.split('\n')){const [date,price,seats]=row.split('|').map(value=>value.trim());assert.ok(date&&price&&Number.isInteger(Number(seats)),row)}}
})
test('中文正文与动态数据完整，禁止缺失翻译导致页面运行失败',()=>{
 const required=new Set()
 for(const page of pages){required.add(page.heading);if(page.hero.subtitle)required.add(page.hero.subtitle);for(const section of page.sections){for(const block of section.blocks)required.add(block.text);for(const image of section.images)if(image.alt)required.add(image.alt)}}
 for(const collection of Object.values(data))for(const item of collection)for(const [key,value] of Object.entries(item)){
  if(['slug','tour','image','featured','focus','order','guide','date'].includes(key))continue
  if(key==='body'){for(const paragraph of value.split(/\n\s*\n/))required.add(paragraph.replace(/^(## |> )/,''))}
  else if(key==='included'||key==='excluded'){for(const text of value.split(/;\s*/))required.add(text.trim())}
  else if(key==='facts'){for(const text of value.split(/;\s*/))for(const part of text.split(/:\s*/))required.add(part.trim())}
  else if(key==='dates'){for(const row of value.split('\n'))required.add(row.split('|')[0].trim())}
  else required.add(value)
 }
 const missing=[...required].filter(text=>/[A-Za-z]/.test(text)&&typeof zh[text]!=='string')
 assert.deepEqual(missing,[])
})
test('运行图片和字体必须本地托管，包内包含全部引用',async()=>{
 const images=new Set()
 for(const collection of Object.values(data))for(const item of collection)if(item.image)images.add(item.image)
 for(const page of pages)for(const section of page.sections)for(const image of section.images)images.add(image.src)
 for(const image of images){assert.ok(image.startsWith('/templates/landfall/'),image);await access(resolve(root,'public'+image))}
})
