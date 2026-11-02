import type {SiteTemplate} from '../../types'
export const landfallTemplate:SiteTemplate={...{
  "id": "landfall",
  "name": "Landfall · 当地向导与小团旅行",
  "localizedNames": {
    "en": "Landfall · Small-group adventure travel"
  },
  "sceneId": "corporate-site",
  "listed": false,
  "tags": [
    "旅行运营商",
    "当地向导",
    "路线时间轴",
    "惯性轮播",
    "中英文",
    "PC / iPad / H5"
  ],
  "summary": "包含九条行程、六个目的地、五位向导与六篇完整日志的小团旅行模板，支持双语筛选、逐日探索及本地演示表单。",
  "accentColor": "#fa542b",
"gitUrl":"https://github.com/weelume/landfall-template",
"cover":"/templates/landfall/screenshots/desktop-home.webp",
"screenshots":[
  {
    "alt": "Landfall desktop home",
    "device": "desktop",
    "width": 1430,
    "height": 993,
    "src": "/templates/landfall/screenshots/desktop-home.webp"
  },
  {
    "alt": "Landfall desktop tours",
    "device": "desktop",
    "width": 1430,
    "height": 993,
    "src": "/templates/landfall/screenshots/desktop-tours.webp"
  },
  {
    "alt": "Landfall desktop journal",
    "device": "desktop",
    "width": 1430,
    "height": 993,
    "src": "/templates/landfall/screenshots/desktop-journal.webp"
  },
  {
    "alt": "Landfall desktop contact",
    "device": "desktop",
    "width": 1430,
    "height": 993,
    "src": "/templates/landfall/screenshots/desktop-contact.webp"
  },
  {
    "alt": "Landfall tablet home",
    "device": "tablet",
    "width": 824,
    "height": 1166,
    "src": "/templates/landfall/screenshots/tablet-home.webp"
  },
  {
    "alt": "Landfall tablet tours",
    "device": "tablet",
    "width": 824,
    "height": 1166,
    "src": "/templates/landfall/screenshots/tablet-tours.webp"
  },
  {
    "alt": "Landfall tablet journal",
    "device": "tablet",
    "width": 824,
    "height": 1166,
    "src": "/templates/landfall/screenshots/tablet-journal.webp"
  },
  {
    "alt": "Landfall tablet contact",
    "device": "tablet",
    "width": 824,
    "height": 1166,
    "src": "/templates/landfall/screenshots/tablet-contact.webp"
  },
  {
    "alt": "Landfall mobile home",
    "device": "mobile",
    "width": 380,
    "height": 822,
    "src": "/templates/landfall/screenshots/mobile-home.webp"
  },
  {
    "alt": "Landfall mobile tours",
    "device": "mobile",
    "width": 380,
    "height": 822,
    "src": "/templates/landfall/screenshots/mobile-tours.webp"
  },
  {
    "alt": "Landfall mobile journal",
    "device": "mobile",
    "width": 380,
    "height": 822,
    "src": "/templates/landfall/screenshots/mobile-journal.webp"
  },
  {
    "alt": "Landfall mobile contact",
    "device": "mobile",
    "width": 380,
    "height": 822,
    "src": "/templates/landfall/screenshots/mobile-contact.webp"
  }
]
},surfaces:[{id:'site',name:'旅行品牌官网',platform:'pc',locales:['zh','en'],pages:[{slug:"404",title:"这条路到这里结束了",localizedTitles:{en:"This road ends here."},load:()=>import('./pages/404Page')},
{slug:"about",title:"一家会亲自接听电话的旅行社",localizedTitles:{en:"A tour operator that answers the phone."},load:()=>import('./pages/AboutPage')},
{slug:"booking-conditions",title:"你支付什么，以及能退回什么",localizedTitles:{en:"What you pay, and what comes back."},load:()=>import('./pages/BookingConditionsPage')},
{slug:"careers",title:"在旅程开始的地方工作",localizedTitles:{en:"Work where the paths start."},load:()=>import('./pages/CareersPage')},
{slug:"contact",title:"写信给我们，我们会认真回复",localizedTitles:{en:"Write to us. We write back."},load:()=>import('./pages/ContactPage')},
{slug:"cookies",title:"几乎不保存任何内容",localizedTitles:{en:"Almost nothing is stored."},load:()=>import('./pages/CookiesPage')},
{slug:"destinations",title:"我们亲自走过的地方",localizedTitles:{en:"Places we have walked ourselves."},load:()=>import('./pages/DestinationsPage')},
{slug:"destination/california",title:"加利福尼亚",localizedTitles:{en:"California"},load:()=>import('./pages/DestinationCaliforniaPage')},
{slug:"destination/greece",title:"希腊",localizedTitles:{en:"Greece"},load:()=>import('./pages/DestinationGreecePage')},
{slug:"destination/indonesia",title:"印度尼西亚",localizedTitles:{en:"Indonesia"},load:()=>import('./pages/DestinationIndonesiaPage')},
{slug:"destination/italy",title:"意大利",localizedTitles:{en:"Italy"},load:()=>import('./pages/DestinationItalyPage')},
{slug:"destination/maldives",title:"马尔代夫",localizedTitles:{en:"Maldives"},load:()=>import('./pages/DestinationMaldivesPage')},
{slug:"destination/scotland",title:"苏格兰",localizedTitles:{en:"Scotland"},load:()=>import('./pages/DestinationScotlandPage')},
{slug:"faq",title:"每次出发前都会问到的问题",localizedTitles:{en:"Asked before every trip."},load:()=>import('./pages/FaqPage')},
{slug:"guides",title:"与你同行的那些人",localizedTitles:{en:"The people who lead you."},load:()=>import('./pages/GuidesPage')},
{slug:"guide/calum-macrae",title:"卡勒姆·麦克雷",localizedTitles:{en:"Calum MacRae"},load:()=>import('./pages/GuideCalumMacraePage')},
{slug:"guide/eleni-vardaki",title:"埃莱妮·瓦尔达基",localizedTitles:{en:"Eleni Vardaki"},load:()=>import('./pages/GuideEleniVardakiPage')},
{slug:"guide/marco-de-luca",title:"马尔科·德卢卡",localizedTitles:{en:"Marco De Luca"},load:()=>import('./pages/GuideMarcoDeLucaPage')},
{slug:"guide/sari-wulandari",title:"萨丽·乌兰达里",localizedTitles:{en:"Sari Wulandari"},load:()=>import('./pages/GuideSariWulandariPage')},
{slug:"guide/tomas-reyes",title:"托马斯·雷耶斯",localizedTitles:{en:"Tomás Reyes"},load:()=>import('./pages/GuideTomasReyesPage')},
{slug:"",title:"六天时光，一片旷野海岸",localizedTitles:{en:"Six days. One wild coast."},load:()=>import('./pages/HomePage')},
{slug:"how-it-works",title:"从第一个问题，到旅途的第一个清晨",localizedTitles:{en:"From a first question to the first morning."},load:()=>import('./pages/HowItWorksPage')},
{slug:"journal",title:"来自旅途现场的笔记",localizedTitles:{en:"Notes from the field."},load:()=>import('./pages/JournalPage')},
{slug:"journal/the-table-at-the-end-of-the-path",title:"步道尽头的那张餐桌",localizedTitles:{en:"The table at the end of the path"},load:()=>import('./pages/JournalTheTableAtTheEndOfThePathPage')},
{slug:"journal/what-a-bothy-night-is-like",title:"在石屋过夜，究竟是什么体验",localizedTitles:{en:"What a night in a bothy is actually like"},load:()=>import('./pages/JournalWhatABothyNightIsLikePage')},
{slug:"journal/what-to-pack-for-a-walking-week",title:"一周徒步应该带什么",localizedTitles:{en:"What to pack for a walking week"},load:()=>import('./pages/JournalWhatToPackForAWalkingWeekPage')},
{slug:"journal/when-to-go-where",title:"何时去哪里：我们的逐月旅行日历",localizedTitles:{en:"When to go where: our calendar, month by month"},load:()=>import('./pages/JournalWhenToGoWherePage')},
{slug:"journal/why-we-stop-at-twelve",title:"为什么我们把人数定在十二位",localizedTitles:{en:"Why we stop at twelve travellers"},load:()=>import('./pages/JournalWhyWeStopAtTwelvePage')},
{slug:"journal/your-first-week-under-sail",title:"第一次在帆船上度过一周",localizedTitles:{en:"Your first week on a sailing boat"},load:()=>import('./pages/JournalYourFirstWeekUnderSailPage')},
{slug:"plan-a-trip",title:"告诉我们想去哪里，余下的交给我们",localizedTitles:{en:"Tell us where. We do the rest."},load:()=>import('./pages/PlanATripPage')},
{slug:"privacy",title:"我们保存什么，为什么保存",localizedTitles:{en:"What we keep, and why."},load:()=>import('./pages/PrivacyPage')},
{slug:"private-trips",title:"熟悉的向导，专属于你们的旅行",localizedTitles:{en:"The same guides, a trip that is yours."},load:()=>import('./pages/PrivateTripsPage')},
{slug:"reviews",title:"用他们的话，讲述那段旅行",localizedTitles:{en:"What it was like, in their words."},load:()=>import('./pages/ReviewsPage')},
{slug:"sustainability",title:"小规模团队，以及留下的影响",localizedTitles:{en:"Small groups, and what they leave."},load:()=>import('./pages/SustainabilityPage')},
{slug:"terms",title:"用清楚的话，说明条款",localizedTitles:{en:"The terms, in plain words."},load:()=>import('./pages/TermsPage')},
{slug:"thanks",title:"谢谢你，我们已收到",localizedTitles:{en:"Thank you. We have it."},load:()=>import('./pages/ThanksPage')},
{slug:"tours",title:"我们运营的每一条路线",localizedTitles:{en:"Every tour we run."},load:()=>import('./pages/ToursPage')},
{slug:"tour/aegean-coast-path",title:"爱琴海岸步道",localizedTitles:{en:"The Aegean coast path"},load:()=>import('./pages/TourAegeanCoastPathPage')},
{slug:"tour/baa-atoll-sandbank",title:"芭环礁的沙洲",localizedTitles:{en:"Sandbanks of Baa Atoll"},load:()=>import('./pages/TourBaaAtollSandbankPage')},
{slug:"tour/big-sur-coast-road",title:"大苏尔海岸公路",localizedTitles:{en:"The Big Sur coast road"},load:()=>import('./pages/TourBigSurCoastRoadPage')},
{slug:"tour/cairngorms-winter-bothies",title:"凯恩戈姆冬日石屋之旅",localizedTitles:{en:"Winter bothies of the Cairngorms"},load:()=>import('./pages/TourCairngormsWinterBothiesPage')},
{slug:"tour/cyclades-by-sailboat",title:"帆游基克拉泽斯群岛",localizedTitles:{en:"The Cyclades by sailboat"},load:()=>import('./pages/TourCycladesBySailboatPage')},
{slug:"tour/dolomites-lakes-and-passes",title:"多洛米蒂的湖泊与山口",localizedTitles:{en:"Lakes and passes of the Dolomites"},load:()=>import('./pages/TourDolomitesLakesAndPassesPage')},
{slug:"tour/hebrides-sea-lochs",title:"赫布里底群岛海湾",localizedTitles:{en:"Sea lochs of the Hebrides"},load:()=>import('./pages/TourHebridesSeaLochsPage')},
{slug:"tour/highland-coast-on-foot",title:"徒步高地海岸",localizedTitles:{en:"The Highland coast on foot"},load:()=>import('./pages/TourHighlandCoastOnFootPage')},
{slug:"tour/raja-ampat-reef-week",title:"拉贾安帕珊瑚礁一周",localizedTitles:{en:"A reef week in Raja Ampat"},load:()=>import('./pages/TourRajaAmpatReefWeekPage')}]}]}
