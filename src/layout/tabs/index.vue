<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item>{{ breadcrumb }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, onMounted ,watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';
const router = useRouter()
const route = useRoute()
const breadcrumb = ref('')


const breadcrumbArr = () => {
  router.options.routes[1].children!.forEach((item: any) => {
    if (route.name == item.name) {
      breadcrumb.value = item.meta.title
    }

  })
}
onMounted(() => {
  breadcrumbArr()
})

watchEffect(() => {
  breadcrumbArr()
})




</script>

<style scoped></style>