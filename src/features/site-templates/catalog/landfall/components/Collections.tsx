'use client'
import {useEffect,useRef,useState,useSyncExternalStore} from 'react'
import {motion,useReducedMotion,type PanInfo} from 'framer-motion'
import {destinations,guides,posts,tours,type Tour,type Guide,type Post} from '../content/data'
import {useSite} from './context'
import {Picture,SiteLink,SectionHead,Heading,Eyebrow} from './ui'
import {Reveal} from './motion'

export function TourCard({tour,compact=false}:{tour:Tour;compact?:boolean}) {
 const {t,pick}=useSite()
 return <SiteLink to={'tour/'+tour.slug} className={'lf-tour-card'+(compact?' is-compact':'')}><div className="lf-card-image"><Picture src={tour.image} alt={tour.alt} reveal="bottom"/><p className="lf-eyebrow">{t(tour.style)} · {t(tour.country)}</p></div><div className="lf-card-caption"><h3>{t(tour.title)}</h3><p>{tour.days}{pick(' 天',' days')} · {pick('起价 ','from ')}{tour.price} · {t(tour.departs)} · {tour.seats}{pick(' 个余位',' left')}</p></div></SiteLink>
}
export function GuideCard({guide}:{guide:Guide}) {const {t,pick}=useSite();return <article className="lf-guide-card lf-glass"><Picture src={guide.image} alt={guide.alt} reveal="bottom"/><div><Eyebrow>{t(guide.role)}</Eyebrow><h3>{t(guide.name)}</h3><p>{t(guide.description)}</p><p className="lf-eyebrow">{guide.toursLed} {pick('次带队经历','tours led')}</p><SiteLink to={'guide/'+guide.slug} className="lf-underlined">{pick('认识向导','Meet '+guide.name.split(' ')[0])}</SiteLink></div></article>}

/** 原站两种轮播共用无限索引，行程保持平直缩放，向导沿弧线旋转；不自动播放。 */
export function CollectionCarousel({kind='tours'}:{kind?:'tours'|'guides'}) {
 const {t,pick}=useSite(),reduced=useReducedMotion(),items=kind==='tours'?tours.slice(0,8):guides
 const [active,setActive]=useState(0),[dragging,setDragging]=useState(false),wheel=useRef<ReturnType<typeof setTimeout>|null>(null),mobile=useSyncExternalStore(subscribeMobile,mobileSnapshot,()=>false)
 const count=items.length,normalize=(n:number)=>(n%count+count)%count
 useEffect(()=>()=>{if(wheel.current)clearTimeout(wheel.current)},[])
 if(kind==='guides'&&mobile)return <NativeGuides/>
 if(!count)return null
 const selected=items[normalize(active)]
 function released(_:MouseEvent|TouchEvent|PointerEvent,info:PanInfo){setDragging(false);if(Math.abs(info.offset.x)>45||Math.abs(info.velocity.x)>300){const step=Math.min(2,Math.max(1,Math.round((Math.abs(info.offset.x)+Math.min(Math.abs(info.velocity.x)*.12,500))/350)));setActive(value=>normalize(value+(info.offset.x<0?step:-step)))}}
 return <div className={'lf-carousel lf-carousel-'+kind}>
  <div className="lf-carousel-window" role="group" tabIndex={0} aria-label={pick('拖拽或使用左右方向键切换','Drag, or use the arrow keys')} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();setActive(value=>normalize(value+(e.key==='ArrowRight'?1:-1)))}else if(e.key==='Home'){e.preventDefault();setActive(0)}else if(e.key==='End'){e.preventDefault();setActive(count-1)}}} onWheel={e=>{if(Math.abs(e.deltaX)<Math.abs(e.deltaY)||Math.abs(e.deltaX)<10)return;if(wheel.current)clearTimeout(wheel.current);wheel.current=setTimeout(()=>setActive(value=>normalize(value+(e.deltaX>0?1:-1))),140)}}>
   <motion.div className="lf-carousel-drag" drag="x" dragConstraints={{left:0,right:0}} dragElastic={.5} dragMomentum={false} onDragStart={()=>setDragging(true)} onDragEnd={released} style={{touchAction:'pan-y'}}>
    {items.map((item,index)=>{let offset=normalize(index-active);if(offset>count/2)offset-=count;return <motion.div key={item.slug} className="lf-carousel-slide" initial={false} animate={{x:`${offset*106}%`,scale:offset===0?1:kind==='guides'?.88:mobile?.9:.84,y:Math.abs(offset)*(kind==='guides'?28:22),rotate:kind==='guides'?offset*9:0,opacity:Math.abs(offset)<=2?1:0}} transition={reduced?{duration:0}:{type:'spring',stiffness:190,damping:28}} style={{zIndex:count-Math.abs(offset),pointerEvents:Math.abs(offset)<=2&&!dragging?'auto':'none'}} aria-hidden={offset!==0} onClickCapture={event=>{if(offset!==0){event.preventDefault();setActive(index)}}}><div inert={offset!==0}>{kind==='tours'?<TourCard tour={item as Tour}/>:<GuideCard guide={item as Guide}/>}</div></motion.div>})}
   </motion.div>
  </div>
  {kind==='tours'&&<div className="lf-carousel-price"><span>{pick('起价','From')} <strong>{(selected as Tour).price}</strong></span><SiteLink to={'tour/'+selected.slug} className="lf-pill lf-pill-orange">{pick('查看行程','See the tour')}</SiteLink></div>}
  <div className="lf-carousel-pagination"><p className="lf-eyebrow">{String(normalize(active)+1).padStart(2,'0')} / {String(count).padStart(2,'0')} · {kind==='tours'?t((selected as Tour).place):t((selected as Guide).name)}</p><div className="lf-dots">{items.map((item,index)=><button key={item.slug} aria-label={pick('切换至','Select ')+t(kind==='tours'?(item as Tour).title:(item as Guide).name)} aria-pressed={index===normalize(active)} onClick={()=>setActive(index)} />)}</div></div>
 </div>
}

