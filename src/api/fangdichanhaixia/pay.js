import request from '@/utils/request'

export function selectByPage(data) {
  var path = '/fangdichanhaixia/bossInfo/selectByPage'
  return request({
    url: request.local_host_port + path,
    method: 'post',
    data
  })
}

export function add(data) {
  var path = '/fangdichanhaixia/bossInfo/add'
  return request({
    url: request.local_host_port + path,
    method: 'post',
    data
  })
}

export function update(data) {
  var path = '/fangdichanhaixia/bossInfo/update'
  return request({
    url: request.local_host_port + path,
    method: 'post',
    data
  })
}
