<template>
  <span>{{ this.selectedLabel }}</span>
</template>

<script>
export default {
  name: "dict-text",
  data() {
    return {};
  },
  computed: {
    selectedLabel() {
      const { value } = this.$attrs;
      const { join } = this.$parent;
      if (value instanceof Array) {
        return (
          this.flatOptions()
            .filter(item => value.some(val => val === item.value))
            .map(item => item.label)
            .join(join || ",") || value
        );
      } else {
        return this.flatOptions().find(item => item.value === value)?.label || value;
      }
    }
  },
  methods: {
    flatOptions() {
      const options = this.$parent.options;
      return options
        .map(item => {
          if (item.children && item.children.length) {
            return [item, this.flatOptions(item.children)];
          } else {
            return item;
          }
        })
        .flat(Infinity);
    }
  }
};
</script>

<style lang="" scoped></style>
