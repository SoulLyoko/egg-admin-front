<template>
  <div class="header-menu">
    <el-menu mode="horizontal">
      <menuItem
        :menu="menu"
        v-for="menu in headerMenu"
        :key="menu._id"
      ></menuItem>
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
  }
};
</script>
