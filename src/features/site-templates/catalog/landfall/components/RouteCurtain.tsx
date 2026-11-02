'use client'
import {useEffect,useRef,useState} from 'react'
import {usePathname,useRouter} from 'next/navigation'
import {useReducedMotion} from 'framer-motion'
import {useSite} from './context'
import {useLandfallHost} from '../host'
export const navigateEvent='landfall:navigate'
/** 保留原站上下移动遮幕，但只通过 Next 客户端路由切页；修饰键和外链不拦截。 */
export function RouteCurtain(){
 const [leaving,setLeaving]=useState(false),[loading,setLoading]=useState(false),[arrived,setArrived]=useState(false),router=useRouter(),pathname=usePathname(),reduced=useReducedMotion(),timer=useRef<ReturnType<typeof setTimeout>|null>(null),{pick,locale}=useSite(),host=useLandfallHost()
 useEffect(()=>{const onNavigate=(event:Event)=>{const href=(event as CustomEvent<string>).detail;if(timer.current)return;setLeaving(true);timer.current=setTimeout(()=>{router.push(href);timer.current=null},reduced?0:540)};window.addEventListener(navigateEvent,onNavigate);return()=>{window.removeEventListener(navigateEvent,onNavigate);if(timer.current)clearTimeout(timer.current)}},[router,reduced])
 useEffect(()=>{let cancelled=false;queueMicrotask(()=>{if(cancelled)return;setLeaving(false);setArrived(Boolean(reduced));if(!sessionStorage.getItem('landfall-loaded')){setLoading(true);sessionStorage.setItem('landfall-loaded','1')}});const loadTimer=setTimeout(()=>setLoading(false),reduced?0:900),arrivalTimer=setTimeout(()=>setArrived(true),reduced?0:620);return()=>{cancelled=true;clearTimeout(loadTimer);clearTimeout(arrivalTimer)}},[pathname,reduced])
 return <><div key={pathname} className={'lf-route-curtain'+(leaving?' is-leaving':'')} aria-hidden="true" data-finished={arrived&&!loading} onAnimationEnd={()=>{if(!leaving)setArrived(true)}}/>{loading&&<div className="lf-loader" role="status"><span>{host.brandName?.[locale]??'Landfall'}</span><button onClick={()=>setLoading(false)}>{pick('跳过','Skip')}</button><i/></div>}</>
}
