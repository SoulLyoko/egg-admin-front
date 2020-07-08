<template>
  <el-checkbox-group v-bind="$attrs" v-on="$listeners">
    <el-checkbox
      v-bind="$attrs"
      v-on="$listeners"
      :label="item.value"
      v-for="item in options"
      :key="item.value"
      >{{ item.label }}</el-checkbox
    >
  </el-checkbox-group>
</template>

<script>
export default {
  name: "dict-radio",
  data() {
    return {};
  }
};
</script>

<style lang="" scoped></style>
