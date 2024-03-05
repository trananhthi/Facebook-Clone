const routes = {
  home: '/home',
  login: '/',
  confirmAccount: '/authenticate/:email',
  friend: '/friend',
  group: '/groups/feed',

  // Profile
  profile: '/profile',

  //messenger
  messenger: '/messenger/:roomId?'
} as const

export default routes
