const routes = {
  home: '/home',
  login: '/',
  confirmAccount: '/authenticate/:email',
  friend: '/friend',
  group: '/groups/feed'
} as const

export default routes
