import SignIn from './pages/SignIn'
import { Helmet } from 'react-helmet-async'

function Auth() {
  return (
    <div>
      <Helmet>
        <title>Facebook - Đăng nhập hoặc đăng ký</title>
        <meta name='description' content='Đăng nhập để truy cập vào Facebook' />
      </Helmet>
      <SignIn />
    </div>
  )
}

export default Auth
