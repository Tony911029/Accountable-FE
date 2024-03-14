import axios from 'axios'

export const axiosInterceptors = user => {
  axios.interceptors.request.use(
    config => {
      if (config.url.includes('{{orgId}}')) {
        const orgId = user.orgId
        config.url = config.url.replaceAll('{{orgId}}', orgId)
      }

      const token = user?.token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // config.headers['Content-Type'] = 'application/json';
      return config
    },
    error => Promise.reject(error)
  )
}
