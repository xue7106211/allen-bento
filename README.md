# Allen · Dynamic Bento

薛一飞 Allen 的单页「动态 Bento」自我介绍站：一页里放大小错落的卡片，每张卡片用一小段精致动画讲一件事（设计系统时间轴、Token 分层、Figma 扫描、设计转代码、Lucky、恐怖片、健身遛狗、联系入口）。

无 CMS，全部文案在 `src/data/cards.ts`。

## 技术栈

- Vite
- React 19
- TypeScript
- Tailwind CSS v4（`@tailwindcss/vite`）
- Motion（`motion/react`）

## 本地运行

```bash
npm install
npm run dev
```

## 脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 开发服务器 |
| `npm run typecheck` | TypeScript 检查 |
| `npm run build` | 类型检查 + 生产构建 |
| `npm run preview` | 预览构建产物 |

## 布局与无障碍

- 手机单列，桌面 `md` 起多列 CSS Grid Bento
- 动画在 hover 或滚动进入视口时触发
- `prefers-reduced-motion: reduce` 时关闭 / 降级动画

## 部署

仓库根目录含 `vercel.json`（SPA rewrite）。推送到 Vercel 即可；或任意静态托管 `dist/`。
