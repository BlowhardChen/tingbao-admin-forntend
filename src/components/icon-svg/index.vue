<template>
  <svg aria-hidden="true" class="svg-icon" :style="'width:' + size + ';height:' + size">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: "icon"
  },
  iconClass: {
    type: String,
    required: false,
    default: ""
  },
  size: {
    type: String,
    default: "1em"
  }
});

const iconName = computed(() => `#${props.prefix}-${props.iconClass}`);
</script>

<style lang="scss" scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 8px;
  overflow: hidden;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  fill: currentcolor;
}
</style>
