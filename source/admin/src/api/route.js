import http from '@/utils/http'
/**
 * ROUTE API
 */

/**
 * 获取权限路由表
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getGenerateRoutes (params) {
  return http.post(
    '/menu/list',
    params
  )
}
