import bgAnimation from './bgAnimation' // 登录界面背景图动画
import modal from './modal' // 自定义全局模态框
import sinan from './sinan' // 司南排名图
import pyramid from './pyramid' // 金字塔动画
import seamless from './seamless' // 新闻无缝滚动
import dynamicList from './dynamicList' // 动态列表动画
import cakeLinkage from './cakeLinkage' // 柱饼组合联动
import pyramidTrend from './pyramidTrend' // 金字塔趋势

import business from './companySummary/business' // 业务范围
import talent from './companySummary/talent' // 人才队伍
import income from './companySummary/income' // 营业收入
import wordCloud from './companySummary/wordCloud' // 产品热词

import distribution from './companySummary/distribution' // 客户分布
import history from './companySummary/history' // 发展历程

const components = {
  bgAnimation,
  modal,
  sinan,
  seamless,
  pyramid,

  cakeLinkage,

  pyramidTrend,

  dynamicList,

  business,
  talent,
  income,
  wordCloud,
  distribution,
  history

}

const install = (Vue = {}) => {
  if (install.installed) return
  Object.keys(components).forEach(component => {
    Vue.component(components[component].name, components[component])
  })

  install.installed = true
}

install.installed = false

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
  install.installed = true
}

const Vcomp = {
  ...components,
  install
}

export default Vcomp
