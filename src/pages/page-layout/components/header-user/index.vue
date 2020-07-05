<template>
  <div class="header-user">
    <el-dropdown>
      <span class="header-user-username">
        {{ userInfo.username }}
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "header-user",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>

<style lang="" scoped></style>
