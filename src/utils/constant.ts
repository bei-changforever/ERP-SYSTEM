import appPackage from '../../package.json'

// 全局常量
const constant: { [key: string]: string | boolean | any } = {
  // 版本号
  version: appPackage.version,

  // API地址
  apiUrl: import.meta.env.VITE_API_URL,

  // 运行环境
  envMODE: import.meta.env.MODE,

  // 字典类型映射
  typeCodeMap: {
    // EQUIPMENT: 'EQUIPMENT', // 设备
  }
}

export default constant
