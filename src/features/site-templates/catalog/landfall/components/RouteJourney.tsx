'use client'
import {motion} from 'framer-motion'
import {useRef} from 'react'
import {type Day,homeDays} from '../content/data'
import {useAutoAdvance} from './motion'
import {useSite} from './context'
import {Picture,SiteLink,Eyebrow,Heading} from './ui'
interface JourneyProps {items?:Day[];home?:boolean;title?:string}
export function RouteJourney({items=homeDays,home=false,title='The route, day by day.'}:JourneyProps) {
 const root=useRef<HTMLElement>(null),{t,pick}=useSite(),state=useAutoAdvance(root,items.length,6000,.25,home)
 if(!items.length)return null
 const active=Math.min(state.active,items.length-1),day=items[active],next=items[(active+1)%items.length]
 return <section ref={root} className={'lf-journey'+(home?' lf-hero':' lf-itinerary')} data-active-day={active+1} data-playing={state.playing}>
   <div className="lf-journey-backdrop" aria-hidden="true">{items.map((item,index)=>item.image&&<motion.img key={item.slug} src={item.image} alt="" initial={false} animate={{opacity:index===active?1:0}} transition={{duration:state.reduced?0:.9,ease:'easeInOut'}} style={{zIndex:index===active?1:0}} draggable={false}/>)}</div>
   <div className="lf-journey-shade"/>
   <div className="lf-journey-body">
    <div className="lf-journey-intro">{home?<><Eyebrow>{pick('本月精选 · 苏格兰西部高地 · 6 天 · 12 位旅客','Tour of the month · West Highlands · 6 days · 12 travellers')}</Eyebrow><h1 className="lf-hero-title">{pick('六日旅途','Six days.')}<em>{pick('一片自由的海岸','One wild coast.')}</em></h1><div className="lf-search-pill"><span><small>{pick('目的地','Where')}</small>{t('West Highlands')}</span><span><small>{pick('出发时间','When')}</small>{pick('2027 年 5 月','May 2027')}</span><span><small>{pick('同行人数','Travellers')}</small>{pick('2 位成人','2 adults')}</span><SiteLink to="tours" className="lf-pill lf-pill-orange">{pick('寻找行程','Find a tour')}</SiteLink></div></>:<Heading text={title}/>}</div>
    <div className="lf-day-card lf-glass" onMouseEnter={()=>state.setPaused(true)} onMouseLeave={()=>state.setPaused(false)} onFocusCapture={()=>state.setPaused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))state.setPaused(false)}}>
     <div className="lf-day-meta"><span>{pick('第','Day ')}{String(active+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}{pick(' 天','')}</span><span>{t(day.location)}</span></div>
     <motion.div key={day.slug} initial={state.reduced?false:{opacity:0,y:12,filter:'blur(4px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={{opacity:0,y:-8}} transition={{duration:state.reduced?0:.32}}><h2>{t(day.title)}</h2><p>{t(day.body)}</p><p className="lf-eyebrow lf-accent">{t(day.meta)}</p></motion.div>
     <button className="lf-next-day" onClick={()=>state.setActive((active+1)%items.length)} aria-label={pick('下一站：','Next: ')+t(next.location)}>{next.image&&<Picture src={next.image}/>}<span><small>{pick('下一站','Next')} · {String((active+1)%items.length+1).padStart(2,'0')}</small>{t(next.location)}</span></button>
     {home&&<SiteLink to="tour/highland-coast-on-foot" className="lf-underlined">{pick('查看完整行程','See the tour')}</SiteLink>}
    </div>
   </div>
   <div className="lf-route-timeline" onMouseEnter={()=>state.setPaused(true)} onMouseLeave={()=>state.setPaused(false)} onFocusCapture={()=>state.setPaused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))state.setPaused(false)}}><div className="lf-timeline-label"><span>{pick('沿着路线 一天一天出发','The route, day by day')}</span><span>{pick('拖动时间轴探索旅程','Drag the line to travel it')}</span></div><div className="lf-range-track">{home&&active<items.length-1&&<span key={day.slug} className="lf-timeline-progress" style={{left:(active/(items.length-1)*100)+'%',width:(100/(items.length-1))+'%',animationPlayState:state.playing?'running':'paused'}}/>}<input aria-label={pick('逐日路线','Route, day by day')} type="range" min={0} max={items.length-1} step={1} value={active} onChange={e=>state.setActive(Number(e.target.value))} onPointerDown={()=>state.setPaused(true)} onPointerUp={()=>state.setPaused(false)} onPointerCancel={()=>state.setPaused(false)}/><div className="lf-route-labels">{items.map((item,index)=><button key={item.slug} style={{left:(index/Math.max(1,items.length-1)*100)+'%'}} aria-pressed={index===active} aria-label={pick('第 '+(index+1)+' 天：','Day '+(index+1)+': ')+t(item.location)} onClick={()=>state.setActive(index)}><i/><small>{pick('第 '+(index+1)+' 天','Day '+(index+1))}</small><span>{t(item.location)}</span></button>)}</div></div>{home&&<button className="lf-play-toggle" onClick={()=>state.setManualPaused(value=>!value)}>{state.paused?pick('继续轮播','Resume'):pick('暂停轮播','Pause')}</button>}</div>
 </section>
}
