<template>
    <el-card class="action-table-card">
        <div class="container-box">
            <!-- 选项栏 -->
            <div class="action-table-header">
                <div class="action-table-header-left">

                    <div class="colunm">
                        <div class="title">商品单据类型：</div>
                        <div class="select">
                            <el-select v-model="value1" placeholder="全部">
                                <el-option v-for="item in options1" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                    </div>

                    <div class="colunm">
                        <div class="title">状态：</div>
                        <div class="select">
                            <el-select v-model="value2" placeholder="全部">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                    </div>

                    <div class="colunm">
                        <div class="title">物流：</div>
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
                        <el-button @click="handelShowAnyOrders" type="primary">确定</el-button>
                        <el-button @click="clearSelection" type="danger">清空</el-button>
                    </div>
                </div>
            </div>
            <!-- 内容栏 -->
            <div class="action-table-container">
                <el-table @selection-change="handleSelectionChange" :data="tableData" ref="multipleTableRef" stripe
                    style="width: 100%">
                    <el-table-column type="selection" width="55" />
                    <el-table-column label="单据类型" width="150" show-overflow-tooltip>
                        <template #default="scope">

                            <el-text>
                                <el-icon>
                                    <Paperclip />
                                </el-icon>
                                {{ scope.row.Documents }}
                            </el-text>

                        </template>
                    </el-table-column>

                    <el-table-column label="订单编号" width="250">
                        <template #default="scope">

                            <el-text>
                                <el-icon>
                                    <Link />
                                </el-icon>
                                {{ scope.row.orderID }}
                            </el-text>

                        </template>
                    </el-table-column>
                    <el-table-column label="物流" width="150">
                        <template #default="scope">

                            <el-tag type="danger">未选择物流信息</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="更新时间" width="200">
                        <template #default="scope">

                            <el-text>
                                <el-icon>
                                    <Clock />
                                </el-icon>
                                {{ scope.row.updateTime }}
                            </el-text>

                        </template>
                    </el-table-column>
                    <el-table-column label="地址" show-overflow-tooltip>
                        <template #default="scope">

                            <el-text>
                                <el-icon>
                                    <Position />
                                </el-icon>
                                {{ scope.row.address }}
                            </el-text>

                        </template>
                    </el-table-column>
                    <el-table-column label="状态" width="100">
                        <el-tag type="warning">处理中</el-tag>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template #default="scope">
                            <el-button link type="primary" @click="showDialog(scope.row)">添加物流</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="action-table-container-pagenigation">
                    <el-pagination v-model:current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :small="small"
                        :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
                        :total="40" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>
            </div>
        </div>
    </el-card>
    <Cdialog :visible="dialogShow" :title="dialogTitle" :width="850" @closeDialog="monitorCloseDialog">

        <orderPage :data="orderData"></orderPage>

    </Cdialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElTable } from 'element-plus';

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const input1 = ref('');
const currentPage = ref(1);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const dialogShow = ref(false);
const dialogTitle = ref('');
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref([]) as any;
const orderData = ref() as any;
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`);
};
const monitorCloseDialog = (val: any) => {
    dialogShow.value = val;
};


const toggleSelection = ({ rows, norows }: any) => {

    if (rows) {
        multipleTableRef.value!.toggleRowSelection(rows, true);
    };
    if (norows) {
        norows.forEach((norow: any) => {
            multipleTableRef.value!.toggleRowSelection(norow, false);
        });
    };
};



const showDialog = (item: any) => {

    toggleSelection({
        rows: item,
        norows: multipleSelection.value
    });


    orderData.value = {};
    orderData.value = {
        id: 1,
        item
    };
    dialogShow.value = true;
    dialogTitle.value = '处理订单编号：' + item.orderID;


};

const handelShowAnyOrders = () => {
    if (multipleSelection.value.length == 1) {
        orderData.value = {};
        dialogShow.value = true;
        dialogTitle.value = '处理订单编号：' + (<any>multipleSelection.value[0]).orderID;
        orderData.value = {
            id: 1,
            item: multipleSelection.value[0]
        };
    }
    else if (multipleSelection.value.length > 1) {
        orderData.value = {};
        dialogShow.value = true;
        dialogTitle.value = '处理多项订单';
        orderData.value = {
            id: 2,
            item: multipleSelection.value
        };

    }
    else if (multipleSelection.value.length == 0) {
        orderData.value = [];
        dialogShow.value = false;
        return
    }
};


const handleSelectionChange = (val: any) => {
    multipleSelection.value = val
};


const clearSelection = () => {
    multipleTableRef.value!.clearSelection()
};


const options1 = [
    {
        value: '药品单',
        label: '药品单',
    },
    {
        value: '生活用品单',
        label: '生活用品单',
    },
    {
        value: '食品单',
        label: '食品单',
    },
    {
        value: '器材单',
        label: '器材单',
    }
];

const options2 = [
    {
        value: '申请中',
        label: '申请中',
    },
    {
        value: '处理中',
        label: '处理中',
    }
];

const options3 = [
    {
        value: '010K2324982',
        label: '京东快递',
    },
    {
        value: 'F2015020547561904',
        label: '德邦快递',
    },
    {
        value: '90000003517455',
        label: '邮政',
    }
];






const tableData = [
    {
        Documents: '药品单',
        delivery: '暂未选择物流',
        address: '广东省*******************',
        updateTime: '2023/08/09 15:00',
        orderID: 'JSX2012040110235662',
        qualified: '20230802008',
        orderName: '茯苓、地骨皮',
        customer: 'QQ20201231',
        tel: '123456789'
    },
    {
        Documents: '食品单',
        delivery: '暂未选择物流',
        address: '广东省*******************',
        updateTime: '2023/08/09 15:00',
        orderID: 'JSX2012040110235662',
        qualified: '20230802008',
        orderName: '茯苓、地骨皮',
        customer: 'QQ20201231',
        tel: '123456789'
    },
    {
        Documents: '生活用品单',
        delivery: '暂未选择物流',
        address: '广东省*******************',
        updateTime: '2023/08/09 15:00',
        orderID: 'JSX2012040110235662',
        qualified: '20230802008',
        orderName: '茯苓、地骨皮',
        customer: 'QQ20201231',
        tel: '123456789'
    },
    {
        Documents: '药品单',
        delivery: '暂未选择物流',
        address: '广东省*******************',
        updateTime: '2023/08/09 15:00',
        orderID: 'JSX2012040110235662',
        qualified: '20230802008',
        orderName: '茯苓、地骨皮',
        customer: 'QQ20201231',
        tel: '123456789'
    }
];
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