
import '@/styles/index.scss'
import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import component from './components/index';
import 'virtual:svg-icons-register';
import App from './App.vue';
import router from './router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import ElementPlus from 'element-plus';//为vue3项目特别更新的版本
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(ElementPlus);
app.use(component)

app.mount('#app')
