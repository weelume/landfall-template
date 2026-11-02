import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {Information} from '../views/Information'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="reviews"><Information slug="reviews"/></Shell>}
