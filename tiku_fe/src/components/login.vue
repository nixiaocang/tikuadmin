<template lang="pug">
    el-container.login-wrapper
        el-header 题库管理平台
        el-container
        //- el-aside(width="200px")
        el-container
            el-main
                el-form(ref="form" :rules="rules" :model="form" label-width="80px")
                    el-form-item(label="用户名" prop="username")
                        el-input(v-model="form.username")
                    el-form-item(label="密码" prop="password")
                        el-input(v-model="form.password")
                    el-button(type="primary" size="medium" @click="submit()" plain) 登录
            el-footer
</template>

<script>
export default {
  data () {
    return {
        form: {
            username: '',
            password: ''
        },
        rules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ]
        }
    }
},
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                if(!valid) return false;
                this.login();
            });
        },
        login() {
            this.$http.post('api/user/login', this.form).then(res => {
                let data = res.body;
                if(data.status) return;
                this.$router.push({'path': '/main'});
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .login-wrapper {
        .el-form {
            display: inline-block;
            width: 500px;
        }
    }
</style>
