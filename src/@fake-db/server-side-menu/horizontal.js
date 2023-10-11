// ** Mock Adapter
import mock from 'src/@fake-db/mock'

const navigation = [
  {
    icon: 'mdi:apps',
    title: 'Apps',
    children: [
      {
        title: 'User',
        icon: 'mdi:account-outline',
        children: [
          {
            title: 'List',
            path: '/apps/user/list'
          },
          {
            title: 'View',
            children: [
              {
                title: 'Overview',
                path: '/apps/user/view/overview'
              },
              {
                title: 'Security',
                path: '/apps/user/view/security'
              },
              {
                title: 'Billing & Plans',
                path: '/apps/user/view/billing-plan'
              },
              {
                title: 'Notifications',
                path: '/apps/user/view/notification'
              },
              {
                title: 'Connection',
                path: '/apps/user/view/connection'
              }
            ]
          }
        ]
      }
    ]
  },

  {
    icon: 'mdi:file-document-outline',
    title: 'Pages',
    children: [
      {
        title: 'User Profile',
        icon: 'mdi:card-account-details-outline',
        children: [
          {
            title: 'Profile',
            path: '/pages/user-profile/profile'
          },
          {
            title: 'Teams',
            path: '/pages/user-profile/teams'
          },
          {
            title: 'Projects',
            path: '/pages/user-profile/projects'
          },
          {
            title: 'Connections',
            path: '/pages/user-profile/connections'
          }
        ]
      },
      {
        icon: 'mdi:account-cog-outline',
        title: 'Account Settings',
        children: [
          {
            title: 'Account',
            path: '/pages/account-settings/account'
          },
          {
            title: 'Security',
            path: '/pages/account-settings/security'
          },
          {
            title: 'Billing',
            path: '/pages/account-settings/billing'
          },
          {
            title: 'Notifications',
            path: '/pages/account-settings/notifications'
          },
          {
            title: 'Connections',
            path: '/pages/account-settings/connections'
          }
        ]
      },

      {
        title: 'Miscellaneous',
        icon: 'mdi:file-outline',
        children: [
          {
            openInNewTab: true,
            title: 'Coming Soon',
            path: '/pages/misc/coming-soon'
          },
          {
            openInNewTab: true,
            title: 'Under Maintenance',
            path: '/pages/misc/under-maintenance'
          },
          {
            openInNewTab: true,
            title: 'Page Not Found - 404',
            path: '/pages/misc/404-not-found'
          },
          {
            openInNewTab: true,
            title: 'Not Authorized - 401',
            path: '/pages/misc/401-not-authorized'
          },
          {
            openInNewTab: true,
            title: 'Server Error - 500',
            path: '/pages/misc/500-server-error'
          }
        ]
      },
      {
        title: 'Auth Pages',
        icon: 'mdi:lock-outline',
        children: [
          {
            title: 'Login',
            children: [
              {
                openInNewTab: true,
                title: 'Login v1',
                path: '/pages/auth/login-v1'
              },
              {
                openInNewTab: true,
                title: 'Login v2',
                path: '/pages/auth/login-v2'
              },
              {
                openInNewTab: true,
                title: 'Login With AppBar',
                path: '/pages/auth/login-with-appbar'
              }
            ]
          },
          {
            title: 'Register',
            children: [
              {
                openInNewTab: true,
                title: 'Register v1',
                path: '/pages/auth/register-v1'
              },
              {
                openInNewTab: true,
                title: 'Register v2',
                path: '/pages/auth/register-v2'
              },
              {
                openInNewTab: true,
                title: 'Register Multi-Steps',
                path: '/pages/auth/register-multi-steps'
              }
            ]
          },
          {
            title: 'Verify Email',
            children: [
              {
                openInNewTab: true,
                title: 'Verify Email v1',
                path: '/pages/auth/verify-email-v1'
              },
              {
                openInNewTab: true,
                title: 'Verify Email v2',
                path: '/pages/auth/verify-email-v2'
              }
            ]
          },
          {
            title: 'Forgot Password',
            children: [
              {
                openInNewTab: true,
                title: 'Forgot Password v1',
                path: '/pages/auth/forgot-password-v1'
              },
              {
                openInNewTab: true,
                title: 'Forgot Password v2',
                path: '/pages/auth/forgot-password-v2'
              }
            ]
          },
          {
            title: 'Reset Password',
            children: [
              {
                openInNewTab: true,
                title: 'Reset Password v1',
                path: '/pages/auth/reset-password-v1'
              },
              {
                openInNewTab: true,
                title: 'Reset Password v2',
                path: '/pages/auth/reset-password-v2'
              }
            ]
          },
          {
            title: 'Two Steps',
            children: [
              {
                openInNewTab: true,
                title: 'Two Steps v1',
                path: '/pages/auth/two-steps-v1'
              },
              {
                openInNewTab: true,
                title: 'Two Steps v2',
                path: '/pages/auth/two-steps-v2'
              }
            ]
          }
        ]
      },
      {
        title: 'Wizard Examples',
        icon: 'mdi:transit-connection-horizontal',
        children: [
          {
            title: 'Checkout',
            path: '/pages/wizard-examples/checkout'
          },
          {
            title: 'Property Listing',
            path: '/pages/wizard-examples/property-listing'
          },
          {
            title: 'Create Deal',
            path: '/pages/wizard-examples/create-deal'
          }
        ]
      }
    ]
  }
]
mock.onGet('/api/horizontal-nav/data').reply(() => {
  return [200, navigation]
})
