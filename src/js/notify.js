import '@pnotify/core/dist/BrightTheme.css'
import '@pnotify/core/dist/PNotify.css'

import { error, info } from '../../node_modules/@pnotify/core/dist/PNotify.js'
import { defaults } from '@pnotify/core'
setNotifySettings()
function setNotifySettings() {
  defaults.delay = 2000
  defaults.stack.dir1 = 'up'
  defaults.stack.dir2 = 'right'
  defaults.mode = 'light'
  defaults.firstpos1 = 25
  defaults.firstpos2 = 25
  defaults.spacing1 = 36
  defaults.spacing2 = 36
  defaults.push = 'bottom'
  defaults.context = document.body
  defaults.positioned = true
}
