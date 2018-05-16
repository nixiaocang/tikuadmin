<template lang="pug">
    .sync-manage-wrapper
        el-tabs(type="border-card" :value="currTab" @tab-click="handleTabClick")
            el-tab-pane(name="table")
                span(slot="label")
                    i.el-icon-date
                    | 表同步
                el-form(label-width="200px" ref="form" :model="param" :rules="rules")
                    el-form-item(label="同步类型")
                        el-radio(v-model="param.ptype" :label="7") 单表同步
                        el-radio(v-model="param.ptype" :label="8") 全表同步
                    el-form-item(label="请选择要同步的数据库")
                        el-select(v-model="synced_db"  :disabled="true")
                            el-option(v-for="item of syncedDbList" :label="item.label" :value="item.val")
                    el-form-item(label="请选择目标数据库" prop="destination")
                        el-select(v-model="param.destination")
                            el-option(v-for="item of targetDbList" :label="item" :value="item")
                    el-form-item(label="请选择工作表" prop="table" v-if="param.ptype==7")
                        el-select(v-model="param.table")
                            el-option(v-for="item of dbList" :label="item" :value="item")
                    el-form-item(label="请输入天数" prop="day")
                        el-input-number(v-model="param.day" :min="1" @change="handleChange")
                    el-button(type="primary" @click="handleConfirm" plain) 确定
            el-tab-pane(name="query")
                span(slot="label")
                    i.el-icon-search
                    | 查询同步
                | 暂未上线，敬请期待！

</template>
<script>
    const param = {
        env: '',
        ptype: 7,
        destination: '',
        table: '',
        creator: '',
        day: 1
    };
    export default {
        data() {
            return {
                dbList: [],
                currTab: 'table',
                synced_db: 'knowboxstore_tiku_only',
                syncedDbList: [{
                    label: 'knowboxstore_tiku_only', 
                    val: 'knowboxstore_tiku_only'
                }],
                targetDbList: ['qa', 'api', 'teacher', 'local'],
                rules: {
                    destination: [{
                        required: true, message: '请选择目标数据库', trigger: 'change'
                    }],
                    table: [{
                        required: true, message: '请选择工作表', trigger: 'change'
                    }],
                    day: [{
                        required: true, message: '请输入天数', trigger: 'blur'
                    }]
                },
                param
            }
        },
        created() {
            this.fetchDbList();
        },
        computed: {
            env() {
                let env = this.$store.getters.getEnv;
                this.param.env = env;
                return env;
            },
            // userInfo() {
            //     let info = this.$store.getters.getUserInfo;
            //     this.param.creator = info.username;
            //     return info;
            // }
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
            },
            handleTabClick(tab) {
                this.currTab = tab.name;
            },
            handleConfirm() {
                this.$refs.form.validate((valid) => {
                    if(!valid) return false;
                    this.submit();
                })
            },
            submit() {
                this.param.creator = this.$cookie.get('username');
                this.$http.post('/api/sync/operate', this.param).then(res => {
                    let data = res.body;
                    if(data.status) return this.$message.error(data.errstr)
                    this.$message({
                        message: '更新成功！',
                        type: 'success',
                        center: true
                    });
                })
            },
            handleChange(value) {
                
            }
        },
        watch: {
            env() {
                this.fetchDbList();
                this.$refs.form.resetFields();
            }
        }
    }
</script>
<style lang="scss">
    .sync-manage-wrapper {
        margin-top: 20px;
        width: 100%;
        .el-form {
            width: 500px;
        }
        .el-select, .el-input-number {
            width: 100%;
        }
        .el-button {
            width: 100px;
        }
    }
</style>