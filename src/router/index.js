import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  routes:[
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      name:'login',
      component:resolve => require(['../components/login/Login.vue'], resolve),
    },
    {
      path:'/home',
      component:resolve => require(['../components/home/Home.vue'], resolve),
      children:[
        {
          path:'/',
          name:'default',
          redirect:"search",//默认
        },
        {
          path:'/home/analysis',
          name:'analysis',
          component:resolve => require(['../components/tabbar/analysis/Analysis.vue'], resolve),//分析
        },
        {
          path:'/home/query',
          name:'query',
          component:resolve => require(['../components/tabbar/query/Query.vue'], resolve),//查询
        },
        {
          path:'/home/search',
          name:'search',
          component:resolve => require(['../components/tabbar/search/Search.vue'], resolve),//搜索
        },
        {
          path:'/home/statistical',
          name:'statistical',
          component:resolve => require(['../components/tabbar/statistical/Statistical.vue'], resolve),//统计
        },
        {
          path:'/home/repair',
          name:'repair',
          component:resolve => require(['../components/tabbar/repair/Repair.vue'], resolve),//维修
        },
        {
          path:'/home/realtime',
          name:'realtime',
          component:resolve => require(['../components/tabbar/realTime/RealTime.vue'], resolve),//实时
        },
        {
          path:'/home/setting',
          name:'setting',
          component:resolve => require(['../components/tabbar/setting/Setting.vue'], resolve),//用户管理
        },
        {
          path:'/home/library',
          name:'library',
          component:resolve => require(['../components/tabbar/library/Library.vue'], resolve),//图件库
        },
        {
          path:'/home/patrol',
          name:'patrol',
          component:resolve => require(['../components/tabbar/patrol/Patrol.vue'], resolve),//巡查
        }
      ]
    }
  ]
})
