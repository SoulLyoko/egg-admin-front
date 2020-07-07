<template>
  <el-scrollbar class="basic-container">
    <el-card class="basic-container-card">
      <slot></slot>
    </el-card>
  </el-scrollbar>
</template>

<script>
/**
 * 基础容器
 */
export default {
  name: "basic-container",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.basic-container {
  height: 100%;
  .el-scrollbar__view {
    height: 100%;
  }
  .basic-container-card {
    height: 100%;
    .el-card__body {
      height: calc(100% - 30px);
    }
  }
}
</style>
