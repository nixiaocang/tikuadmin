<template lang="pug">
    el-container.main-wrapper
        el-header
            h3 题库同步管理系统
            .operate-layer
                el-select(v-model="env")
                    el-option(label="线上环境" value="online")
                    el-option(label="线下环境" value="offline")
                el-dropdown(@command="handleCommand")
                    span.el-dropdown-link
                        | {{ userInfo.username || '当前用户' }}
                        i.el-icon-arrow-down.el-icon--right
                    el-dropdown-menu(slot="dropdown")
                        el-dropdown-item(command="set") 设置
                        el-dropdown-item(command="person") 个人资料
                        el-dropdown-item(command="logout" divided) 退出
        el-container
            el-aside: aside-nav(@nav:change="(key, keyPath) => navChange(key, keyPath)" :default-active="defaultActive" :nav-list="navList")
            el-container
                el-main
                    el-breadcrumb(separator-class="el-icon-arrow-right")
                        el-breadcrumb-item(:to="{ path: '/' }") 首页
                        el-breadcrumb-item(v-for="item of breadcrumb" :key="item.index" @click="navChange(item.index)") {{ item.title }}
                    el-container
                        router-view
                el-footer
</template>
<script>
const navList = [{
                    index: '1',
                    title: '同步管理',
                    path: '/main/sync_manage'
                },{
                    index: '2',
                    title: '任务概览',
                    path: '/main/task_overview'
                },{
                    index: '3',
                    title: '查询修改',
                    path: '/main/query_update'
                }];
import AsideNav from './aside-nav.vue';
    export default {
        data() {
            return {
                navList: [],
                // defaultActive: {},
                breadcrumb: [],
            }
        },
        created() {
            this.fetchNavList();
        },
        computed: {
            env: {
                get() {
                    return this.$store.getters.getEnv;
                },
                set(val) {
                    this.confirmChangeEnv(val);
                }
            },
            defaultActive() {
                let path = this.$route.path;
                let active = this.navList.filter(i => i.path == path);
                this.breadcrumb = active;
                return active[0];
            },
            userInfo() {
                let info = {};
                info.username = this.$cookie.get('username');
                return info;
                // return this.$store.getters.getUserInfo;
            }
        },
        methods: {
            // 这里同步取得导航列表，之后需要异步再更新
            fetchNavList() {
                this.navList = navList;
            },
            handleCommand(command) {
                if(command == 'logout') return this.logout();
                this.$router.push({'path': `/user/${command}`});
            },
            logout() {
                this.$confirm('此操作将退出登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                    location.href = '/login';
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });          
                });
            },
            navChange(key, keyPath) {
                let active = this.navList.filter(i => i.index === key);
                this.$router.push({path: active[0].path});
            },
            confirmChangeEnv(val) {
                this.$confirm(`此操作将系统环境切换为${val == 'offline' ? '线下' : '线上'}, 将会丢失未保存的表单,请确认是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.commit('updateEnv', val);
                }).catch(() => {
                             
                });
            }
        },
        watch: {
            
        },
        components: {
            'aside-nav': AsideNav,
        }
    }
</script>
<style lang="scss">
    .main-wrapper {
        .el-header {
            h3 {
                margin: 0;
                line-height: 60px;
                float: left;
            }
            .operate-layer {
                float: right;
                line-height: 60px;
                .el-select {
                    margin-right: 10px;
                }
            }
        }
    }
</style>