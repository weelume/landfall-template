import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {Article} from '../views/Journal'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="journal/your-first-week-under-sail"><Article slug="your-first-week-under-sail"/></Shell>}
