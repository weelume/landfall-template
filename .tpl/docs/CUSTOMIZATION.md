# 修改指南

- 换品牌：config/brand.ts；消费方使用host.tsx注入；不要在每页重复写名称。
- 改内容：collections.json按slug维护9条行程及65天，tours.guide与days.tour引用必须存在；中英文一并维护zh.json。新文案必须有明确翻译，缺失会显式报错，不静默用英文兜底。
- 改主题：tokens.css集中令牌；theme.css只管理本模板。中文标题28–44px，章节24–36px，正文16px。字体本地托管并保留许可。
- 动效：RouteJourney、Collections、HomeSections、ui.tsx；保持可见性门、悬停/聚焦暂停、减少动态、原生触控和键盘。遮罩必须观察未移出/未裁剪的容器。
- 增删页面：新增pages入口和views组合，同步meta.ts及.tpl/template.json的surfaces.pages。中文默认，英文/en；保留语言切换的query/hash。
- 表单：TripForm只校验，禁止含糊地显示发送成功或把姓名邮箱写入日志。真实发送需要独立需求。
- 素材：只修改public/templates/landfall，并刷新asset-sources.json；截图更新须重新实际拍摄，不能把参考站图片当本地截图。

修改后按影响运行typecheck/lint/test/build和对应页面。不要自动发布、覆盖远端历史或新增依赖。
