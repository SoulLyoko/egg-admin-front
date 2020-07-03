<template>
  <div class="header-menu">
    <i class="header-folder el-icon-s-fold" @click="changeCollapse"></i>
    <el-menu mode="horizontal">
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
    ...mapGetters(["headerMenu"])
  },
  methods: {
    changeCollapse() {
      this.$store.commit("CHANGE_COLLAPSE");
    }
  }
};
</script>