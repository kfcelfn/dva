import api from './api'
import { get } from '@/utils/request';

export const findUser = () => get(api.findUser)