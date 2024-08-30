<script setup lang="ts">
import { RouterView } from 'vue-router';
import { nextTick, onMounted, ref, provide } from 'vue';
import { useAppStore } from '@/stores'
import { handleThemeStyle } from '@/utils/theme';
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn';
const appStore = useAppStore()
onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(appStore.theme)
  })
})
const isRouterAlive = ref(true)

// 全局注入刷新页面的方法
provide('reload', () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
})

</script>

<template>
  <el-config-provider :locale="zhCn" :size="appStore.componentSize">
    <RouterView v-if="isRouterAlive" />
  </el-config-provider>
</template>

<style scoped></style>
