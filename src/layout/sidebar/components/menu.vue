
<template>
    <el-scrollbar>


        <el-menu 
        router
        :collapse-transition="false" background-color="transparent" :collapse="!sidebarOpened"
            :unique-opened="theme.uniqueOpened" :default-active="active">

            <MenuItem  v-for="menu in routerMenu" :key="menu.path"  :menu="menu"></MenuItem>
         

        </el-menu>



    </el-scrollbar>
</template>
<script setup lang="ts">
import { useAppStore } from '@/stores';
import { ref,computed, watchEffect,onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { cloneDeep } from 'lodash-es';
import { useRouter,useRoute } from 'vue-router';
import MenuItem from './menu-item.vue';
const router = useRouter()

const route = useRoute()

const active = ref('upload')

const { sidebarOpened, theme } = storeToRefs(useAppStore());


let routerMenu = computed(() => {
    return cloneDeep(router.options.routes[1].children)!.map((item, index) => {
        return { ...item, id: index + 1 }

    })
})

onMounted(() => {
    active.value = route.path.split('/').filter(Boolean)[1]
})

watchEffect(() => {
   routerMenu
})


</script>

<style lang="scss" scoped></style>