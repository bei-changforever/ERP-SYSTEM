<template>
    <div class="cdialog">
        <el-dialog v-model="dialogVisible" :show-close="true" @close="closedialog()"     destroy-on-close :width="props.width" draggable
            @open="openDialog()">
            <template #header>
                <div class="dialog-header">
                    <div class="dialog-title">
                        <div class="title-text">
                            <el-text size="large" type="primary">{{ props.title }}</el-text>
                        </div>
                    </div>
                    <div class="dialog-close" @click="closedialog()">
                        <svgicon icon="close"></svgicon>
                    </div>
                </div>
            </template>
            <div class="content">
                <slot></slot>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch,onUnmounted } from 'vue';
const emit = defineEmits(['closeDialog', 'openDialog']);
const props = defineProps({
    title: {
        type: String,
        default: () => '弹框标题'
    },
    visible: {
        type: Boolean,
        default: false
    },
    width: {
        type: Number
    }
});
const { visible } = toRefs(props);
let dialogVisible = ref(false);
watch(
    visible,
    newVal => {
        dialogVisible.value = newVal
    },
    { immediate: true }
);
const closedialog = () => {
    emit('closeDialog', false)
};
const openDialog = () => {
    emit('openDialog')
};

</script>

<style scoped  lang="scss">
.cdialog {
   :deep(.el-dialog)  {
        border-radius: 10px;
    }

    .dialog-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 46px;
        align-items: center;

        .dialog-title {
            width: 389px;
            height: 100%;

            display: flex;
            align-items: center;

            .title-text {
                margin-left: 30px;
                font-size: 16px;
                font-family: Microsoft YaHei-Bold, Microsoft YaHei;
                font-weight: bold;

            }
        }

        .dialog-close {
            width: 24px;
            height: 24px;
            margin-right: 10px;
            cursor: pointer;

            :deep(.svg-icon) svg {
                width: 24px;
                height: 24px;
            }
        }

    }

    .content {
        width: 100%;
        height: 100%;

    }
}
</style>