// ** Mock Adapter
import mock from 'src/@fake-db/mock'

const searchData = [
 
  
  {
    id: 7,
    url: '/apps/invoice/list',
    icon: 'mdi:format-list-numbered',
    title: 'Invoice List',
    category: 'appsPages'
  },
  {
    id: 8,
    url: '/apps/invoice/preview',
    icon: 'mdi:file-document-outline',
    title: 'Invoice Preview',
    category: 'appsPages'
  },
  {
    id: 9,
    url: '/apps/invoice/edit',
    icon: 'mdi:file-document-edit-outline',
    title: 'Invoice Edit',
    category: 'appsPages'
  },
  {
    id: 10,
    url: '/apps/invoice/add',
    icon: 'mdi:file-plus-outline',
    title: 'Invoice Add',
    category: 'appsPages'
  },
  {
    id: 11,
    url: '/apps/user/list',
    icon: 'mdi:account-group',
    title: 'User List',
    category: 'appsPages'
  },
  {
    id: 12,
    url: '/apps/user/view/overview',
    icon: 'mdi:eye-outline',
    title: 'User View - Overview',
    category: 'appsPages'
  },
  {
    id: 13,
    url: '/apps/user/view/security',
    icon: 'mdi:lock-open-outline',
    title: 'User View - Security',
    category: 'appsPages'
  },
  {
    id: 14,
    url: '/apps/user/view/billing-plan',
    icon: 'mdi:currency-usd',
    title: 'User View - Billing & Plans',
    category: 'appsPages'
  },
  {
    id: 15,
    url: '/apps/user/view/notification',
    icon: 'mdi:bell-outline',
    title: 'User View - Notification',
    category: 'appsPages'
  },
  {
    id: 16,
    url: '/apps/user/view/connection',
    icon: 'mdi:link-variant',
    title: 'User View - Connection',
    category: 'appsPages'
  },
 
  {
    id: 19,
    url: '/pages/user-profile/profile',
    icon: 'mdi:card-account-details-outline',
    title: 'User Profile',
    category: 'appsPages'
  },
  {
    id: 20,
    url: '/pages/user-profile/teams',
    icon: 'mdi:account-group',
    title: 'User Profile - Teams',
    category: 'appsPages'
  },
  {
    id: 21,
    url: '/pages/user-profile/projects',
    icon: 'mdi:view-grid-outline',
    title: 'User Profile - Projects',
    category: 'appsPages'
  },
  {
    id: 22,
    url: '/pages/user-profile/connections',
    icon: 'mdi:link-variant',
    title: 'User Profile - Connections',
    category: 'appsPages'
  },
  {
    id: 23,
    url: '/pages/account-settings/account',
    icon: 'mdi:account-cog-outline',
    title: 'Account Settings',
    category: 'appsPages'
  },
  {
    id: 24,
    url: '/pages/account-settings/security',
    icon: 'mdi:lock-open-outline',
    title: 'Account Settings - Security',
    category: 'appsPages'
  },
  {
    id: 25,
    url: '/pages/account-settings/billing',
    icon: 'mdi:currency-usd',
    title: 'Account Settings - Billing',
    category: 'appsPages'
  },
  {
    id: 26,
    url: '/pages/account-settings/notifications',
    icon: 'mdi:bell-outline',
    title: 'Account Settings - Notifications',
    category: 'appsPages'
  },
  {
    id: 27,
    url: '/pages/account-settings/connections',
    icon: 'mdi:link-variant',
    title: 'Account Settings - Connections',
    category: 'appsPages'
  },
  {
    id: 28,
    url: '/pages/faq',
    icon: 'mdi:help-circle-outline',
    title: 'FAQ',
    category: 'appsPages'
  },
  
  {
    id: 31,
    url: '/pages/misc/coming-soon',
    icon: 'mdi:clock-outline',
    title: 'Coming Soon',
    category: 'appsPages'
  },
  {
    id: 32,
    url: '/pages/misc/under-maintenance',
    icon: 'mdi:cog-outline',
    title: 'Under Maintenance',
    category: 'appsPages'
  },
  {
    id: 33,
    url: '/pages/misc/404-not-found',
    icon: 'mdi:alert-circle-outline',
    title: 'Page Not Found - 404',
    category: 'appsPages'
  },
  {
    id: 34,
    url: '/pages/misc/401-not-authorized',
    icon: 'mdi:account-multiple-remove-outline',
    title: 'Not Authorized - 401',
    category: 'appsPages'
  },
  {
    id: 35,
    url: '/pages/misc/500-server-error',
    icon: 'mdi:server-off',
    title: 'Server Error - 500',
    category: 'appsPages'
  },
  {
    id: 36,
    url: '/pages/auth/login-v1',
    icon: 'mdi:login',
    title: 'Login V1',
    category: 'appsPages'
  },
  {
    id: 37,
    url: '/pages/auth/login-v2',
    icon: 'mdi:login',
    title: 'Login V2',
    category: 'appsPages'
  },
  {
    id: 38,
    url: '/pages/auth/login-with-appbar',
    icon: 'mdi:login',
    title: 'Login With AppBar',
    category: 'appsPages'
  },
  {
    id: 39,
    url: '/pages/auth/register-v1',
    icon: 'mdi:account-plus-outline',
    title: 'Register V1',
    category: 'appsPages'
  },
  {
    id: 40,
    url: '/pages/auth/register-v2',
    icon: 'mdi:account-plus-outline',
    title: 'Register V2',
    category: 'appsPages'
  },
  {
    id: 41,
    url: '/pages/auth/register-multi-steps',
    icon: 'mdi:account-plus-outline',
    title: 'Register Multi-Steps',
    category: 'appsPages'
  },
  {
    id: 42,
    icon: 'mdi:email-check-outline',
    category: 'appsPages',
    title: 'Verify Email V1',
    url: '/pages/auth/verify-email-v1'
  },
  {
    id: 43,
    icon: 'mdi:email-check-outline',
    category: 'appsPages',
    title: 'Verify Email V2',
    url: '/pages/auth/verify-email-v2'
  },
  {
    id: 44,
    url: '/pages/auth/forgot-password-v1',
    icon: 'mdi:lock-alert-outline',
    title: 'Forgot Password V1',
    category: 'appsPages'
  },
  {
    id: 45,
    url: '/pages/auth/forgot-password-v2',
    icon: 'mdi:lock-alert-outline',
    title: 'Forgot Password V2',
    category: 'appsPages'
  },
  {
    id: 46,
    url: '/pages/auth/reset-password-v1',
    icon: 'mdi:lock-reset',
    title: 'Reset Password V1',
    category: 'appsPages'
  },
  {
    id: 47,
    url: '/pages/auth/reset-password-v2',
    icon: 'mdi:lock-reset',
    title: 'Reset Password V2',
    category: 'appsPages'
  },
  {
    id: 48,
    icon: 'mdi:cellphone-link',
    category: 'appsPages',
    title: 'Two Steps V1',
    url: '/pages/auth/two-steps-v1'
  },
  {
    id: 49,
    icon: 'mdi:cellphone-link',
    category: 'appsPages',
    title: 'Two Steps V2',
    url: '/pages/auth/two-steps-v2'
  },
  {
    id: 50,
    icon: 'mdi:cart-outline',
    category: 'appsPages',
    title: 'Wizard - Checkout',
    url: '/pages/wizard-examples/checkout'
  },
  {
    id: 51,
    category: 'appsPages',
    icon: 'mdi:office-building-outline',
    title: 'Wizard - Property Listing',
    url: '/pages/wizard-examples/property-listing'
  },
  {
    id: 52,
    icon: 'mdi:gift-outline',
    category: 'appsPages',
    title: 'Wizard - Create Deal',
    url: '/pages/wizard-examples/create-deal'
  },
  {
    id: 53,
    url: '/pages/dialog-examples',
    icon: 'mdi:vector-arrange-below',
    title: 'Dialog Examples',
    category: 'appsPages'
  },
  {
    id: 54,
    url: '/ui/typography',
    icon: 'mdi:format-letter-case',
    title: 'Typography',
    category: 'userInterface'
  }
]

