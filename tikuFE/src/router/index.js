import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Main from '@/components/main'
import SyncManage from '@/components/sync-manage'
Vue.use(Router)

export default new Router({
  routes: [{
        path: '/login',
        name: 'Login',
        component: Login
    },{
        path: '/main',
        name: 'Main',
        component: Main,
        redirect: '/main/sync_manage',
        children: [{
            path: '/main/sync_manage',
            name: 'SyncManage',
            component: SyncManage
        }]
    }
  ],
  mode: 'history',
  linkActiveClass: 'active'
})
