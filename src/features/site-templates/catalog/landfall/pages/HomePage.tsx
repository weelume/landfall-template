import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {Home} from '../views/Home'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug=""><Home/></Shell>}
