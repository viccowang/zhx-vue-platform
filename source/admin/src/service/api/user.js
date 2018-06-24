/**
 * USER API
 * Namespace: User
 */

export const UserApi = {
  user: [
    {
      name: 'login',
      method: 'POST',
      path: '/user/login',
      mockPath: '/user/login',
      params: {
        userAccount: '',
        userPassword: ''
      },
      desc: ''
    },
    {
      name: 'info',
      method: 'POST',
      path: '/user/info',
      mockPath: '/user/info',
      params: {
        userId: ''
      },
      desc: ''
    },
    {
      name: 'password.edit',
      method: 'POST',
      path: '/user/password/edit',
      mockPath: '/user/password/edit',
      params: {
        oldPassword: '',
        newPassword: ''
      },
      desc: ''
    }
  ]
}
