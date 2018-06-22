import { UserApi } from './user'
import { plateFormApi } from './plateform'

export default {
  ...UserApi,
  ...plateFormApi
}