// ** GET Search Data
mock.onGet('/app-bar/search').reply(config => {
  const { q = '' } = config.params
  const queryLowered = q.toLowerCase()

  const exactData = {
  
    appsPages: [],
    userInterface: [],
   
  }

  const includeData = {

    appsPages: [],
    userInterface: [],

  }
  searchData.forEach(obj => {
    const isMatched = obj.title.toLowerCase().startsWith(queryLowered)
    if (isMatched && exactData[obj.category].length < 5) {
      exactData[obj.category].push(obj)
    }
  })
  searchData.forEach(obj => {
    const isMatched =
      !obj.title.toLowerCase().startsWith(queryLowered) && obj.title.toLowerCase().includes(queryLowered)
    if (isMatched && includeData[obj.category].length < 5) {
      includeData[obj.category].push(obj)
    }
  })
  const categoriesCheck = []
  Object.keys(exactData).forEach(category => {
    if (exactData[category].length > 0) {
      categoriesCheck.push(category)
    }
  })
  if (categoriesCheck.length === 0) {
    Object.keys(includeData).forEach(category => {
      if (includeData[category].length > 0) {
        categoriesCheck.push(category)
      }
    })
  }
  const resultsLength = categoriesCheck.length === 1 ? 5 : 3

  return [
    200,
    [
      ...exactData.appsPages.concat(includeData.appsPages).slice(0, resultsLength),
      ...exactData.userInterface.concat(includeData.userInterface).slice(0, resultsLength),
    ]
  ]
})
