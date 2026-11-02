'use client'
import Link from 'next/link'
import {useEffect,useRef,useState,type ReactNode,type MouseEvent,type FocusEvent} from 'react'
import {motion,useReducedMotion,useInView} from 'framer-motion'
import {useSite} from './context'
import {navigateEvent} from './RouteCurtain'
export function SiteLink({to,children,className='',label,onClick,onFocus,draggable}:{to:string;children:ReactNode;className?:string;label?:string;draggable?:boolean;onClick?:(event:MouseEvent<HTMLAnchorElement>)=>void;onFocus?:(event:FocusEvent<HTMLAnchorElement>)=>void}) {const {href}=useSite();return <Link href={href(to)} className={className} aria-label={label} draggable={draggable} onFocus={onFocus} onClick={event=>{onClick?.(event);if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||/^(https?:|mailto:|tel:|#)/.test(to))return;const next=new URL(href(to),window.location.origin);if(next.pathname===window.location.pathname)return;event.preventDefault();window.dispatchEvent(new CustomEvent(navigateEvent,{detail:next.pathname+next.search+next.hash}))}}>{children}</Link>}
export function Picture({src,alt='',className='',priority=false,reveal}:{src:string;alt?:string;className?:string;priority?:boolean;reveal?:'bottom'|'left'|'right'|'split'}) {
 const {t}=useSite(),reduced=useReducedMotion(),root=useRef<HTMLImageElement>(null),[visible,setVisible]=useState(!reveal)
 const masks={bottom:'inset(100% 0 0 0)',left:'inset(0 100% 0 0)',right:'inset(0 0 0 100%)',split:'inset(0 22% 0 22%)'}
 // 观察未裁剪的外层；观察被完全裁剪的图片本身会令揭示效果永远无法触发。
 useEffect(()=>{const parent=root.current?.parentElement;if(!reveal||!parent)return;const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){setVisible(true);observer.disconnect()}},{threshold:.05});observer.observe(parent);return()=>observer.disconnect()},[reveal])
 return <motion.img ref={root} src={src} alt={alt?t(alt):''} className={className} loading={priority?'eager':'lazy'} decoding="async" draggable={false} initial={reveal&&!reduced?{clipPath:masks[reveal]}:false} animate={visible||reduced?{clipPath:'inset(0)'}:undefined} transition={{duration:reduced?0:1.3,ease:[.76,0,.24,1]}}/>
}
export function Eyebrow({children}:{children:ReactNode}) {return <p className="lf-eyebrow"><span className="lf-dot"/>{children}</p>}
export function Heading({text,as='h2'}:{text:string;as?:'h1'|'h2'|'h3'}) {
 const {t,locale}=useSite(),reduced=useReducedMotion(),Tag=as,root=useRef<HTMLHeadingElement>(null),visible=useInView(root,{once:true,amount:.3})
 const words=locale==='en'?t(text).split(' '):Array.from(t(text).replace(/[，。！？]$/,''))
 return <Tag ref={root} className="lf-heading"><span aria-label={t(text)} className="lf-word-heading">{words.map((word,index)=><span className="lf-word-mask" key={index} aria-hidden="true"><motion.span initial={reduced?false:{y:'108%'}} animate={visible?{y:0}:undefined} transition={{duration:reduced?0:.95,delay:reduced?0:.025*index,ease:[.16,.84,.24,1]}}>{word}{locale==='en'?'\u00a0':''}</motion.span></span>)}</span></Tag>
}
export function SectionHead({number,title,link}:{number:string;title:string;link?:{to:string;label:string}}) {const {t}=useSite();return <div className="lf-section-head"><Eyebrow>{number}</Eyebrow>{link&&<SiteLink to={link.to} className="lf-text-link">{t(link.label)}</SiteLink>}<Heading text={title}/></div>}
