import { getToken, setToken, removeToken } from '@/service/expands/auth'
import api from '@/plugins/api'
/**
 * User STORE
 */

const user = {
  state: {
    userId: '',
    userAccount: '',
    userName: '',
    userStatus: '',
    avatar: '../static/myAvatar200.png', // static
    token: getToken(),
    roles: null // 权限应该是返回个数组对象吧?
  },

  mutations: {
    SET_TOKEN (state, token) {
      if (token) {
        state.token = token
        setToken(token)
      }
    },
    REMOVE_TOKEN (state, data) {
      state.token = null
      removeToken()
    },
    SET_USERINFO (state, data) {
      state.userId = data.userId
      state.userAccount = data.userAccount
      state.userName = data.userName
      state.userStatus = data.userStatus
      state.roles = data.roles // static roles
      // state.avatar = data.avatar
      // state.roles = data.roles
    },
    RESET_USERINFO (state, data) {
      state.userId = ''
      state.userAccount = ''
      state.userName = ''
      state.userStatus = ''
      state.avatar = ''
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
        api['user.login'](params).then(res => {
          // 假装有TOKEN, 将Token暂时存为userId
          commit('SET_TOKEN', res.userId)
          resolve()
        }).catch(err => {
          reject(err)
        })
        // commonLogin(params)
        //   .then(res => {
        //     // 假装有TOKEN, 将Token暂时存为userId
        //     commit('SET_TOKEN', res.userId)
        //     resolve()
        //   }).catch(err => {
        //     reject(err)
        //   })
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
        api['user.logout']().then(() => {
          // 重置用户相关信息
          commit('REMOVE_TOKEN')
          // 重置用户信息
          commit('RESET_USERINFO')
          // 重置浏览记录以及tab页面记录等,该mutation访问 store/views.js
          commit('REMOVE_ALL_VISITED')
          // 重置权限路由表, 该mutation 访问 store/asyncRouter.js
          commit('RESET_ROUTERS')
          //
          resolve()
        }).catch(err => {
          reject(err)
        })
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
        api['user.info']({userId: state.token})
          .then(res => {
            if (res) {
              commit('SET_USERINFO', res)
              resolve(res)
            }
          }).catch(err => {
            reject(err)
          })
      })
    }
  }

}

export default user
