'use client'
import {createContext,useContext,type ReactNode} from 'react'
import type {TemplateLocale} from '../../types'
export interface LandfallHostOptions {brandName?:Record<TemplateLocale,string>;logo?:string;lightLogo?:string;marketplaceHref?:string;marketplaceLabel?:Record<TemplateLocale,string>;marketplaceAriaLabel?:Record<TemplateLocale,string>;filing?:ReactNode}
const Context=createContext<LandfallHostOptions>({})
/** 宿主只注入品牌与平台入口，模板页面保持可独立运行。 */
export function LandfallHostProvider({children,...options}:LandfallHostOptions&{children:ReactNode}) {return <Context.Provider value={options}>{children}</Context.Provider>}
export function useLandfallHost(){return useContext(Context)}

