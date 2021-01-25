import request from '@/utils/request'
var host = 'http://localhost:'
var port = 7001
export function selectByPage(data) {
  var path = '/fangdichanhaixia/houseInfo/selectByPage'
  return request({
    url: host + port + path,
    method: 'post',
    data
  })
}

export function add(data) {
  var path = '/fangdichanhaixia/houseInfo/add'
  return request({
    url: host + port + path,
    method: 'post',
    data
  })
}

export function update(data) {
  var path = '/fangdichanhaixia/houseInfo/update'
  return request({
    url: host + port + path,
    method: 'post',
    data
  })
}
