import api from './api'
import { get, post } from '@/utils/request';

export const findUser = () => get(api.findUser)
export const add = option => post(api.add, option)
export const updateUser = option => post(api.updateUser, option)
export const deleteUser = option => post(api.deleteUser, option)