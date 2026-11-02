'use client'
import {useEffect,useRef,useState,type FormEvent} from 'react'
import {tours} from '../content/data'
import {formSettings} from '../config/forms'
import {useSite} from './context'
import {debugEvent} from './debug'
interface Errors {name?:string;email?:string;travellers?:string;message?:string}
export function TripForm({contact=false}:{contact?:boolean}) {
 const {t,pick}=useSite(),[kind,setKind]=useState('small'),[errors,setErrors]=useState<Errors>({}),[success,setSuccess]=useState(false),form=useRef<HTMLFormElement>(null),status=useRef<HTMLParagraphElement>(null)
 useEffect(()=>{const params=new URLSearchParams(window.location.search),node=form.current;if(!node)return;for(const [key,param] of [['tour','tour'],['month','date'],['message','role']] as const){const input=node.elements.namedItem(key);if(input instanceof HTMLInputElement||input instanceof HTMLSelectElement||input instanceof HTMLTextAreaElement){const value=params.get(param);if(value!==null)input.value=value}}},[])
 function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setSuccess(false)
  const data=new FormData(event.currentTarget),next:Errors={}
  if(String(data.get('name')??'').trim().length<2)next.name=pick('请输入至少两个字符的姓名','Enter a name with at least two characters')
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get('email')??'')))next.email=pick('请输入有效的电子邮箱','Enter a valid email address')
  const travellers=Number(data.get('travellers')),max=kind==='small'?formSettings.groupLimit:formSettings.travellers.max
  if(!contact&&(!Number.isInteger(travellers)||travellers<formSettings.travellers.min||travellers>max))next.travellers=pick('人数须为 '+formSettings.travellers.min+'–'+max+' 的整数','Enter a whole number from '+formSettings.travellers.min+' to '+max)
  if(contact&&!String(data.get('message')??'').trim())next.message=pick('请输入留言内容','Enter a message')
  debugEvent('本地表单校验',{contact,errorCount:Object.keys(next).length,sent:false,saved:false});setErrors(next)
  if(Object.keys(next).length){const first=Object.keys(next)[0];const field=event.currentTarget.elements.namedItem(first);if(field instanceof HTMLElement)field.focus();return}
  setSuccess(true);requestAnimationFrame(()=>status.current?.focus())
 }
 const fieldError=(name:keyof Errors)=>errors[name]&&<span id={'lf-error-'+name} className="lf-field-error">{errors[name]}</span>
 return <form className="lf-form lf-glass" ref={form} onSubmit={submit} noValidate aria-label={pick(contact?'联系表单':'旅行规划表单',contact?'Contact form':'Plan a trip form')}>
  <p className="lf-demo-note">{pick('演示表单：仅在当前页面校验，不发送、不保存任何内容。','Demo form: validation only. Nothing is sent or saved.')}</p>
  <div className="lf-form-row"><label>{pick('姓名','Your name')} *<input autoComplete="name" name="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name?'lf-error-name':undefined}/>{fieldError('name')}</label><label>{pick('电子邮箱','Email')} *<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email?'lf-error-email':undefined}/>{fieldError('email')}</label></div>
  {!contact&&<><fieldset><legend>{pick('想要怎样的旅行？','What kind of trip?')}</legend><div className="lf-chips">{[['small',pick('小团旅行','Small-group tour')],['private',pick('私人行程','Private trip')],['unsure',pick('还没决定','Not sure yet')]].map(([value,label])=><button type="button" key={value} onClick={()=>{setKind(value);setSuccess(false)}} aria-pressed={kind===value}>{label}</button>)}</div></fieldset><label>{pick('行程','Tour')}<select name="tour" defaultValue=""><option value="">{pick('还没决定','Not sure yet')}</option>{tours.map(tour=><option key={tour.slug} value={tour.slug}>{t(tour.title)} · {tour.days}{pick(' 天',' d')} · {tour.price}</option>)}</select></label><div className="lf-form-row"><label>{pick('月份或日期','Month or date')}<input name="month" placeholder={pick('2027 年 5 月','May 2027')}/></label><label>{pick('旅行人数','Travellers')}<input type="number" name="travellers" min={formSettings.travellers.min} max={kind==='small'?formSettings.groupLimit:formSettings.travellers.max} defaultValue={formSettings.travellers.initial} aria-invalid={Boolean(errors.travellers)} aria-describedby={errors.travellers?'lf-error-travellers':undefined}/>{fieldError('travellers')}</label></div></>}
  {contact&&<label>{pick('主题','Subject')}<select name="subject"><option>{pick('一般咨询','General question')}</option><option>{pick('现有预订','Existing booking')}</option><option>{pick('私人旅行','Private trip')}</option><option>{pick('合作与招聘','Partnerships and careers')}</option></select></label>}
  <label>{pick('留言','Your message')}{contact?' *':''}<textarea name="message" rows={5} placeholder={pick('告诉我们日期、同行的人，以及你期待的旅程','Tell us about your dates, your people and the trip you have in mind')} required={contact} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message?'lf-error-message':undefined}/>{fieldError('message')}</label>
  <button className="lf-pill lf-pill-orange" type="submit">{pick('校验演示内容','Validate demo request')}</button>
  <p ref={status} role="status" tabIndex={-1} className={success?'lf-success':''}>{success?pick('校验通过。这是演示，内容尚未发送或保存。','Validation passed. This is a demo; nothing has been sent or saved.'):pick('真实服务需另行接入，当前没有预订或发送功能。','A real service must be connected separately. Booking and sending are unavailable.')}</p>
 </form>
}
