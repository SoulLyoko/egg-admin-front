<template>
  <div class="header-fullscreen" @click="toggleFullscreen">
    <el-tooltip effect="dark" content="全屏" placement="bottom">
      <i class="el-icon-full-screen"></i>
    </el-tooltip>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "header-fullscreen",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["toggleFullscreen"])
  }
};
</script>

<style lang="" scoped></style>
