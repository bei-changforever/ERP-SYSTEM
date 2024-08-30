<template>
    <el-sub-menu v-if="menu.children.length > 0" :key="menu.path" :index="menu.path">
        <template #title>
            <svgicon :icon="menu.meta.icon" />
            <span>{{ menu.meta.title }}</span>
        </template>

        <menu-item v-for="sub in menu.children" :key="sub.path" :menu="sub" />
    </el-sub-menu>

    <el-menu-item v-else :index="menu.path">
        <svgicon :icon="menu.meta.icon" />
        <template #title>
            <span>{{ menu.meta.title }}</span>
        </template>
    </el-menu-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
    menu: {
        type: Object as PropType<any>,
        required: true
    }
})
</script>

<style scoped></style>