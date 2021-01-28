import request from '@/utils/request'

var host = 'http://localhost:'
var port = 7001

export function selectByPage(data) {
  var path = '/fangdichanhaixia/opLogInfo/selectByPage'
  return request({
    url: host + port + path,
    method: 'post',
    data
  })
}
