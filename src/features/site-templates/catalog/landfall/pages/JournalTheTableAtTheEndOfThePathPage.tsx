import type {SiteTemplatePageProps} from '../../../types'
import {Shell} from '../components/Shell'
import {Article} from '../views/Journal'
export default function Page(props:SiteTemplatePageProps){return <Shell {...props} slug="journal/the-table-at-the-end-of-the-path"><Article slug="the-table-at-the-end-of-the-path"/></Shell>}
