import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {DestinationDetail} from '../views/Destinations'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="destination/italy"><DestinationDetail slug="italy"/></Shell>}
