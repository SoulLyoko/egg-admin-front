<template>
  <el-scrollbar class="basic-container">
    <el-card class="basic-container-card">
      <slot></slot>
    </el-card>
  </el-scrollbar>
</template>

<script>
export default {
  name: "basic-container",
  data() {
    return {};
  }
};
</script>

<style lang="scss" >
.basic-container {
  height: 100%;
  .el-scrollbar__wrap {
    overflow-x: auto;
  }
  .el-scrollbar__view {
    height: calc(100% - 2px);
  }
  .basic-container-card {
    height: 100%;
    .el-card__body {
      height: calc(100% - 30px);
    }
  }
}
</style>