<template>
    <el-card class="action-table-card">
        <div class="container-box">
            <!-- 选项栏 -->
            <div class="action-table-header">
                <div class="action-table-header-left">

                    <div class="colunm">
                        <div class="title">规格型号：</div>
                        <div class="select">
                            <el-select v-model="value1" placeholder="全部">
                                <el-option v-for="item in options1" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                    </div>

                    <div class="colunm">
                        <div class="title">存货名称：</div>
                        <div class="select">
                            <el-select v-model="value2" placeholder="全部">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                    </div>

                    <div class="colunm">
                        <div class="title">存货编码：</div>
                        <div class="select">
                            <el-select v-model="value3" placeholder="全部">
                                <el-option v-for="item in options3" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                    </div>


                    <div class="search">
                        <div class="search-input">
                            <el-input v-model="input1" placeholder="请输入关键字" />
                        </div>
                        <el-button type="primary">查询</el-button>
                    </div>
                </div>
                <div class="action-table-header-right">
                    <div class="btn-group">
                        <el-button type="danger">删除</el-button>
                    </div>
                </div>
            </div>
            <!-- 内容栏 -->
            <div class="action-table-container">

                <el-table v-loading="loading" :data="tableData" @selection-change="handleSelectionChange"
                    ref="multipleTableRef" stripe style="width: 100%">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="规格型号" label="规格型号" width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="存货名称" label="存货名称" width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="检验单号" label="检验单号" width="200">
                    </el-table-column>
                    <el-table-column prop="批号" label="批号" width="150">
                    </el-table-column>
                    <el-table-column prop="检验单号" label="检验单号" width="150">
                    </el-table-column>
                    <el-table-column prop="日期" label="日期" width="235" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="数量" label="数量" width="150">
                    </el-table-column>
                    <el-table-column prop="存货编码" label="存货编码" width="150">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="150">
                        <template #default="scope">
                            <el-button link type="primary">查看</el-button>
                            <el-button link type="primary">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>


                <div class="action-table-container-pagenigation">
                    <el-pagination v-model:current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :small="small"
                        :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
                        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>

            </div>
        </div>

    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, onUnmounted } from 'vue';
import { ElTable } from 'element-plus';
import { checkVoucher } from '@/api/server/checkVoucher';
const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const input1 = ref('');
const currentPage = ref(1);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const total = ref(0);
const loading = ref(true);
const timer = ref();
const pageData = reactive({
    start: 1,
    length: 10
})
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref([]);
const handleSizeChange = async (val: number) => {
    console.log(`${val} items per page`)
    pageData.length = val
    await getTableDaTa(pageData)

};
const handleCurrentChange = async (val: number) => {

    console.log(`current page: ${val}`)
    pageData.start = val
    await getTableDaTa(pageData)

};

const handleSelectionChange = (val: any) => {
    multipleSelection.value = val
};



const options1 = ref([]) as any;

const options2 = ref([]) as any;

const options3 = ref([]) as any;

const tableData = ref([])
interface checkVoucherData {
    start: string | number,
    length: string | number
}



const getTableDaTa = async ({ start, length }: checkVoucherData) => {
    loading.value = true
    let res: any = await checkVoucher({
        start,
        length
    });

    if (res.data) {
        loading.value = false
        total.value = res.recordsTotal;
        tableData.value = res.data;
    }

}




onMounted(() => {
    if (timer.value) {
        clearTimeout(timer.value)
    }

    timer.value = setTimeout(() => {
        getTableDaTa(pageData)
        loading.value = false
    }, 500)

});

onUnmounted(() => {
    if (timer.value) {
        clearTimeout(timer.value)
    }
})


</script>

<style lang="scss" scoped>
.container-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .action-table-header {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .el-select {
            width: 120px;
            height: 32px !important;
        }

        .action-table-header-left {
            width: 720px;
            height: 100%;

            display: flex;
            justify-content: space-between;


            .colunm {

                width: 150px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .title {
                    color: #8c8c8c;
                    font-size: 15px;
                }
            }

            .search {
                width: 260px;
                height: 100%;

                display: flex;
                flex-direction: row;
                align-items: flex-end;
                justify-content: space-between;

                .el-input {
                    width: 190px;
                }

                .el-button {
                    width: 60px;
                }
            }
        }

        .action-table-header-right {
            width: 250px;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: flex-end;

            .btn-group {
                .el-button {
                    width: 60px;
                }
            }
        }

    }

    .action-table-container {
        width: 100%;
        height: calc(100% - 75px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;

    }

}
</style>