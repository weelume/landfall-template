# Landfall 小团旅行模板

完整双语旅行运营商网站：46个业务及状态页、9条行程、65个逐日站点、6个目的地、5位向导和6篇日志。支持PC、平板与手机，同一响应式端使用中文根路径与 /en 英文路径。

## 环境与运行

Node 24.16.0（.nvmrc），pnpm 12.10.1（package.json）。进入仓库根目录执行 corepack pnpm install --frozen-lockfile，再执行 corepack pnpm dev，默认 http://localhost:43318。通过PORT调整本机端口；Ctrl+C停止本次服务。生产先 corepack pnpm build，再 corepack pnpm start。无数据库、账号、后台或环境秘密；.env.example只作无秘密示例。

## 验证

执行 corepack pnpm typecheck、corepack pnpm lint、corepack pnpm test、corepack pnpm build；node .tpl/tools/check.mjs . 校验协议。正式可运行快照在干净提交后执行 corepack pnpm bundle。依赖锁只能由包管理器维护。

## 修改

先读 .tpl/docs/ARCHITECTURE.md 与 .tpl/docs/CUSTOMIZATION.md。品牌、主题、文案、通用组件、页面组合、路由各有独立入口。源码保持strict；不要把表单演示改成静默发送，真实服务必须明确设计。

## 限制与许可

表单只进行浏览器内校验，不发送、不保存；行程、评价、价格、岗位和政策均为演示。参考为 https://impartial-goal-555890.framer.app/，实现源码独立编写；照片及原站内容的商业许可未确认，不能将公开可访问等同于允许再分发。详见 .tpl/docs/LICENSE.md、ASSETS.md 与 asset-sources.json。当前listed=false，不代表市场已公开上架。
