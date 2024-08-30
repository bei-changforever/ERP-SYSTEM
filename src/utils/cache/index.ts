import { SessionStorage, Storage } from '@/utils/storage'
import CacheKey from '@/utils/cache/key'
import { ITheme } from '@/stores/theme/interface'
import { themeConfig } from '@/stores/theme/config'

// 缓存
class Cache {
  getToken = (): string => {
    return Storage.getItem(CacheKey.TokenKey) || ''
  }

  setToken = (value: string) => {
    Storage.setItem(CacheKey.TokenKey, value)
  }

  getRefreshToken = (): string => {
    return Storage.getItem(CacheKey.RefreshToken) || ''
  }

  setRefreshToken = (value: string) => {
    Storage.setItem(CacheKey.RefreshToken, value)
  }

  getSidebarOpened = (): boolean => {
    const cache = Storage.getItem(CacheKey.SidebarOpenedKey)
    return typeof cache === 'boolean' ? cache : true
  }

  setSidebarOpened = (value: boolean) => {
    Storage.setItem(CacheKey.SidebarOpenedKey, value)
  }

  getComponentSize = (): string => {
    return Storage.getItem(CacheKey.ComponentSizeKey) || 'default'
  }

  setComponentSize = (value: string) => {
    Storage.setItem(CacheKey.ComponentSizeKey, value)
  }

  getTheme = (): ITheme => {
    return (SessionStorage.getItem(CacheKey.ThemeKey) as ITheme) || themeConfig
  }

  setTheme = (value: ITheme) => {
    SessionStorage.setItem(CacheKey.ThemeKey, value)
  }

  removeTheme = () => {
    SessionStorage.removeItem(CacheKey.ThemeKey)
  }
}

export default new Cache()
