const navConf = require("./config/nav/index");
const sidebarConf = require("./config/sidebar/index");
module.exports = {
  title: "Will-Blog",
  description: "记录学习过程",
  theme: "reco",
  evergreen: true,
  locales: { "/": { lang: "zh-CN" } },
  head: [
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  blogConfig: {
    category: {
      location: 2, // 在导航栏菜单中所占的位置，默认2
      text: "Category", // 默认文案 “分类”
    },
    tag: {
      location: 3, // 在导航栏菜单中所占的位置，默认3
      text: "Tag", // 默认文案 “标签”
    },
  },
  themeConfig: {
    codeTheme: "tomorrow", // default 'tomorrow'
    smoothScroll: true,
    type: "blog",
    // 自动隐藏导航
    autoHideNavbar: true,
    // 主题颜色选择
    themePicker: true,
    // 搜索设置
    search: true,
    // 搜索显示条目数量
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    sidebar: "auto",
    // 侧边导航层级
    sidebarDepth: 2,
    // 最后更新时间
    lastUpdated: "上次更新",
    // 作者
    author: "Will",
    // 项目开始时间，只填写年份
    startYear: "2019",
    // 备案号
    record: "暂无",
    nav: navConf,
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "分类", // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: "标签", // 默认 “标签”
      },
    },
  },
};
