<template>
    <el-card class="action-table-card">
        <div class="container-box">
            <!-- 添加表单 -->
            <div class="add-delivery">
                <el-tag>添加物流</el-tag>
                <div class="add-form">
                    <div class="tag">
                        <el-tag effect="dark">物流公司</el-tag>
                    </div>
                    <div class="input">
                        <el-input v-model="companies" placeholder="请输入" />
                    </div>
                </div>
                <div class="add-form">
                    <div class="tag">
                        <el-tag effect="dark">物流公司ID</el-tag>
                    </div>
                    <div class="input">
                        <el-input v-model="companiesID" placeholder="请输入" />
                    </div>
                </div>
            </div>
            <div class="action-table-container-pagenigation">
                <el-button type="primary">确定</el-button>
            </div>
        </div>
    </el-card>
</template>


<script setup lang="ts">
import { ref } from 'vue';
const companies = ref('');
const companiesID = ref('');

</script>


<style lang="scss" scope>
.container-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .add-delivery {
        width: 100%;
        height: 95%;

        .add-form {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 450px;


            .tag {
                width: 10%;
            }

            .input {
                width: 80%;
            }
        }
    }

 
}
</style>