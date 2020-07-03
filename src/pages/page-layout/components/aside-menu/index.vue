<template>
  <div class="aside-menu">
    <el-menu :collapse="isCollapse" background-color="#333" text-color="#fff">
      <template v-for="menu in asideMenu">
        <menuSub :menu="menu" :key="menu._id" v-if="menu.children&&menu.children.length"></menuSub>
        <menuItem :menu="menu" :key="menu._id" v-else></menuItem>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import menuSub from "../menu-sub";
import menuItem from "../menu-item";

export default {
  name: "aside-menu",
  components: { menuSub, menuItem },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["asideMenu", "isCollapse"])
  }
};
</script>

<style lang="" scoped>
</style>