'use client'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {useEffect,useRef,useState,type ReactNode} from 'react'
import {useLandfallHost} from '../host'
import {brand} from '../config/brand'
import {destinations,footerNavigation,mainNavigation} from '../content/data'
import {useSite,LandfallContext} from './context'
import {SiteLink,Eyebrow} from './ui'
import {RouteCurtain} from './RouteCurtain'
import type {SiteTemplatePageProps} from '../../../types'
import '../theme.css'

function SiteChrome({children,slug}:{children:ReactNode;slug:string}) {
 const host=useLandfallHost(),{locale,basePath,pick,t}=useSite(),router=useRouter()
 const [menu,setMenu]=useState(false),dialog=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement>(null)
 const name=host.brandName?.[locale]??brand.name[locale]
 const languageHref=basePath+(locale==='zh'?'/en':'')+(slug?'/'+slug:'')||'/'
 useEffect(()=>{const html=document.documentElement,previous=html.lang;html.dataset.landfall='';html.lang=locale==='zh'?'zh-CN':'en';return()=>{delete html.dataset.landfall;html.lang=previous}},[locale])
 useEffect(()=>{
   const node=dialog.current;if(!node)return
   if(!menu){if(node.open)node.close();return}
   const previous=document.body.style.overflow;document.body.style.overflow='hidden';node.showModal()
   return()=>{if(node.open)node.close();document.body.style.overflow=previous}
 },[menu])
 function closeMenu(){setMenu(false);trigger.current?.focus()}
 return <div className="landfall" lang={locale==='zh'?'zh-CN':'en'}>
  <a className="lf-skip" href="#lf-main">{pick('跳至正文','Skip to content')}</a>
  <header className={'lf-nav'+(slug?' is-inner':'')}>
   <SiteLink to="/" className="lf-brand" label={pick('返回首页','Home')}>
    {host.lightLogo?<img src={host.lightLogo} alt="" width={24} height={24}/>:<span className="lf-brand-mark" aria-hidden="true">−</span>}{name}
   </SiteLink>
   <nav aria-label={pick('主导航','Main navigation')} className="lf-desktop-nav">{mainNavigation.map(item=><SiteLink key={item.slug} to={item.slug} className={slug===item.slug?'is-current':''}>{item[locale]}</SiteLink>)}</nav>
   <div className="lf-nav-actions"><Link className="lf-language" href={languageHref} onClick={event=>{event.preventDefault();router.push(languageHref+window.location.search+window.location.hash)}} aria-label={pick('切换到英文','Switch to Chinese')}>{pick('EN','中文')}</Link><SiteLink to="plan-a-trip" className="lf-pill lf-pill-light">{pick('规划旅行','Plan a trip')}</SiteLink><button ref={trigger} className="lf-menu-toggle" aria-label={pick('打开菜单','Menu')} aria-expanded={menu} aria-controls="lf-menu" onClick={()=>setMenu(true)}><span/><span/></button></div>
  </header>
  <dialog ref={dialog} id="lf-menu" className="lf-menu" onCancel={()=>closeMenu()} onClick={event=>{if(event.target===event.currentTarget)closeMenu()}} aria-label={pick('网站菜单','Site menu')}>
   <div className="lf-menu-panel"><button className="lf-close" onClick={closeMenu} aria-label={pick('关闭菜单','Close menu')}>×</button><p className="lf-eyebrow">{name}</p><nav>{footerNavigation.map((item,index)=><SiteLink to={item.slug} key={item.slug} className="lf-menu-link" onClick={closeMenu}><span><small>{String(index+1).padStart(2,'0')}</small>{item[locale]}</span></SiteLink>)}</nav></div>
  </dialog>
  <RouteCurtain/>
  <main id="lf-main" tabIndex={-1}>{children}</main>
  <footer className="lf-footer">
   <SiteLink to="/" className="lf-footer-brand">{name}</SiteLink>
   <nav className="lf-footer-destinations" aria-label={pick('目的地','Where we go')}>{destinations.map((d,index)=><SiteLink key={d.slug} to={'destination/'+d.slug}><small>{String(index+1).padStart(2,'0')}</small>{t(d.name)}</SiteLink>)}</nav>
   <div className="lf-footer-bottom"><div><Eyebrow>{pick('小团旅行与私人行程','Tour operator and travel agency')}</Eyebrow><p>{brand.address[locale]}</p><a href={'mailto:'+brand.email}>{brand.email}</a><p>{pick('让每段旅程留下真实的故事','Small journeys. Lasting stories.')}</p>{host.filing}</div><nav className="lf-footer-links" aria-label={pick('页脚导航','Footer navigation')}>{footerNavigation.map(item=><SiteLink to={item.slug} key={item.slug}>{item[locale]}</SiteLink>)}</nav></div>
   <div className="lf-footer-legal"><span>© {brand.copyrightYear} {name}</span><span>{pick('所有行程、价格与评价均为模板演示','All trips, prices and reviews are template demonstrations')}</span><button onClick={()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>{pick('返回顶部','Back to top')}</button></div>
  </footer>
  {host.marketplaceHref&&<Link href={host.marketplaceHref} className="lf-marketplace" aria-label={host.marketplaceAriaLabel?.[locale]}>{host.lightLogo&&<img src={host.lightLogo} width={24} height={24} alt=""/>}<span>{host.brandName?.[locale]}</span></Link>}
 </div>
}
export function Shell({locale='zh',basePath,slug,children}:SiteTemplatePageProps&{slug:string;children:ReactNode}) {return <LandfallContext locale={locale} basePath={basePath}><SiteChrome slug={slug}>{children}</SiteChrome></LandfallContext>}
