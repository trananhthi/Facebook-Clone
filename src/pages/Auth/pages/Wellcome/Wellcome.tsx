import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import authApi from 'src/apis/auth.api'
import userAccountApi from 'src/apis/userAccount.api'
import logo from 'src/assets/images/logo.png'
import routes from 'src/constants/routes'
import { clearTempAccountAction } from 'src/redux/actions/tempAccountAction'
import { RootState } from 'src/redux/store'
import { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useNavigate } from 'react-router-dom'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { setUserAccountAction } from 'src/redux/actions/userAccountAction'
import { MessageCodes } from 'src/constants/messageCode.ts'

function Wellcome() {
  const text = 'Wellcome to facebook'
  const queryClient = useQueryClient()
  const tempAccount = useSelector((state: RootState) => state.rootReducer.tempAccountReducer)
  const dispatch = useDispatch()
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const signInAccountMutation = useMutation({
    mutationFn: (body: { email: string; password: string }) => authApi.signIn(body)
  })

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => userAccountApi.getUserInfor(),
    enabled: signInAccountMutation.isSuccess
  })

  useEffect(() => {
    if (profileQuery.isSuccess) {
      dispatch(clearTempAccountAction())
      const profile = profileQuery.data.data
      dispatch(setUserAccountAction(profile))
      setIsAuthenticated(true)
      navigate(routes.home)
    }
  }, [profileQuery])

  const handleCont = () => {
    signInAccountMutation.mutate(
      { email: tempAccount.email as string, password: tempAccount.password as string },
      {
        onSuccess: () => {
          // Khi login thành công thì sẽ gọi api get profile
          // Query key của hàm invalidateQueries match với query key của useQuery trên => Gọi API trên
          queryClient.invalidateQueries({
            queryKey: ['profile']
          })
        },
        onError: (error) => {
          if (isAxiosBadRequestError<ErrorResponse>(error)) {
            // Kiểm tra lỗi có phải từ API trả về không
            const formError = error.response?.data
            if (formError && formError.key === MessageCodes.EMAIL_OR_PASSWORD_INCORRECT) {
              console.log(error)
            }
          }
        }
      }
    )
  }
  return (
    <div className='flex justify-center'>
      <Card className='mt-24 w-[600px]'>
        <CardBody>
          {/* <Typography variant='h4' color='blue-gray' className='mb-1'>
            Nhập mã xác nhận
          </Typography> */}
          <div className='flex justify-center items-center gap-3'>
            <img src={logo} alt='icon' className='w-10 h-10 ml-4 animate-slide-in-left' />
            <h1 className='overflow-hidden text-2xl font-bold leading-6 text-blue-500'>
              {text.match(/./gu)!.map((char, index) => (
                <span
                  className='animate-text-reveal inline-block [animation-fill-mode:backwards]'
                  key={`${char}-${index}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
          </div>
          <Typography variant='paragraph' color='black' className='mt-2'>
            Tài khoản <b className='font-bold'>{tempAccount.email}</b> của bạn đã xác nhận thành công. Bây giờ bạn có
            thể trải nghiệm mạng xã hội đầy thú vị
          </Typography>
        </CardBody>
        <CardFooter className='pt-0 flex justify-center'>
          <button
            type='submit'
            color='green'
            onClick={handleCont}
            className='bg-[#1b74e4] text-white font-semibold py-[0.2rem] px-[0.3rem] rounded-[0.4rem] w-1/3 hover:bg-blue-900'
          >
            Tiếp tục
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Wellcome
