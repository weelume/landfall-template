'use client'
import {RouteJourney} from '../components/RouteJourney'
import {WhySection,DayStory,ReviewsCarousel,PlanCTA} from '../components/HomeSections'
import {Departures,DestinationsPanel,CollectionCarousel,JournalGrid} from '../components/Collections'
import {SectionHead} from '../components/ui'
import {useSite} from '../components/context'
export function Home(){const {t}=useSite();return <><RouteJourney home/><WhySection/><Departures/><section className="lf-section lf-dark"><SectionHead number="03 / 09" title="Six countries, one promise."/><p className="lf-section-description">{t('We only sell places we have walked, sailed or driven ourselves. Every one comes with a guide who grew up there.')}</p><DestinationsPanel/></section><DayStory/><section className="lf-section lf-dark"><SectionHead number="05 / 09" title="Guides who grew up there." link={{to:'guides',label:'All guides'}}/><CollectionCarousel kind="guides"/></section><ReviewsCarousel/><section className="lf-section lf-dark"><SectionHead number="07 / 09" title="From the journal." link={{to:'journal',label:'All stories'}}/><JournalGrid limit={3}/></section><PlanCTA/></>}
