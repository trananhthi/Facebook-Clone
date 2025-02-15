export const MessageCodes = {
  ENDPOINT_NOTFOUND: 'endpoint.notFound',
  EMAIL_EXISTED: 'email.existed',
  SIGNUP_SUCCESS: 'signup.success',
  SIGNUP_FAILED: 'signup.failed',
  LACKOF_EMAIL_OR_PASSWORD: 'lackof.email.or.password',
  EMAIL_NOTCONFIRMED: 'email.notConfirmed',
  EMAIL_OR_PASSWORD_INCORRECT: 'email.or.password.incorrect',
  REFRESH_TOKEN_ISINEXISTENT: 'refresh.token.isinexistent',
  UNKNOWN_ERROR: 'unknown.error',
  ACCOUNT_NOTEXIST: 'account.notExist',
  ACCOUNT_EMAILCONFIRMED: 'account.emailConfirmed',
  RESEND_CONFIRMCODE_SUCCESS: 'resend.confirmcode.success',
  CONFIRMCODE_EXPIRED: 'confirmcode.expired',
  CONFIRMCODE_INCORRECT: 'confirmcode.incorrect',
  ACCOUNT_CONFIRMATION_SUCCESS: 'account.confirmation.success',
  SOMETHING_WRONG: 'something.wrong',
  POST_NOTFOUND: 'post.notFound',
  USER_NOTFOUND: 'user.notFound',
  PRIVACY_NOTVALID: 'privacy.notValid',
  USERPOST_NOTFOUND: 'userPost.notFound',
  USERPOST_NOTBELONG: 'userPost.notBelong',
  CHATROOM_NOTFOUND: 'chatroom.notFound'
} as const

export type MessageCodeType = keyof typeof MessageCodes
