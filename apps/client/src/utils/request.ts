import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'

import { useEnv } from '~/composables/useEnv'

const { toast } = useToast()

const { VITE_BASE_URL } = useEnv()
const service: AxiosInstance = axios.create({
  baseURL: VITE_BASE_URL,
  timeout: 20 * 1000, // 请求超时时间
  headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Lang': 'zh_CN' },
})

service.interceptors.request.use((config: any) => {
  // 这里可以设置token: config!.headers!.Authorization = token
  // if (config.requestOptions && config.requestOptions.noUseBaseUrl) {
  //   config.baseURL = config.url
  // }
  // else {
  //   const userStore = useUserStore()
  //   const accessToken = userStore.getAccessToken()
  //   if (accessToken)
  //     config.headers['Access-Auth-Token'] = `${accessToken}`
  // }
  return config
})

service.interceptors.response.use(async (response: AxiosResponse) => {
  const data = response.data
  const config = response.config as any
  if (Array.isArray(data)) {
    return data
  }
  // 外部请求
  if (config.requestOptions && config.requestOptions.noUseBaseUrl)
    return data
  if (config.requestOptions && config.requestOptions.pass)
    return data

  // const userStore = useUserStore()

  if ([200, 201].includes(response.status) && [0].includes(data.code)) {
    return data
  }
  else if (response.status === 400) {
    // useToast({
    //   content: data.message,
    //   type: 'error',
    // })
    return false
  }
  // unLogin tip
  // else if (data.code === 400) {
  //   await userStore.resetStore()
  //   ElMessageBox.confirm(data.message, '提示', {
  //     confirmButtonText: 'confirm',
  //     cancelButtonText: 'cancel',
  //     type: 'warning',
  //     showClose: false,
  //     showCancelButton: false,
  //   }).then(() => {
  //     userStore.logout()
  //   })
  //   return Promise.reject(data)
  // }
  else {
    // useToast({
    //   content: 'error'
    //   type: 'error',
    // })
    return Promise.reject(data)
  }
}, (err) => {
  return Promise.reject(err.response)
})

interface IRequestParamConfig {
  url: string
  data?: any
  noUseBaseUrl?: boolean
  params?: any
  pass?: boolean
}

const request = {
  get<T = any>({
    url,
    data,
    noUseBaseUrl = false,
    pass = false,
  }: IRequestParamConfig): Promise<T> {
    return request.request('GET', url, { params: data }, {
      noUseBaseUrl,
      pass,
    })
  },
  post<T = any>(
    {
      url,
      data,
      noUseBaseUrl = false,
      pass = false,
      params,
    }: IRequestParamConfig,
  ): Promise<T> {
    try {
      return request.request('POST', url, { data, params }, {
        noUseBaseUrl,
        pass,
      })
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  put<T = any>(
    {
      url,
      data,
      noUseBaseUrl = false,
      pass = false,
      params,
    }: IRequestParamConfig,
  ): Promise<T> {
    try {
      return request.request('PUT', url, { data, params }, {
        noUseBaseUrl,
        pass,
      })
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  delete<T = any>(
    {
      url,
      data,
      noUseBaseUrl = false,
      pass = false,
      params,
    }: IRequestParamConfig,
  ): Promise<T> {
    try {
      return request.request('DELETE', url, { data, params }, {
        noUseBaseUrl,
        pass,
      })
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  request<T = any>(method = 'GET', url: string, data?: any, requestOptions?: any): Promise<T> {
    return new Promise((resolve, reject) => {
      service({ method, url, ...data, requestOptions })
        .then((res) => {
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError | any) => {
          toast({
            title: '提示',
            description: e.data.message,
            variant: 'destructive',
            duration: 30000,
          })
          reject(e)
        })
    })
  },
}

export default request
