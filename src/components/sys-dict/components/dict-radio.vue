<template>
  <el-radio-group v-bind="$attrs" v-on="$listeners">
    <el-radio
      v-bind="$attrs"
      v-on="$listeners"
      :label="item.value"
      v-for="item in options"
      :key="item.value"
      >{{ item.label }}</el-radio
    >
  </el-radio-group>
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
