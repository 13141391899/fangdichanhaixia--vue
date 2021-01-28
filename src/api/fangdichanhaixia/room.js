import request from '@/utils/request'

export function selectByPage(data) {
  var path = '/fangdichanhaixia/roomInfo/selectByPage'
  return request({
    url: request.local_host_port + path,
    method: 'post',
    data
  })
}

export function add(data) {
  var path = '/fangdichanhaixia/roomInfo/add'
  return request({
    url: request.local_host_port + path,
    method: 'post',
    data
  })
}

export function update(data) {
  var path = '/fangdichanhaixia/roomInfo/update'
  return request({
    url: request.local_host_port + path,
    method: 'post',
    data
  })
}

export function deleteBatch(data) {
  var path = '/fangdichanhaixia/roomInfo/deleteBatch'
  return request({
    url: request.local_host_port + path,
    method: 'post',
    data
  })
}
