import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {Article} from '../views/Journal'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="journal/what-to-pack-for-a-walking-week"><Article slug="what-to-pack-for-a-walking-week"/></Shell>}
