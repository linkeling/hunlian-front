<template>
    <div class="login_container">
        <div class="login_box">
            <div class="system_name">云南省免费提供避孕药具服务平台</div>
            <div class="login_context">
                <div class="left_img">
                    <img src="../../static/images/login_logo.png" alt="">
                </div>
                <a-form-model :model="formData" :rules="formRules" class="login_form" ref="formRef">
                    <a-form-model-item prop="username">
                        <a-input placeholder="请输入用户名" v-model="formData.username" size="large">
                            <a-icon slot="prefix" type="user"/>
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item prop="password">
                        <a-input-password placeholder="请输入密码" v-model="formData.password" size="large">
                            <a-icon slot="prefix" type="lock"/>
                        </a-input-password>
                    </a-form-model-item>
                    <a-button @click="login" type="primary" block size="large">登录</a-button>
                </a-form-model>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                formData: {},
                formRules: {},
            }
        },
        created() {
        },
        methods: {
            login() {
                const {username, password} = this.formData
                let params = {
                    userName: username || 'admin',
                    password: password || '123456'
                }
                this.$api.common.login(params).then(({code, data}) => {
                    if (code === 'SUCCESS') {
                        this.$message.success('登录成功！');
                        window.sessionStorage.setItem('token', data.token);
                        window.sessionStorage.setItem('menuList', JSON.stringify(data.menuList));
                        window.sessionStorage.setItem('userInfo', JSON.stringify(data.userInfo));
                        window.sessionStorage.setItem('networkInfo', JSON.stringify(data.networkInfo));
                        this.$router.push('/Home/index');
                    } else {
                        this.$message.error('登录失败！');
                    }
                })
            },
        },
    }
</script>
<style lang="less" scoped>
    .login_container {
        background-image: url("../../static/images/loginBg.jpg");
        background-size: 100% 100%;
        height: 100%;

        .login_box {
            width: 950px;
            height: 510px;
            border-radius: 2.5rem;
            box-shadow: 1px 1px 20px #043B26;
            background-color: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            .system_name {
                font-size: 24px;
                text-align: center;
                height: 90px;
                line-height: 100px;
                color: #497FF7;
            }

            .login_form {
                width: 340px;
            }
        }

        .login_context {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 400px;
            padding: 0 80px;
        }
    }
</style>
