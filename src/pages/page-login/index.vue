<template>
  <div class="login-page">
    <div class="login-form">
      <center>
        <h1>
          <img class="login-logo" src="@/assets/logo.png" />
          <span>Egg Admin</span>
        </h1>
        <div>用户登录</div>
      </center>
      <br />
      <el-form :model="form" ref="form" :rules="rules" @submit.native.prevent>
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input v-model="form.captcha" prefix-icon="el-icon-picture-outline-round" placeholder="验证码">
            <template slot="append">
              <div class="login-captcha" v-html="captcha" @click="refreshCaptcha"></div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="primary" native-type="submit" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCaptcha } from "@/api/sys/account.js";

export default {
  name: "page-login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        captcha: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
        captcha: [{ required: true, message: "请输入验证码" }]
      },
      captcha: ""
    };
  },
  created() {
    this.refreshCaptcha();
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("login", this.form)
            .then(() => {
              this.$router.push(this.$route.query.redirect || "/");
            })
            .catch(() => {
              this.refreshCaptcha();
            });
        }
      });
    },
    refreshCaptcha() {
      this.form.captcha = "";
      getCaptcha().then(res => {
        this.captcha = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background: url("./img/background.svg") no-repeat fixed center;
  background-size: 100%;
  .login-form {
    width: 300px;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -80%);
    .login-logo {
      height: 40px;
      vertical-align: bottom;
    }
    .login-captcha {
      height: 40px - 2px;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
      cursor: pointer;
    }
  }
  .login-button {
    width: 100%;
  }
}
</style>
