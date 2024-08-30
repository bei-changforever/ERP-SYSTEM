import { ref } from 'vue';
import {defineStore } from 'pinia';
export const useStockStore = defineStore('stockStore', () => {
   

    const stockList = ref([
        
    ])

    const setStockList = (val: any) => {
        stockList.value = val
    }

    return {stockList,setStockList}
})
