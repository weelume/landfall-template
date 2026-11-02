'use client'
import {useEffect,useState,type ReactNode,type RefObject} from 'react'
import {motion,useReducedMotion} from 'framer-motion'
import {debugEvent} from './debug'
export function Reveal({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number}) {
  const reduced=useReducedMotion()
  return <motion.div className={className} initial={reduced?false:{opacity:0,y:26}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.7,delay,ease:[.16,.84,.24,1]}}>{children}</motion.div>
}
/** 自动播放仅在区块可见且未悬停、未聚焦、未拖动时运行；离开即清理计时器。 */
export function useAutoAdvance(ref:RefObject<HTMLElement|null>,length:number,interval:number,threshold=.25,enabled=true) {
 const reduced=useReducedMotion()
 const [active,setActive]=useState(0),[visible,setVisible]=useState(false),[interacting,setPaused]=useState(false),[paused,setManualPaused]=useState(false)
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.intersectionRatio>=threshold),{threshold:[0,threshold,1]});observer.observe(node);return()=>observer.disconnect()},[ref,threshold])
 useEffect(()=>{if(!enabled||!visible||interacting||paused||reduced||length<2)return;const timer=window.setInterval(()=>setActive(value=>(value+1)%length),interval);return()=>clearInterval(timer)},[enabled,visible,interacting,paused,reduced,length,interval])
 useEffect(()=>{debugEvent('自动轮播状态',{active,length,enabled,visible,interacting,paused,reduced:Boolean(reduced),interval})},[active,length,enabled,visible,interacting,paused,reduced,interval])
 return {active,setActive,paused,setPaused,setManualPaused,reduced,playing:enabled&&visible&&!interacting&&!paused&&!reduced&&length>1}
}
