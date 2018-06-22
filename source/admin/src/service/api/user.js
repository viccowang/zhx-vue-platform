/**
 *
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
    }

  ]
}
