import http from '@/utils/http'
import { getToken, setToken, removeToken } from '@/utils/auth'
/**
 * User STORE
 */

const store = {

  state: {
    name: '',
    avatar: '',
    token: getToken(),
    roles: null // 权限应该是返回个数组对象吧?
  },

  mutations: {
    SET_TOKEN (state, data) {
      if (data.userToken) {
        state.token = data.userToken
        setToken(data.userToken)
      }
    },
    REMOVE_TOKEN (state, data) {
      removeToken()
    },
    SET_USERINFO (state, data) {
      state.name = data.name
      state.avatar = data.avatar
      state.roles = data.roles
    },
    RESET_USERINFO (state, data) {
      state.name = ''
      state.avatar = ''
      state.token = null
      state.roles = null
    }
  },

  actions: {
    /**
     * 用户登录
     * 需要通过mutation在浏览器中创建Token cookie保证一定的登录实效性;
     *
     * @param {any} {commit}
     * @param {any} params
     * @returns
     */
    userLogin ({commit, state}, params) {
      return new Promise((resolve, reject) => {
        http.post('/login', params)
          .then(res => {
            commit('SET_TOKEN', res.data)
            resolve()
          }).catch(err => {
            reject(err)
          })
      })
    },
    /**
     * 用户注销
     * 需要通过mutations移除浏览器的Token cookie,并做一些相关注销处理
     *
     * @param {any} {commit}
     * @returns
     */
    userLogout ({commit}) {
      return new Promise((resolve, reject) => {
        // 重置用户相关信息
        commit('REMOVE_TOKEN')
        commit('RESET_USERINFO')
        // 重置浏览记录以及tab页面记录等,该mutation访问 store/views.js
        commit('REMOVE_ALL_VISITED')
        // 重置权限路由表, 该mutation 访问 store/asyncRouter.js
        commit('RESET_ROUTERS')
        //
        resolve()
      })
    },
    /**
     * 获取用户信息
     * 返回当前用户的基础信息
     *
     * @param {any} {commit}
     * @param {any} params
     * @returns
     */
    getUserInfo ({commit, state}, params) {
      return new Promise((resolve, reject) => {
        http.post('/user/info', {
          'token': state.token
        })
          .then(res => {
            commit('SET_USERINFO', res.data)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    }
  }

}

export default store
