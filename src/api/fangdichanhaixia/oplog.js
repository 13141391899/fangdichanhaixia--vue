import request from '@/utils/request'
import base from "@/api/fangdichanhaixia/base";


export function selectByPage(data) {
  var path = '/fangdichanhaixia/opLogInfo/selectByPage'
  return request({
    url: base.baseUrl + path,
    method: 'post',
    data
  })
}
