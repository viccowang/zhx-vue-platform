import http from '@/utils/http'
/**
 * USER API
 */

/**
 * 用户登录
 *
 * @export
 * @param {any} params
 * @returns
 */
export function commonLogin (params) {
  return http.post(
    '/user/login',
    params
  )
}

/**
 * 获取用户信息
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getUserInfo (userId) {
  return http.post(
    '/user/info',
    { userId }
  )
}
/**
 * 获取用户列表
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getUserList (params) {
  return http.post(
    '/user/list',
    params
  )
}

/**
 * 新建用户
 *
 * @export
 * @param {any} userInfo { }
 * @returns
 */
export function addUser (userInfo) {
  return http.post(
    '/user/add',
    userInfo
  )
}

/**
 * 编辑用户
 *
 * @export
 * @param {any} userInfo
 * @returns
 */
export function editUser (userInfo) {
  return http.post(
    '/user/edit',
    userInfo
  )
}

/**
 * 删除用户
 *
 * @export
 * @param {any} userId
 * @returns
 */
export function deleteUser (userId) {
  return http.post(
    '/user/delete',
    { userId }
  )
}

/**
 * 重置密码
 * @param {*} params
 */
export function resetPassword (userId) {
  return http.post(
    '/user/password/reset',
    { userId }
  )
}
/**
 * 修改用户密码
 * @param {*} params
 */
export function editPassword (params) {
  return http.post(
    '/user/password/edit',
    params
  )
}
