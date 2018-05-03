import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/main'},
    {path: '/main', component: resolve => require(['@/components/main.vue'], resolve),},
    {path: '/teachingManagement', component: resolve => require(['@/components/teachManage/teachingManagement.vue'], resolve),},
    {path: '/teachingItem', component: resolve => require(['@/components/teachManage/teachingItem.vue'], resolve),},
    {path: '/addteachItem', component: resolve => require(['@/components/teachManage/addteachItem.vue'], resolve),},
    {path: '/students', component: resolve => require(['@/components/teachManage/students.vue'], resolve),},
    {path: '/selectStu', component: resolve => require(['@/components/teachManage/selectStu.vue'], resolve),},
    {path: '/replayItem', component: resolve => require(['@/components/replay/replayItem.vue'], resolve),},
    {path: '/replayItemAnswer', component: resolve => require(['@/components/replay/replayItemAnswer.vue'], resolve),},
    {path: '/replayManagement', component: resolve => require(['@/components/replay/replayManagement.vue'], resolve),},
    {path: '/community', component: resolve => require(['@/components/community/community.vue'], resolve),},
    {path: '/peerDynamics', component: resolve => require(['@/components/community/peerDynamics.vue'], resolve),},
    {path: '/addDynamics', component: resolve => require(['@/components/community/addDynamics.vue'], resolve),},
  ]
})
