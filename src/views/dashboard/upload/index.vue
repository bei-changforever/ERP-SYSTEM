<template>
    <el-card class="action-table-card">
        <div class="block">

            <el-form ref="userFormRef" width="100%" :model="userForm"  size="large">
                <el-form-item>
                    <el-tabs type="border-card">
                        <el-tab-pane label="导入文件">
                            <el-upload class="upload-demo" method="post" ref="upload" :on-remove="handleRemove"
                                :on-exceed="handleExceed" :auto-upload="false" :on-change="handleChange" drag :limit="limit"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
                                <el-icon class="el-icon--upload">
                                    <upload-filled />
                                </el-icon>
                                <div class="el-upload__text">
                                    将文件拖至此处，或<em>点击上传</em>
                                </div>
                                <template #tip>
                                    <div class="el-upload__tip">
                                        上传文件格式最大500kb
                                    </div>
                                </template>
                            </el-upload>

                        </el-tab-pane>
                    </el-tabs>
                </el-form-item>
                <el-form-item>
                    <div class="action-table-container-pagenigation">
                        <el-button type="primary" @click="uploadBtn">确定</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { isValidKey } from '@/typing';
import { ref, reactive } from 'vue';
import type { File } from '@/typing';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
import { genFileId } from 'element-plus'
import { upLoadFile } from '@/api/server/checkVoucher';
import { ElMessage } from 'element-plus';
const userFormRef = ref();
const userForm = reactive({
    file: null
});
const upload = ref<UploadInstance>();
const limit = ref(1);
const handleChange = (file: File) => {
    if (file) {
        userForm.file = file.raw;
    };
};

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
    if (uploadFile.status == 'ready') {
        userForm.file = null
    }
}

const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

interface fileBackAxios {
    code: string,
    message: string
}


const uploadBtn = () => {

    userFormRef.value.validate(async (valid: boolean) => {

        if (valid) {
            let res: fileBackAxios | any;


            const formData = new FormData();
            for (let key in userForm) {
                if (isValidKey(key, userForm)) {
                    formData.append(key, userForm[key])

                };
            };

          
            res = await upLoadFile(formData);
          

            if (res.code == '200') {
                ElMessage({
                    message: '上传成功',
                    type: 'success'
                })
            }
            else {
                ElMessage({
                    message: '文件或者字节不能为空',
                    type: 'error'
                })
            }

        };

    });


}


</script>

<style lang="scss" scoped>
.block {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

:deep(.el-tabs) {
    width: 100% !important;
}
</style>