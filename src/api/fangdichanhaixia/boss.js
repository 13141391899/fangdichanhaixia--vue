import request from '@/utils/request'
import base from "@/api/fangdichanhaixia/base";

var host = 'http://localhost:'
var port = 7001

export function selectByPage(data) {
  var path = '/fangdichanhaixia/bossInfo/selectByPage'
  return request({
    url: base.baseUrl + path,
    method: 'post',
    data
  })
}

export function add(data) {
  var path = '/fangdichanhaixia/bossInfo/add'
  return request({
    url: base.baseUrl + path,
    method: 'post',
    data
  })
}

export function update(data) {
  var path = '/fangdichanhaixia/bossInfo/update'
  return request({
    url: base.baseUrl + path,
    method: 'post',
    data
  })
}

export function deleteBatch(data) {
  var path = '/fangdichanhaixia/bossInfo/deleteBatch'
  return request({
    url: base.baseUrl + path,
    method: 'post',
    data
  })
}
