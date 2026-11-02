# 架构

前端使用Next.js App Router、React、严格TypeScript与既有Framer Motion，不含服务端业务或占位后端。

核心位于 src/features/site-templates/catalog/landfall：config/brand.ts集中品牌，config/forms.ts集中演示规则；content/collections.json 保存行程、向导、目的地、评价和文章；content/pages.json保存完整辅助页正文，content/zh.json提供逐段中文。

components/负责导航、路由遮幕、路线、轮播、表单、目录、FAQ和通用揭示；views/负责各页面族组合；pages/是46个清晰路由入口；meta.ts仅定义可导入的市场和页面元数据。src/app/[[...slug]]/page.tsx解析语言与页面，未知路径真实返回404。

所有运行素材位于public/templates/landfall；.tpl/assets只保存真实市场截图。tokens.css管理配色、字号、圆角、留白和滚动条，theme.css实现响应式与交互。

通用包只导出template和host。host.tsx的上下文允许消费方注入品牌、Logo、额外页脚与平台入口，通用实现不依赖消费工程。生产应固定包版本和摘要，禁止把本机绝对路径作为运行依赖。
