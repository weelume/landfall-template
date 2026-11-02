'use client'
import {useEffect,useRef,useState} from 'react'
import {motion,useReducedMotion,useScroll} from 'framer-motion'
import type {ContentBlock,ContentSection} from '../content/data'
import {useSite} from './context'
import {SiteLink,Picture,Heading} from './ui'
import {Reveal} from './motion'

function blockHref(block:ContentBlock){return 'href' in block&&typeof block.href==='string'?block.href:undefined}
export function Blocks({blocks}:{blocks:ContentBlock[]}) {
 const {t}=useSite()
 return <>{blocks.map((block,index)=>{
  if(block.type==='h1')return null
  if(block.type==='h2')return <Heading key={index} text={block.text}/>
  if(block.type==='h3'||block.type==='h4')return <h3 key={index}>{t(block.text)}</h3>
  const to=blockHref(block)
  if(to)return <SiteLink className="lf-editorial-link" to={to} key={index}>{t(block.text)}</SiteLink>
  if(block.type==='li')return <p className="lf-editorial-list-item" key={index}>{t(block.text)}</p>
  if(block.type==='blockquote')return <blockquote key={index}>{t(block.text)}</blockquote>
  if(block.type==='button')return null
  return <p className={block.type==='dt'||block.type==='figcaption'?'lf-eyebrow':''} key={index}>{t(block.text)}</p>
 })}</>
}
export function Prose({body}:{body:string}) {const {t}=useSite();return <div className="lf-prose">{body.split(/\n\s*\n/).map((paragraph,index)=>paragraph.startsWith('## ')?<h2 id={'part-'+index} key={index}>{t(paragraph.slice(3))}</h2>:paragraph.startsWith('> ')?<blockquote key={index}>{t(paragraph.slice(2))}</blockquote>:<p key={index}>{t(paragraph)}</p>)}</div>}
export function EditorialSections({sections}:{sections:ContentSection[]}) {return <>{sections.filter(section=>!section.class.includes('lfct')).map((section,index)=><section className="lf-section lf-editorial-section" key={index}><div className="lf-editorial-columns"><Reveal className="lf-editorial-copy"><Blocks blocks={section.blocks}/></Reveal>{section.images[0]&&<Reveal className="lf-editorial-photo"><Picture src={section.images[0].src} alt={section.images[0].alt??''} reveal="bottom"/></Reveal>}</div>{section.images.length>1&&<div className="lf-editorial-gallery">{section.images.slice(1).map(image=><Picture key={image.src} src={image.src} alt={image.alt??''} reveal="bottom"/>)}</div>}</section>)}</>}
export function ReadingLayout({blocks,children}:{blocks:ContentBlock[];children:React.ReactNode}) {
 const root=useRef<HTMLDivElement>(null),[active,setActive]=useState(0),{t,pick}=useSite(),reduced=useReducedMotion()
 const headings=blocks.filter(b=>b.type==='h2'),{scrollYProgress}=useScroll({target:root,offset:['start start','end end']})
 useEffect(()=>{const node=root.current;if(!node)return;const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive(Number((entry.target as HTMLElement).dataset.part))},{rootMargin:'-15% 0px -65% 0px'});for(const heading of node.querySelectorAll('[data-part]'))observer.observe(heading);return()=>observer.disconnect()},[])
 return <div ref={root} className="lf-reading-layout"><motion.div className="lf-reading-progress" style={{scaleX:scrollYProgress}}/><nav className="lf-toc" aria-label={pick('本页目录','On this page')}><p className="lf-eyebrow">{pick('本页目录','On this page')}</p>{headings.map((heading,index)=><a key={index} className={active===index?'is-active':''} href={'#lf-part-'+index} onClick={e=>{e.preventDefault();document.getElementById('lf-part-'+index)?.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});history.replaceState(null,'','#lf-part-'+index)}}>{t(heading.text)}</a>)}</nav><article className="lf-prose">{children}</article></div>
}
export function LegalContent({section}:{section:ContentSection}){const {t,pick}=useSite();let heading=0;return <ReadingLayout blocks={section.blocks}><p className="lf-demo-note">{pick('模板演示：以下为参考旅行公司的政策示例。本演示不收集、发送或保存表单内容，不提供真实预订、支付或账户服务。','Template demo: the following are sample travel policies. This demo does not collect, send or store form contents and provides no real booking, payment or account service.')}</p>{section.blocks.map((block,index)=>{if(block.type==='h1')return null;if(block.type==='h2'){const id=heading++;return <h2 id={'lf-part-'+id} data-part={id} key={index}>{t(block.text)}</h2>}return <Blocks key={index} blocks={[block]}/>})}</ReadingLayout>}
