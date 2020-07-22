<template>
  <div class="header-user">
    <el-dropdown>
      <span class="user-username">{{ userInfo.username || "未知用户" }}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="open">
          <i class="el-icon-lock"></i>修改密码
        </el-dropdown-item>
        <el-dropdown-item @click.native="handleLogout">
          <i class="el-icon-switch-button"></i>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <center slot="footer">
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" @click="handleSubmit"
          >确定</el-button
        >
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
    return {
      dialogVisible: false,
      form: {
        password: "",
        oldPassword: ""
      },
      rules: {
        oldPassword: [{ required: true, message: "请输入旧密码" }],
        password: [
          { required: true, message: "请输入新密码" },
          { min: 4, message: "长度不小于4个字符" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["logout"]),
    async open() {
      this.dialogVisible = true;
      await this.$nextTick();
      this.$refs.form.resetFields();
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
        if (valid) {
          resetPassword(this.form).then(res => {
            this.$message.success("密码修改成功,请重新登录");
            this.logout();
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="" scoped></style>
