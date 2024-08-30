import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import cache from '@/utils/cache'
export const useAppStore = defineStore('appStore', () => {
    // sidebar 是否展开
    const sidebarOpened = ref(true);
    const theme = reactive(cache.getTheme());

 

    // 组件大小
    const componentSize = ref(cache.getComponentSize());
   

    const setSidebarOpened = () => {
        sidebarOpened.value = !sidebarOpened.value
    }
    return { theme, sidebarOpened, componentSize, setSidebarOpened }
})
