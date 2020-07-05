<template>
  <el-container class="container">
    <el-aside class="aside" :class="{ 'is-collapse': isCollapse }">
      <asideLogo></asideLogo>
      <asideMenu></asideMenu>
    </el-aside>
    <el-container class="header-main">
      <el-header class="header">
        <i class="header-folder el-icon-s-fold" @click="changeCollapse"></i>
        <headerMenu></headerMenu>
        <div class="header-right">
          <headerUser></headerUser>
        </div>
      </el-header>
      <el-main class="main">
        <mainTabs></mainTabs>
        <div class="main-view">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import asideLogo from "./components/aside-logo";
import asideMenu from "./components/aside-menu";
import headerMenu from "./components/header-menu";
import mainTabs from "./components/main-tabs";
import headerUser from "./components/header-user";
import { mapGetters } from "vuex";

export default {
  name: "page-layout",
  components: { asideLogo, asideMenu, headerMenu, mainTabs, headerUser },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  methods: {
    changeCollapse() {
      this.$store.commit("CHANGE_COLLAPSE");
    }
  }
};
</script>

<style lang="scss">
@import "./index";
</style>
