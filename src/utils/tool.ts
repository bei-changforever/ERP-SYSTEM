import type { App, Plugin, Component } from 'vue'


// 把路径转换成驼峰命名
export const pathToCamel = (path: string): string => {
  return path.replace(/\/(\w)/g, (all, letter) => letter.toUpperCase())
}

// 转换文件大小格式
export const convertSizeFormat = (size: number): string => {
  const unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  let index = Math.floor(Math.log(size) / Math.log(1024))
  let newSize = size / Math.pow(1024, index)

  // 保留的小数位数
  return newSize.toFixed(2) + ' ' + unit[index]
}

// 获取svg图标(id)列表
export const getIconList = (): string[] => {
  const rs: string[] = []
  const list = document.querySelectorAll('svg symbol')
  for (let i = 0; i < list.length; i++) {
    rs.push(list[i].id)
  }
  return rs
}




// 全局组件安装
export const withInstall = <T extends Component>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

// 数字千分位格式化
export function numberToCurrencyNo(value: number): string | number {
  if (!value) {
    return '-'
  }
  // 获取整数部分
  const intPart = Math.trunc(value)
  // 整数部分处理，增加,
  const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  // 预定义小数部分
  let floatPart = ''
  // 将数值截取为小数部分和整数部分
  const valueArray = value.toString().split('.')
  if (valueArray.length === 2) {
    // 有小数部分
    floatPart = valueArray[1].toString() // 取得小数部分
    return intPartFormat + '.' + floatPart
  }
  return intPartFormat + floatPart
}
