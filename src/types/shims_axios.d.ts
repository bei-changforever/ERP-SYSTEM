import { AxiosRequestConfig as RCF } from 'axios'
declare module 'axios' {
  export interface AxiosRequestConfig extends RCF {
    showErrorAlert?: boolean // 是否显示错误提示，默认显示
    isCacheGet?: boolean // 是否开启GET请求缓存
  }
}
