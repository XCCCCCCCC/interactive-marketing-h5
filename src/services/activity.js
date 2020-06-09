/**
 * @module home
 * @author: chen.xia
 * @description:
 * @since: 2019-12-12
 */

import axios from '@/libs/_axios.js'
import { activity } from '../consts/paths/index.js'

export async function getList(params) {
  const res = await axios.get(activity.getList, { params })
  return res.response
}
export async function getTypeList() {
  const res = await axios.get(activity.getTypeList)
  return res.response
}
export async function getDetail(id) {
  const res = await axios.get(`${activity.getDetail}/${id}`)
  return res.response
}
export async function create(data) {
  const res = await axios.post(activity.create, data)
  return res.response
}
export async function update(id, data) {
  const res = await axios.put(`${activity.update}?id=${id}`, data)
  return res.response
}
export async function publish(data) {
  const res = await axios.patch(activity.publish, data)
  return res.response
}
export async function stop(data) {
  const res = await axios.patch(activity.stop, data)
  return res.response
}
export async function remove(data) {
  const res = await axios.patch(activity.remove, data)
  return res.response
}
