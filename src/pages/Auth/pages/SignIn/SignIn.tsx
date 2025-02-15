import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { /* Link, */ useNavigate } from 'react-router-dom'
import routes from 'src/constants/routes'
import authApi from 'src/apis/auth.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import { Typography } from '@material-tailwind/react'
import SignUp from '../SignUp'
import { useDispatch } from 'react-redux'
import { updateTempAccountAction } from 'src/redux/actions/tempAccountAction'
import { setUserAccountAction } from 'src/redux/actions/userAccountAction'
import logoFacbook from 'src/assets/images/icon/logo_facbook.svg'
import { MessageCodes } from 'src/constants/messageCode'
import { UserInfo } from 'src/types/user.type'

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { setIsAuthenticated } = useContext(AppContext)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen((cur) => !cur)

  const signInAccountMutation = useMutation({
    mutationFn: (body: { email: string; password: string }) => authApi.signIn(body)
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    onSubmit: async (data) => {
      await signInAccountMutation.mutate(data, {
        onSuccess: (res) => {
          // Khi login thành công thì sẽ gọi api get profile
          // Query key của hàm invalidateQueries match với query key của useQuery trên => Gọi API trên
          if (res.data.accessToken === '') {
            dispatch(updateTempAccountAction({ email: data.email, password: data.password, isConfirmed: false }))
            navigate('/authenticate/' + res.data.key)
          } else {
            const userInfo = res.data.userInfo as UserInfo
            dispatch(setUserAccountAction(userInfo))
            setIsAuthenticated(true)
            navigate(routes.home)
          }
        },
        onError: (error) => {
          if (isAxiosBadRequestError<ErrorResponse>(error)) {
            // Kiểm tra lỗi có phải từ API trả về không
            const formError = error.response?.data
            if (formError && formError.key === MessageCodes.EMAIL_OR_PASSWORD_INCORRECT) {
              setErrorMessage(formError.message)
            }
          }
        }
      })
    }
  })

  return (
    <div className=' h-screen flex justify-center items-center max-900:items-start bg-[#f2f4f7]'>
      <div className='semi-md:flex-row flex flex-col justify-center items-start gap-10'>
        <div className='mt-8 lg:w-[500px] w-[350px] max-900:w-[400px] flex flex-col max-900:items-center'>
          <img src={logoFacbook} width={301} height={106} alt='Facebook' className='ms-[-28px]'></img>
          <div className='mt-[-1rem]'>
            <p className='font-sans lg:text-[28px] text-[20px] font-normal max-900:text-center max-900:text-[24px]'>
              Connect with friends and the world around you on Facebook.
            </p>
          </div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className='flex flex-col bg-white py-8 px-5 rounded-lg w-[400px] shadow-[0_8px_16px_0px_rgba(0,0,0,0.1)]'
        >
          <input
            type='text'
            id='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder='Email hoặc số điện thoại'
            className='border-[0.3px] border-solid border-[#e7d5d5] rounded-md outline-none px-[1rem] py-[0.65rem] mb-[0.8rem] text-[1.1rem] placeholder:text-[1.1rem] focus:border-[#1877f2]
              placeholder:focus:opacity-50 placeholder:text-[#757575]'
            required
          />
          <input
            type='password'
            placeholder='Mật khẩu'
            id='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            className='border-[0.3px] border-solid border-[#e7d5d5] rounded-md outline-none px-[1rem] py-[0.65rem] mb-[0.8rem] text-[1.1rem] placeholder:text-[1.1rem] focus:border-[#1877f2]
              placeholder:focus:opacity-50 placeholder:text-[#757575]'
            required
          />
          <Typography className={errorMessage === '' ? 'hidden' : '' + 'text-sm mb-2 ms-2'} color='red'>
            {errorMessage}
          </Typography>
          <button
            type='submit'
            className='bg-[#1877f2] px-[1rem] py-[0.5rem] rounded-[0.4rem] text-[1.3rem] text-white'
          >
            <b>Đăng nhập</b>
          </button>
          <p className='text-[#1877f2] text-center text-[0.9rem] pt-[0.8rem] hover:cursor-pointer hover:underline'>
            Quên mật khẩu ?
          </p>
          <hr className='bg-[#f7f7f7] m-[1rem] border-gray-300' />

          <div className='flex justify-center'>
            <button
              type='button'
              className='bg-[#06b909] text-white py-[0.6rem] px-[0.5rem] rounded-[0.4rem] mt-4'
              onClick={handleOpen}
            >
              <b className='mx-2'>Tạo tài khoản mới</b>
            </button>
          </div>
        </form>
        <SignUp open={open} handleOpen={handleOpen} />
      </div>
    </div>
  )
}

export default SignIn
