import defaultSettings from '@/settings'

const title = defaultSettings.title || '大吉大利'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
