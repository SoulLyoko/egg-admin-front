<template>
  <div class="header-theme">
    <i class="el-icon-brush"></i>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "header-theme",
  data() {
    return {
      themeList: [
        { class: "default", name: "默认" },
        { class: "classic", name: "经典" }
      ]
    };
  },
  computed: {
    ...mapGetters(["themeName"])
  },
  created() {
    this.SET_THEME_NAME(this.themeName);
  },
  methods: {
    ...mapMutations(["SET_THEME_NAME"])
  }
};
</script>

<style lang="" scoped>
</style>