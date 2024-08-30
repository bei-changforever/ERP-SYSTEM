<template>
    <div class="base-message">

        <div class="base-message-container">
            <el-card shadow="hover" class="box-card" :body-style="{ padding: '10px' }">
                <div class="order-card-container">
                    <div class="orderInfo">
                        <div class="order-container">
                            <div class="message-title">
                                <el-tag round>基本信息</el-tag>
                            </div>
                            <div class="message-item">
                                <div class="ename">
                                    <el-tag type="info">订单编号</el-tag>
                                </div>
                                <div class="item-value">
                                    <el-text type="info">JSX2012040110235662</el-text>
                                </div>
                            </div>
                            <div class="message-item">
                                <div class="ename">
                                    <el-tag type="info">商品名称</el-tag>
                                </div>
                                <div class="item-value">
                                    <el-text type="info">菊花蒸馏液</el-text>
                                </div>
                            </div>
                            <div class="message-item">
                                <div class="ename">
                                    <el-tag type="info">商品数量</el-tag>
                                </div>
                                <div class="item-value">
                                    <el-text type="info">1</el-text>
                                </div>
                            </div>
                            <div class="message-item">
                                <div class="ename">
                                    <el-tag type="info">物流</el-tag>
                                </div>
                                <div class="item-value">
                                    <el-select clearable v-model="logistics" placeholder="选择物流">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="messageInfo">
                        <div class="sendMan-box">
                            <div class="sendMan-container">
                                <div class="message-title">
                                    <el-tag round>寄件人</el-tag>
                                </div>
                                <div class="message-item">
                                    <div class="ename">
                                        <el-tag type="info">姓名</el-tag>
                                    </div>
                                    <div class="item-value">
                                        <el-select clearable v-model="sendMan.name" placeholder="选择寄件人">
                                            <el-option v-for="item in options4" :key="item.value" :label="item.label"
                                                :value="item.value" />
                                        </el-select>
                                    </div>
                                </div>
                                <div class="message-item">
                                    <div class="ename">
                                        <el-tag type="info">电话</el-tag>
                                    </div>
                                    <div class="item-value">
                                        <el-select clearable v-model="sendMan.mobile" placeholder="选择寄件人电话">
                                            <el-option v-for="item in options5" :key="item.value" :label="item.label"
                                                :value="item.value" />
                                        </el-select>
                                    </div>
                                </div>
                                <div class="message-item">
                                    <div class="ename">
                                        <el-tag type="info">地址</el-tag>
                                    </div>
                                    <div class="item-value">
                                        <el-select clearable v-model="sendMan.printAddr" placeholder="选择寄件人地址">
                                            <el-option v-for="item in options6" :key="item.value" :label="item.label"
                                                :value="item.value" />
                                        </el-select>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div class="recMan-box">
                            <div class="recMan-container">
                                <div class="message-title">
                                    <el-tag round>收件人</el-tag>
                                </div>
                                <div class="message-item">
                                    <div class="ename">
                                        <el-tag type="info">姓名</el-tag>
                                    </div>
                                    <div class="item-value">
                                        <el-input clearable v-model="recManInfo.name" placeholder="请输入收货人姓名" />
                                    </div>
                                </div>
                                <div class="message-item">
                                    <div class="ename">
                                        <el-tag type="info">电话</el-tag>
                                    </div>
                                    <div class="item-value">
                                        <el-input clearable v-model="recManInfo.mobile" placeholder="请输入收货人电话" />
                                    </div>
                                </div>
                                <div class="message-item">
                                    <div class="ename">
                                        <el-tag type="info">地址</el-tag>
                                    </div>
                                    <div class="item-value">
                                        <el-input clearable v-model="recManInfo.printAddr" placeholder="请输入收货人地址" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </el-card>
        </div>


        <div class="btn-group">
            <div class="print-model">
                <el-select clearable v-model="tempId" placeholder="选择打印模板">
                    <el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>

            <el-button type="primary">确定</el-button>
            <el-button type="success" @click="printClick">打印</el-button>
        </div>

    </div>
</template>

<script setup lang="ts">

import { ref, onMounted, reactive } from 'vue';
import { cloneDeep } from 'lodash-es';
import { expressLabel } from '@/api/server/checkVoucher';
import { ElMessage } from 'element-plus';
const props = defineProps({
    data: {
        type: [Array, Object]
    }
});

interface man {

    mobile: string,
    name: string,
    printAddr: string,

}

// 发件人
const sendMan: man = reactive({
    mobile: "",
    name: "",
    printAddr: "",
});

// 打印模板ID
const tempId = ref('');

// 收货人
const recManInfo: man = reactive({
    mobile: "",
    name: "",
    printAddr: "",
});

// 选择的物流
const logistics = ref('');

// 默认快递
const options = [
    {
        value: 'jd/010K2324982',
        label: '京东',
    },
    {
        value: 'debangkuaidi/F2015020547561904',
        label: '德邦快递',
    },
    {
        value: 'youzhengguonei/90000003517455',
        label: '邮政',
    }
];

