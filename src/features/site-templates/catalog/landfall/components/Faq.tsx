'use client'
import {useState} from 'react'
import {pageData} from '../content/data'
import {useSite} from './context'
import {Heading,SiteLink} from './ui'
export function Faq({compact=false}:{compact?:boolean}) {
 const {t,pick}=useSite(),[open,setOpen]=useState<number|null>(null)
 const source=pageData.find(page=>page.path==='/faq')!.sections.find(section=>section.class.includes('dlfq'))!.blocks
 const questions=source.flatMap((block,index)=>block.type==='button'?[{question:block.text,answer:source[index+1]?.text??''}]:[]).slice(0,compact?3:undefined)
 return <section className="lf-section lf-faq"><Heading text="Asked often."/><div className="lf-faq-layout"><nav aria-label={pick('问题分类','Question categories')}>{(compact?[pick('预订','Booking')]:[pick('预订','Booking'),pick('旅行途中','On tour'),pick('联系','Contact')]).map((label,index)=><a href={'#lf-faq-'+[0,4,7][index]} key={label}>{label}<span>{['04','03','03'][index]}</span></a>)}</nav><div>{questions.map((item,index)=><div className="lf-faq-item" id={'lf-faq-'+index} key={item.question}><h3><button aria-expanded={open===index} aria-controls={'lf-answer-'+index} onClick={()=>setOpen(value=>value===index?null:index)}><small>{String(index+1).padStart(2,'0')}</small>{t(item.question)}<span aria-hidden="true">{open===index?'−':'+'}</span></button></h3><div className={'lf-faq-answer'+(open===index?' is-open':'')} id={'lf-answer-'+index} inert={open!==index}><div><p>{t(item.answer)}</p></div></div></div>)}<SiteLink to="contact" className="lf-underlined">{pick('还有问题？联系我们','Ask us something else')}</SiteLink></div></div></section>
}
