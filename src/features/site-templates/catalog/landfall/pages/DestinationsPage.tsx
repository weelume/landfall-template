import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {DestinationList} from '../views/Destinations'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="destinations"><DestinationList/></Shell>}
