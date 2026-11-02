'use client'
import {useEffect,useRef,useState} from 'react'
import {motion,useReducedMotion} from 'framer-motion'
import {pageData,type ContentSection} from '../content/data'
import {useSite} from '../components/context'
import {Picture,Heading,Eyebrow,SiteLink} from '../components/ui'
import {ListingHero} from '../components/Collections'
import {EditorialSections,LegalContent,Blocks} from '../components/Editorial'
import {TripForm} from '../components/TripForm'
import {Faq} from '../components/Faq'
import {PlanCTA,NumberRoll} from '../components/HomeSections'
import {ReviewList,TravelSteps,CareersContent} from './Supporting'

function AboutTimeline({section}:{section:ContentSection}){const {t}=useSite(),[active,setActive]=useState(0),root=useRef<HTMLDivElement>(null),reduced=useReducedMotion(),years=['2009','2012','2016','2021','2026'];const parts=years.map(year=>{const index=section.blocks.findIndex(b=>b.text===year);return {year,title:section.blocks[index+1].text,body:section.blocks[index+2].text}})
 useEffect(()=>{const node=root.current;if(!node)return;const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive(Number((entry.target as HTMLElement).dataset.year))},{rootMargin:'-25% 0px -45% 0px'});for(const item of node.querySelectorAll('[data-year]'))observer.observe(item);return()=>observer.disconnect()},[])
 const remainder=section.blocks.findIndex(b=>b.text==='By the numbers')
 return <><section className="lf-section lf-dark"><Heading text="From one route to nine."/><div ref={root} className="lf-about-timeline"><aside><div className="lf-year-image">{section.images.slice(0,5).map((image,index)=><motion.img key={image.src} src={image.src} alt={active===index?t(image.alt??''):''} initial={false} animate={{opacity:index===active?1:0}} transition={{duration:reduced?0:.8}}/>)}<span>{years[active]}</span></div><nav aria-label={t('Our story')}>{years.map((year,index)=><a className={active===index?'is-active':''} href={'#year-'+year} key={year}>{year}</a>)}</nav></aside><div>{parts.map((part,index)=><article data-year={index} id={'year-'+part.year} key={part.year}><Eyebrow>{part.year}</Eyebrow><Heading text={part.title}/><p>{t(part.body)}</p></article>)}</div></div><div className="lf-facts">{[['9','routes'],['12','travellers at most'],['17','years on the road'],['0','booking fees']].map(([value,label])=><div key={label}><NumberRoll value={value}/><p>{t(label)}</p></div>)}</div><div className="lf-editorial-copy"><Blocks blocks={section.blocks.slice(remainder).filter(b=>!['dt'].includes(b.type))}/></div></section></>}
export function Information({slug}:{slug:string}) {
 const page=pageData.find(p=>p.path==='/'+slug)!,{t,pick}=useSite()
 const legal=['privacy','terms','cookies','booking-conditions','sustainability'].includes(slug)
 const form=slug==='contact'||slug==='plan-a-trip'
 if(form)return <><section className="lf-section lf-form-layout"><div className="lf-form-intro"><Eyebrow>{pick(slug==='contact'?'联系我们':'规划旅行',slug==='contact'?'Contact':'Plan a trip')}</Eyebrow><Heading text={page.heading} as="h1"/><p>{t(page.hero.subtitle??'')}</p>{page.hero.image&&<Picture src={page.hero.image.src} alt={page.hero.image.alt??''}/>}</div><TripForm contact={slug==='contact'}/></section>{slug==='contact'&&<Faq compact/>}</>
 if(slug==='thanks')return <section className="lf-section lf-status"><Eyebrow>{pick('本地演示','Local demonstration')}</Eyebrow><h1>{pick('演示已完成','Demo complete')}</h1><p>{pick('本页面是模板的结果页示例，不代表任何请求已发送或预订已成立。','This is a sample result page. No request has been sent and no booking has been made.')}</p><SiteLink to="tours" className="lf-pill lf-pill-orange">{pick('继续探索行程','Explore tours')}</SiteLink><SiteLink to="contact">{pick('查看演示联系表单','See the demo contact form')}</SiteLink></section>
 if(slug==='404')return <section className="lf-detail-hero lf-status"><Picture src={page.hero.image!.src}/><div><Eyebrow>404</Eyebrow><Heading text={page.heading} as="h1"/><p>{t(page.hero.subtitle??'')}</p><SiteLink to="/" className="lf-pill lf-pill-orange">{pick('返回首页','Home')}</SiteLink><SiteLink to="tours" className="lf-pill lf-pill-light">{pick('全部行程','All tours')}</SiteLink></div></section>
 return <><ListingHero title={page.heading} subtitle={page.hero.subtitle??''} image={legal?undefined:page.hero.image?.src} split={slug==='careers'||slug==='private-trips'}/>{legal?<LegalContent section={page.sections[0]}/>:slug==='reviews'?<ReviewList/>:slug==='how-it-works'?<TravelSteps/>:slug==='careers'?<CareersContent/>:slug==='faq'?<Faq/>:slug==='about'?<><AboutTimeline section={page.sections[1]}/><EditorialSections sections={page.sections.slice(2)}/></>:<EditorialSections sections={page.sections.slice(1)}/>} {!legal&&<PlanCTA/>}</>
}
