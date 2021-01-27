import request from '@/utils/request'

//var host = 'http://localhost:'
var host = 'http://112.126.79.228:'
var port = 7001

export function selectByPage(data) {
  var path = '/fangdichanhaixia/bossInfo/selectByPage'
  return request({
    url: host + port + path,
    method: 'post',
    data
  })
}

export function add(data) {
  var path = '/fangdichanhaixia/bossInfo/add'
  return request({
    url: host + port + path,
    method: 'post',
    data
  })
}

export function update(data) {
  var path = '/fangdichanhaixia/bossInfo/update'
  return request({
    url: host + port + path,
    method: 'post',
    data
  })
}

export function deleteBatch(data) {
  var path = '/fangdichanhaixia/bossInfo/deleteBatch'
  return request({
    url: host + port + path,
    method: 'post',
    data
  })
}
