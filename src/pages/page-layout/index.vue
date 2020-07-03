<template>
  <el-container class="container">
    <el-aside class="aside" :class="{'is-collapse':isCollapse}">
      <asideLogo></asideLogo>
      <asideMenu></asideMenu>
    </el-aside>
    <el-container class="header-main">
      <el-header class="header">
        <headerMenu></headerMenu>
        <headerTabs></headerTabs>
      </el-header>
      <el-main class="main">
        <div class="main-view">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import asideLogo from "./components/aside-logo";
import headerMenu from "./components/header-menu";
import asideMenu from "./components/aside-menu";
import headerTabs from "./components/header-tabs";
import { mapGetters } from "vuex";

export default {
  name: "page-layout",
  components: { asideLogo, headerMenu, asideMenu, headerTabs },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isCollapse"])
  }
};
</script>

<style lang="scss" >
@import "./index";
</style>