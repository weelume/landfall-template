import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {Article} from '../views/Journal'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="journal/what-a-bothy-night-is-like"><Article slug="what-a-bothy-night-is-like"/></Shell>}
