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
                    title: '同步管理'
                },{
                    index: '2',
                    title: '任务概览'
                },{
                    index: '3',
                    title: '查询修改'
                }];
import AsideNav from './aside-nav.vue';
    export default {
        data() {
            return {
                env: 'offline',
                userInfo: {},
                navList: [],
                defaultActive: {},
                breadcrumb: [],
            }
        },
        created() {
            this.fetchNavList();
        },
        methods: {
            // 这里同步取得导航列表，之后需要异步再更新
            fetchNavList() {
                this.navList = navList;
                this.defaultActive = this.navList[0];
                this.breadcrumb.push(this.navList[0]);
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
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });          
                });
            },
            navChange(key, keyPath) {
                let active = this.navList.filter(i => i.index === key);
                this.breadcrumb = active;
                this.defaultActive = active[0];
            }
        },
        watch: {
            env: {
                handler(val) {
                    if(!val) return;
                    this.$store.commit('updateEnv', val);
                },
                immediate: true
            }
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