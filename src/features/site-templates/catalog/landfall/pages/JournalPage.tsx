import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {JournalList} from '../views/Journal'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="journal"><JournalList/></Shell>}
