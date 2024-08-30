declare type Nullable<T> = T | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T
  currentTarget: T
}

declare interface Fn<T = any> {
  (...arg: T[]): T
}

declare interface APIResponse {
  code: string | number
  data: any
  msg: string | null
}

declare interface IWarnConfigItemParams {
  id?: number | string // 更新的id
  pointId: number | string // 类型
  code: string //  类型的下一项判断值
  expression: string // 根据判断值获取到的表达式
  expressionValue?: number | string // 表达式数值
  sectionMin?: number // 区间最小值
  sectionMax?: number // 区间最大值
  triggerType: string // 持续 立即 次数
  triggerNumber?: string // 次数
  triggerTimeUnit?: string // 单位
  triggerTime: string | number // 时间
  alertGrade: string // 告警等级
  alertType: string // 告警配置选项 DICT(字典) EXPRESSION(表达式)
  alertUpgrade: string | number // 是否升级 0升级 1不升级
  alertUpgradeNumber?: string // 告警升级次数
  childFlag?: number // 是否子设备告警（0是 1否）
}

declare interface Window {
  Global: {
    projectName: string
    projectShortName: string
  }
}
