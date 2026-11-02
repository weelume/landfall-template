'use client'
import {usePathname} from 'next/navigation'
import {Shell} from '../features/site-templates/catalog/landfall/components/Shell'
import {Information} from '../features/site-templates/catalog/landfall/views/Information'
export default function NotFound(){const pathname=usePathname();return <Shell basePath="" locale={pathname?.startsWith('/en')?'en':'zh'} slug="404"><Information slug="404"/></Shell>}
