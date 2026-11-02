import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {TourDetail} from '../views/TourDetail'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="tour/highland-coast-on-foot"><TourDetail slug="highland-coast-on-foot"/></Shell>}
