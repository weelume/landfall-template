import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {GuideList} from '../views/Guides'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="guides"><GuideList/></Shell>}
