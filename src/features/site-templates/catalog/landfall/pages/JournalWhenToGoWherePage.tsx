import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {Article} from '../views/Journal'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="journal/when-to-go-where"><Article slug="when-to-go-where"/></Shell>}
