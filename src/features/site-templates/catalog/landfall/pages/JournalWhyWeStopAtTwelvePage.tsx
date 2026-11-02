import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {Article} from '../views/Journal'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="journal/why-we-stop-at-twelve"><Article slug="why-we-stop-at-twelve"/></Shell>}
