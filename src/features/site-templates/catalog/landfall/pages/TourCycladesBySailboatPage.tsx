import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {TourDetail} from '../views/TourDetail'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="tour/cyclades-by-sailboat"><TourDetail slug="cyclades-by-sailboat"/></Shell>}
