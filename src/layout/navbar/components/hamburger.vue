<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/index'
const appStore = useAppStore()


const handleClick = () => {
  appStore.setSidebarOpened()
}

const icon = computed(() => (appStore.sidebarOpened ? 'icon-menu-fold' : 'icon-menu-unfold'))
</script>

<template>
  <div @click="handleClick">
    <svgicon :icon="icon"></svgicon>
  </div>
</template>
