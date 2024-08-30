<script setup lang="ts">
import Menu from './components/menu.vue';
import { useAppStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const { sidebarOpened , theme} = storeToRefs(useAppStore())
const sidebarClass = computed(() => {
  const sidebarOpenedClass = sidebarOpened.value ? 'aside-expend' : 'aside-compress'
  const isDarkClass = theme.value.sidebarStyle === 'dark' ? 'sidebar-dark' : ''
  return sidebarOpenedClass + ' ' + isDarkClass
})

</script>

<template>
    <el-aside class="layout-sidebar" :class="sidebarClass">
        <Menu />
    </el-aside>
</template>
