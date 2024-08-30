<script setup lang="ts" name="SvgIcon">
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  }
})

// https://www.iconfont.cn 图标库需使用前缀 icon- 才能匹配
const iconName = computed(() => `#icon-${props.icon.replace('icon-', '')}`)
</script>

<template>
  <div class="svg-icon">
    <svg v-if="props.icon" :class="`${className}`" :style="`color:${color};`" aria-hidden="true">
      <use :href="iconName" />
    </svg>
  </div>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
}
.svg-icon svg {
  /* font-size: 16px; */
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  flex-shrink: 0;
}
</style>
