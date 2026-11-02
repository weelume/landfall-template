import {notFound} from 'next/navigation'
import {landfallTemplate} from '../../features/site-templates/catalog/landfall/meta'
export default async function Page({params}:{params:Promise<{slug?:string[]}>}){
 const segments=(await params).slug??[];const locale=segments[0]==='en'?'en':'zh';const slug=(locale==='en'?segments.slice(1):segments).join('/')
 const page=landfallTemplate.surfaces[0].pages.find(page=>page.slug===slug);if(!page)notFound()
 const {default:View}=await page.load();return <View basePath="" locale={locale}/>
}
