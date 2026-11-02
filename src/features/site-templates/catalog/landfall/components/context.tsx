'use client'
import {createContext, useContext, type ReactNode} from 'react'
import type {TemplateLocale} from '../../../types'
import zh from '../content/zh.json'
import {useLandfallHost} from '../host'
const dictionary: Record<string,string> = zh
interface ContextValue {locale:TemplateLocale; basePath:string}
const Context = createContext<ContextValue>({locale:'zh',basePath:''})
export function LandfallContext({children,...value}:ContextValue&{children:ReactNode}) {return <Context.Provider value={value}>{children}</Context.Provider>}
export function useSite() {
  const {locale,basePath} = useContext(Context)
  const host=useLandfallHost()
  const pick = (cn:string,en:string) => locale==='zh'?cn:en
  const t = (text:string):string => {
    if(locale==='en'||!/[A-Za-z]/.test(text)) return host.brandName?text.replace(/landfall/gi,host.brandName[locale]):text
    if(typeof dictionary[text]!=='string') throw new Error('缺少中文文案: '+text)
    return host.brandName?dictionary[text].replace(/landfall/gi,host.brandName[locale]):dictionary[text]
  }
  const href = (path:string):string => {
    if(/^(https?:|mailto:|tel:)/.test(path))return path
    return basePath+(locale==='en'?'/en':'')+(path==='/'?'':path.startsWith('/')?path:'/'+path)||'/'
  }
  return {locale,basePath,pick,t,href}
}
