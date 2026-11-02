import collections from './collections.json'
import pages from './pages.json'
export const {tours, days, homeDays, destinations, guides, posts, reviews} = collections
export const pageData = pages
export type Tour = (typeof tours)[number]
export type Day = (typeof days)[number]
export type Guide = (typeof guides)[number]
export type Post = (typeof posts)[number]
export type Destination = (typeof destinations)[number]
export type PageData = (typeof pages)[number]
export type ContentSection = PageData['sections'][number]
export type ContentBlock = ContentSection['blocks'][number]
export const mainNavigation = [
  {slug:'tours',zh:'全部行程',en:'Tours'}, {slug:'destinations',zh:'目的地',en:'Destinations'},
  {slug:'guides',zh:'当地向导',en:'Guides'}, {slug:'journal',zh:'旅行日志',en:'Journal'}, {slug:'about',zh:'关于我们',en:'About'},
]
export const footerNavigation = [
  ...mainNavigation, {slug:'private-trips',zh:'私人旅行',en:'Private trips'}, {slug:'how-it-works',zh:'如何出发',en:'How it works'},
  {slug:'reviews',zh:'旅客评价',en:'Reviews'}, {slug:'careers',zh:'加入我们',en:'Careers'}, {slug:'faq',zh:'常见问题',en:'FAQ'},
  {slug:'contact',zh:'联系我们',en:'Contact'}, {slug:'privacy',zh:'隐私政策',en:'Privacy'}, {slug:'terms',zh:'使用条款',en:'Terms'},
  {slug:'cookies',zh:'Cookie 政策',en:'Cookies'}, {slug:'booking-conditions',zh:'预订条款',en:'Booking conditions'},
  {slug:'sustainability',zh:'可持续旅行',en:'Sustainability'},
]
