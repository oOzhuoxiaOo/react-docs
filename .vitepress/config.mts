import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "react docs",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '深度指南', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '入门',
        items: [
          { text: 'React基本介绍', link: '/docs/guide/start/introduce.md' },
          { text: '开发环境搭建', link: '/docs/guide/start/devEnv.md' },
          { text: 'jsx语法入门', link: '/docs/guide/start/jsx.md' },
        ]
      },
      {
        text: '组件基础'
      },
      {
        text: 'Hooks',
        items: [
          { text: 'useState', link: '/docs/guide/hooks/useState.md' },
          { text: 'useEffect', link: '/docs/guide/hooks/useEffect.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  base: '/react-docs/'
})
