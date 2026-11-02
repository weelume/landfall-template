import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {Tours} from '../views/Tours'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="tours"><Tours/></Shell>}
