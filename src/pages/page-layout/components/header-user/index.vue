<template>
  <div class="header-user">
    <el-dropdown>
      <span class="user-username">{{ userInfo.username || "未知用户" }}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="open"><i class="el-icon-lock"></i>修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="handleLogout">
          <i class="el-icon-switch-button"></i>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" append-to-body>
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入新密码"></el-input>
          <el-progress
            :percentage="strengthPercentage"
            :format="strengthFormat"
            :status="strengthStatus"
            text-inside
            :stroke-width="14"
          ></el-progress>
        </el-form-item>
      </el-form>
      <center slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </center>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { resetPassword } from "@/api/sys/account.js";

export default {
  name: "header-user",
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error("两次输入的新密码不一致"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      form: {
        newPassword: "",
        oldPassword: "",
        confirmPassword: ""
      },
      rules: {
        oldPassword: [{ required: true, message: "请输入旧密码" }],
        newPassword: [
          { required: true, message: "请输入新密码" },
          { min: 6, message: "长度不小于6个字符" }
        ],
        confirmPassword: [
          { required: true, message: "请输入新密码" },
          { min: 6, message: "长度不小于6个字符" },
          { validator: validateConfirmPassword, trigger: "blur" }
        ]
      },
      strengthMap: {
        0: { text: "", status: undefined },
        20: { text: "很弱", status: "exception" },
        40: { text: "弱", status: "warning" },
        60: { text: "中", status: "success" },
        80: { text: "强", status: undefined },
        100: { text: "很强", status: undefined }
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    strengthPercentage() {
      // 评级制判断密码强度 最高5
      let percentage = 0;
      const v = this.form.newPass;
      if (/\d/.test(v)) {
        percentage += 20; //数字
      }
      if (/[a-z]/.test(v)) {
        percentage += 20; //小写
      }
      if (/[A-Z]/.test(v)) {
        percentage += 20; //大写
      }
      if (/\W/.test(v)) {
        percentage += 20; //特殊字符
      }
      if (v.length >= 10) {
        percentage += 20;
      }
      // eslint-disable-next-line
      this.form.strength = this.strengthMap[percentage].text;
      return percentage;
    },
    strengthStatus() {
      return this.strengthMap[this.strengthPercentage].status;
    }
  },
  methods: {
    ...mapActions(["logout"]),
    async open() {
      this.dialogVisible = true;
      await this.$nextTick();
      this.$refs.form.resetFields();
    },
    strengthFormat(percentage) {
      return this.strengthMap[percentage].text;
    },
    handleLogout() {
      this.$confirm("确定要退出登录吗", "提示", {
        type: "warning"
      }).then(() => {
        this.logout();
      });
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return;
        }
        resetPassword(this.form).then(() => {
          this.$message.success("密码修改成功,请重新登录");
          this.logout();
        });
      });
    }
  }
};
</script>

<style lang="" scoped></style>
