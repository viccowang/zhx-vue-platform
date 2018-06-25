import { UserApi } from './user'
import { platformApi } from './platform'

export default {
  ...UserApi,
  ...platformApi
}
