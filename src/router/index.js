import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import Main from '@/components/main'
import SyncManage from '@/components/sync-manage'
import TaskOverview from '@/components/task-overview'
import QueryUpdate from '@/components/query-update'

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/',
        redirect: '/login',
        component: Index,
        children: [
        {
            path: '/login',
            component: Login
        }, {
            path: '/main',
            component: Main,
            redirect: '/main/sync_manage',
            children: [
            {
                path: '/main/sync_manage',
                component: SyncManage
            },{
                path: '/main/task_overview',
                component: TaskOverview
            },{
                path: '/main/query_update',
                component: QueryUpdate
            }]
        }]
    }],
    mode: 'history',
    linkActiveClass: 'active'
})
