<template>
  <div class="aside-logo">
    <span v-if="!isCollapse">Egg Admin</span>
    <span v-else>Egg</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "aside-logo",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isCollapse"])
  }
};
</script>

<style lang="" scoped></style>
