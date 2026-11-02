import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {GuideDetail} from '../views/Guides'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="guide/calum-macrae"><GuideDetail slug="calum-macrae"/></Shell>}
