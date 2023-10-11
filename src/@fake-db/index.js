import mock from './mock'

import './auth/jwt'

import './pages/faq'

import './apps/invoice'
import './autocomplete'
import './apps/userList'

import './pages/profile'
import './iconify-icons'
import './app-bar-search'

import './server-side-menu/vertical'
import './server-side-menu/horizontal'

mock.onAny().passThrough()
