import request from '@/utils/request'
import base from "@/api/fangdichanhaixia/base";

export function selectByPage(data) {
  var path = '/fangdichanhaixia/payInfo/selectByPage'
  return request({
    url: base.baseUrl + path,
    method: 'post',
    data
  })
}

export function add(data) {
  var path = '/fangdichanhaixia/payInfo/add'
  return request({
    url: base.baseUrl +  path,
    method: 'post',
    data
  })
}

export function update(data) {
  var path = '/fangdichanhaixia/payInfo/update'
  return request({
    url: base.baseUrl +  path,
    method: 'post',
    data
  })
}

export function deleteBatch(data) {
  var path = '/fangdichanhaixia/payInfo/deleteBatch'
  return request({
    url: base.baseUrl +  path,
    method: 'post',
    data
  })
}
