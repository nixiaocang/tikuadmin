<template lang="pug">
    .sync-manage-wrapper
        el-tabs(type="border-card")
            el-tab-pane
                span(slot="label")
                    i.el-icon-date
                    | 单表同步
                el-form
                    el-form-item(label="请选择要同步的数据库")
                        el-select(v-model="synced_db"  :disabled="true")
                            el-option(v-for="item of syncedDbList" :label="item.label" :value="item.val")
                    el-form-item(label="请选择工作表")
                        el-select(v-model="tb")
                            el-option(v-for="item of dbList" :label="item" :value="item")
            el-tab-pane(label="全表同步")
            el-tab-pane(label="查询同步")

</template>
<script>
    export default {
        data() {
            return {
                dbList: [],
                tb: '',
                synced_db: 'knowboxstore_tiku_only',
                syncedDbList: [{
                    label: 'knowboxstore_tiku_only', 
                    val: 'knowboxstore_tiku_only'
                }],
            }
        },
        created() {
            this.fetchDbList();
        },
        computed: {
            env() {
                return this.$store.getters.getEnv;
            },
            userInfo() {
                return this.$store.getters.getUserInfo;
            }
        },
        methods: {
            fetchDbList() {
                this.$http.get('/api/sync/tblist', {
                    params: {
                        env: this.env
                    }
                }).then(res => {
                    let data = res.body;
                    if(data.status) return this.$message.error(data.errstr);
                    this.dbList = data.result;
                })
            }
        }
    }
</script>
<style lang="scss">
    .sync-manage-wrapper {
        margin-top: 20px;
    }
</style>