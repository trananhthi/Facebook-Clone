import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { /* Link, */ useNavigate } from 'react-router-dom'
import routes from 'src/constants/routes'
import authApi from 'src/apis/auth.api'
import userAccountApi from 'src/apis/userAccount.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import { Typography } from '@material-tailwind/react'
import SignUp from '../SignUp'
import { useDispatch } from 'react-redux'
import { updateTempAccountAction } from 'src/redux/actions/tempAccountAction'
import { setUserAccountAction } from 'src/redux/actions/userAccountAction'

function SignIn() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { setIsAuthenticated } = useContext(AppContext)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen((cur) => !cur)

  const signInAccountMutation = useMutation({
    mutationFn: (body: { email: string; password: string }) => authApi.signIn(body)
  })

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => userAccountApi.getUserInfor(),
    enabled: signInAccountMutation.isSuccess,
    onSuccess: (data) => {
      const profile = data.data
      dispatch(setUserAccountAction(profile))
      setIsAuthenticated(true)
      navigate(routes.home)
    },
    onError: (error) => {
      console.log(error)
    }
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
            queryClient.invalidateQueries({
              queryKey: ['profile']
            })
          }
        },
        onError: (error) => {
          if (isAxiosBadRequestError<ErrorResponse>(error)) {
            // Kiểm tra lỗi có phải từ API trả về không
            const formError = error.response?.data
            if (formError && formError.errorKey === 'EmailOrPasswordInValid') {
              setErrorMessage(formError.message)
            }
          }
        }
      })
    }
  })

  return (
    <div className=' h-screen flex justify-center items-center bg-[#f2f4f7]'>
      <div className='content'>
        <div className='flex justify-center items-start'>
          <div className='me-[3rem] mt-8'>
            <img
              src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg'
              width={301}
              height={106}
              alt='Facebook'
              className='ms-[-28px]'
            ></img>
            <div className='w-[500px] mt-[-1rem]'>
              <p className='font-sans text-[28px] font-normal'>
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
            {!profileQuery.isInitialLoading && (
              <button
                type='submit'
                className='bg-[#1877f2] px-[1rem] py-[0.5rem] rounded-[0.4rem] text-[1.3rem] text-white'
              >
                <b>Đăng nhập</b>
              </button>
            )}
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
    </div>
  )
}

export default SignIn