// 打印模板
const options7 = [
    {
        value: 'youzhengguonei/598a29835c9240d5a03a66f2db65e811',
        label: '邮政'
    },
    {
        value: 'jd/966283322f3d42afb6e3710b696e1da3',
        label: '京东'
    },
    {
        value: 'debangkuaidi/b1545f616d1442819f724a4527b4f9b3',
        label: '德邦'
    }
];

// 默认寄件人
const options4 = [
    {
        value: '万年青 青旗健康',
        label: '万年青 青旗健康'
    },
    {
        value: '林泽锋',
        label: '林泽锋'
    },
    {
        value: '物流部 郑栋凯',
        label: '物流部 郑栋凯'
    },
    {
        value: '万年青（电商部）',
        label: '万年青（电商部）'
    },
    {
        value: '万年青物流部',
        label: '万年青物流部'
    }
];

// 默认电话
const options5 = [
    {
        value: '0754-88119977',
        label: '0754-88119977'
    },
    {
        value: '13670419024',
        label: '13670419024'
    },
    {
        value: '13670419024',
        label: '13670419024'
    },
    {
        value: '0754-88119893',
        label: '0754-88119893'
    },
    {
        value: '0754-88119958',
        label: '0754-88119958'
    }
];

// 默认地址
const options6 = [

    {
        value: '广东省汕头市金园工业城潮阳路16片区08号 广东万年青制药股份有限公司',
        label: '广东省汕头市金园工业城潮阳路16片区08号 广东万年青制药股份有限公司'
    }
];


interface printInfo {
    orderId: string,
    tempId: string,
    cargo: string,
    count: Number,
    partnerId: string,
    kuaidicom: string,
    net: string,
    recMan: man,
    sendMan: man,
};

const printInfo: printInfo = reactive({
    orderId: "",
    cargo: '',
    count: 1,

    tempId: "",
    kuaidicom: '',
    partnerId: '',

    net: '',
    recMan: {

        mobile: "",
        name: "",
        printAddr: "",

    },
    sendMan: {
        mobile: "",
        name: "",
        printAddr: "",
    },
});

const printClick = async () => {




    let moban = spliteStr(tempId.value);
    let wuliu = spliteStr(logistics.value);




    if (moban && wuliu) {
        if (moban.name.indexOf(wuliu.name) !== -1) {

            printInfo.tempId = cloneDeep(moban.value);
            printInfo.sendMan = cloneDeep(sendMan);
            printInfo.recMan = cloneDeep(recManInfo);
            printInfo.kuaidicom = cloneDeep(wuliu.name);
            printInfo.partnerId = cloneDeep(wuliu.value);
            printInfo.net = cloneDeep(wuliu.name);




            let res: any = await expressLabel(printInfo);

            if (res.code == 200) {
                ElMessage({
                    showClose: true,
                    message: '打印',
                    type: 'success'
                })
            }
            else {
                ElMessage({
                    showClose: true,
                    message: JSON.parse(res.body).message,
                    type: 'error'
                })
            }




        }
        else {
            ElMessage({
                message: '打印模板或者物流字段不匹配',
                type: 'error'
            })
        }
    }
    else {
        ElMessage({
            message: '打印模板或者物流不能为空',
            type: 'error'
        })
    }




};

const spliteStr = (str: string) => {

    if (str) {
        return {
            name: str.split('/')[0],
            value: str.split('/')[1]
        }
    }
    else {
        ElMessage({
            message: '不能为空',
            type: 'error'
        })
    }
}


onMounted(() => {
    logistics.value = '';
    tempId.value = '';
});



</script>

<style scoped lang="scss" >
.base-message {
    display: flex;
    flex-wrap: wrap;


    .base-message-container {
        width: 100%;
        margin-bottom: 10px;

        &.many {
            width: 45%;
            margin-bottom: 10px;
        }

        .order-card-container {
            width: 100%;
            display: flex;
            flex-direction: column;

            .orderInfo {
                width: 100%;
                display: flex;
                flex-direction: column;


                .order-container {
                    .message-title {
                        margin-bottom: 10px;
                    }


                    .message-item {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;

                        &:last-child {
                            margin-bottom: 0px;
                        }

                        .ename {
                            margin-right: 10px;
                        }
                    }
                }

            }


            .messageInfo {
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin-top: 10px;

                .sendMan-box {
                    width: 49%;


                    .message-title {
                        margin-bottom: 10px;
                    }


                    .message-item {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;

                        &:last-child {
                            margin-bottom: 0px;
                        }

                        .ename {
                            margin-right: 10px;
                        }
                    }
                }

                .recMan-box {
                    width: 49%;



                    .message-title {
                        margin-bottom: 10px;
                    }


                    .message-item {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;

                        &:last-child {
                            margin-bottom: 0px;
                        }

                        .ename {
                            margin-right: 10px;
                        }

                        :deep(.el-input) {
                            width: 150% !important;
                        }
                    }
                }
            }





        }

    }

    .btn-group {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .print-model {
            margin-right: 10px;
        }
    }

}
</style>