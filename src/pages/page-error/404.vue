<template>
  <div class="page-error-404">
    <h1>404 Page Not Found</h1>
    <el-button @click="$router.go(-1)">返回上一页</el-button>
  </div>
</template>

<script>
export default {
  name: "page-error-404",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.page-error-404 {
  background-color: #333;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    color: #fff;
  }
}
</style>
