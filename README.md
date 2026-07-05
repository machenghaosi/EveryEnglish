# EveryEnglish

一个面向日常英语输出训练的静态网站。

## 部署方式

这个项目只有 `index.html`、`styles.css`、`app.js`，不依赖后端服务，适合部署到 GitHub Pages、Netlify 或 Vercel。

推荐设置：

- Build command: 留空
- Publish directory: 项目根目录
- Entry file: `index.html`

## 稳定性

当前版本是纯静态网站，没有数据库、服务器进程或后台任务。只要托管平台可访问，页面本身不会因为运行时间变长而崩溃。

用户的学习进度保存在浏览器 `localStorage` 中，所以不同设备之间不会自动同步。
