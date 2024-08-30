<template>
       <el-container class="layout-container">
              <Sidebar />
              <el-container class="layout-content">
                     <el-header class="layout-header" :style="layoutHeaderHeight">
                            <Navbar />
                            
                     </el-header>
                     <el-scrollbar class="layout-main-scrollbar">
                            <el-main class="layout-main">
                                   <el-scrollbar class="layout-scrollbar">
                                          <div class="layout-card" :style="layoutMainHeight">
                                                 <router-view v-slot="{ Component }">
                                                        <!-- 
                    如果出现多个路由跳到同个页面，不会刷新的问题。可在该页面监听路由变化，自主刷新页面。
                    不要在这里修改 $route.name 为 $route.fullPath，避免冗余的刷新性能开销。
                -->
                                                        <component :is="Component" :key="$route.name" />
                                                 </router-view>
                                          </div>
                                   </el-scrollbar>
                            </el-main>
                     </el-scrollbar>
              </el-container>
       </el-container>
</template>
     
<script lang="ts" setup>
import { Sidebar, Navbar } from '../../layout/index';
import { RouterView } from 'vue-router';
import { useAppStore } from '@/stores';
import { computed} from 'vue';

const appStore = useAppStore();
const theme = computed(() => appStore.theme)
const layoutHeaderHeight = computed(() => {
       if (!theme.value.isTabsView) {
              return 'height:var(--theme-header-height) !important'
       } else {
              return ''
       }
})
const layoutMainHeight = computed(() => {
       if (!theme.value.isTabsView) {
              return 'min-height: calc(100vh - var(--theme-header-height) - 30px) !important'
       } else {
              return ''
       }
})
</script>
     
<style lang="scss"></style>
     