export function DestinationsPanel() {
 const {t}=useSite(),[active,setActive]=useState(0),reduced=useReducedMotion()
 const selected=destinations[active]
 return <div className="lf-destinations-panel"><nav aria-label={t('Destinations')}>{destinations.map((d,index)=><SiteLink to={'destination/'+d.slug} key={d.slug} className={index===active?'is-active':''} onClick={event=>{if(window.matchMedia('(pointer:coarse)').matches&&index!==active){event.preventDefault();setActive(index)}}} onFocus={event=>{if(event.currentTarget.matches(':focus-visible'))setActive(index)}}><span onMouseEnter={()=>{if(window.matchMedia('(hover:hover) and (pointer:fine)').matches)setActive(index)}}><small>{String(index+1).padStart(2,'0')}</small>{t(d.name)}</span></SiteLink>)}</nav><div className="lf-destination-image">{destinations.map((d,index)=><motion.img src={d.image} alt={index===active?t(d.alt):''} aria-hidden={index!==active} key={d.slug} initial={false} animate={{opacity:active===index?1:0,scale:active===index?1:1.06}} transition={{duration:reduced?0:.65}}/>)}<div><p className="lf-eyebrow">{t(selected.season)}</p><p>{t(selected.description)}</p></div></div></div>
}
export function JournalCard({post,featured=false}:{post:Post;featured?:boolean}) {const {t}=useSite();return <SiteLink className={'lf-journal-card'+(featured?' is-featured':'')} to={'journal/'+post.slug}><Picture src={post.image} alt={post.alt} reveal="bottom"/><div><Eyebrow>{t(post.category)}</Eyebrow><h3>{t(post.title)}</h3>{featured&&<p>{t(post.description)}</p>}<p className="lf-eyebrow">{t(post.author)} · {t(post.readTime)} · {post.date}</p></div></SiteLink>}
export function JournalGrid({limit=posts.length}:{limit?:number}) {return <div className="lf-journal-grid">{posts.slice(0,limit).map((post,index)=><Reveal key={post.slug} delay={index*.08}><JournalCard post={post} featured={index===0}/></Reveal>)}</div>}
export function ListingHero({title,subtitle,image,split=false}:{title:string;subtitle:string;image?:string;split?:boolean}) {return <section className={'lf-listing-hero'+(image?' has-image':'')+(split?' is-split':'')}>{image&&<Picture src={image} className="lf-listing-background" priority/>}<div><Heading text={title} as="h1"/><p>{useSite().t(subtitle)}</p></div></section>}
export function Departures(){return <section className="lf-section lf-dark"><SectionHead number="02 / 09" title="Tours leaving soon." link={{to:'tours',label:'All tours'}}/><CollectionCarousel/><p className="lf-small-copy">{useSite().t('Twelve travellers at most, a guide who grew up there, and the price you see is the price you pay. These are the next groups to leave.')}</p></section>}

const subscribeMobile=(callback:()=>void)=>{const media=window.matchMedia('(max-width:809px)');media.addEventListener('change',callback);return()=>media.removeEventListener('change',callback)}
const mobileSnapshot=()=>window.matchMedia('(max-width:809px)').matches
function NativeGuides(){
 const root=useRef<HTMLDivElement>(null),[active,setActive]=useState(0),{t,pick}=useSite(),reduced=useReducedMotion()
 const select=(index:number)=>{const node=root.current,card=node?.firstElementChild;if(node&&card instanceof HTMLElement)node.scrollTo({left:index*(card.offsetWidth+14),behavior:reduced?'instant':'smooth'})}
 return <div className="lf-native-guides"><div className="lf-native-guide-track" ref={root} tabIndex={0} aria-label={pick('向导列表，可横向滚动','Guides, scroll horizontally')} onScroll={event=>{const node=event.currentTarget,card=node.firstElementChild;if(card instanceof HTMLElement)setActive(Math.min(guides.length-1,Math.round(node.scrollLeft/(card.offsetWidth+14))))}}>{guides.map(guide=><GuideCard key={guide.slug} guide={guide}/>)}</div><div className="lf-dots">{guides.map((guide,index)=><button key={guide.slug} onClick={()=>select(index)} aria-pressed={index===active} aria-label={pick('查看向导：','Guide: ')+t(guide.name)}/>)}</div></div>
}
