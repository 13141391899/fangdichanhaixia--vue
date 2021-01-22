import request from '@/utils/request'
export function selectByPage(data) {
  return request({
    url: 'http://localhost:7001/fangdichanhaixia/bossInfo/selectByPage',
    method: 'post',
    data
  })
}
