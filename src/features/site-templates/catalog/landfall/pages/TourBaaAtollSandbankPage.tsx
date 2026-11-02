import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {TourDetail} from '../views/TourDetail'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="tour/baa-atoll-sandbank"><TourDetail slug="baa-atoll-sandbank"/></Shell>}
