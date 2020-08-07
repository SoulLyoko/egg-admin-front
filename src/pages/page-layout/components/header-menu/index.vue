<template>
  <div class="header-menu">
    <el-menu mode="horizontal" :default-active="activeHeader" :style="{ width: menuWidth }">
      <menuItem :menu="menu" v-for="menu in headerMenu" :key="menu._id"></menuItem>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import menuItem from "../menu-item";

export default {
  name: "header-menu",
  components: { menuItem },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["headerMenu", "activeMenu"]),
    activeHeader() {
      return this.activeMenu.matched[0].path;
    },
    menuWidth() {
      return this.headerMenu.length * 120 + "px";
    }
  }
};
</script>
