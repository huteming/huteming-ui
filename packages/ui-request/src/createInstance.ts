import axios, { AxiosInstance } from 'axios'
import { RequestOptions } from './types'

export default function create (options: RequestOptions): AxiosInstance {
    return axios.create(options)
}
