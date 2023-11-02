import { Card, CardBody, CardFooter, Input, Typography } from '@material-tailwind/react'
import { useRef, useState, useEffect } from 'react'
import { secondsToMinutes, decodeBase64, isAxiosBadRequestError } from 'src/utils/utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { ErrorResponse } from 'src/types/utils.type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { markTempAccountConfirmAction } from 'src/redux/actions/tempAccountAction'
import { RootState } from 'src/redux/store'

export function ConfirmAccount() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let countdown: any // Đối tượng để theo dõi bộ đếm
  let remainingTime: number = 120 // Thời gian còn lại trong giây
  let counting = false // Trạng thái bộ đếm (đang đếm hay không)
  const { email } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const emailStore = useSelector((state: RootState) => state.rootReducer.tempAccountReducer.email)

  const inputRef = useRef<HTMLInputElement | null>(document.querySelector('confirm-code'))
  const [isEnale, setIsEnable] = useState<boolean>(false)
  const [code, setCode] = useState<string>('')
  const [isCounting, setIsCounting] = useState(false)
  const [errMsg, setErrMsg] = useState<string>('')

  const confirmAccountMutation = useMutation({
    mutationFn: (body: { email: string; code: string }) => authApi.confirmAccount(body),
    onSuccess: () => {
      dispatch(markTempAccountConfirmAction({ isConfirmed: true }))
      //navigate(routes.wellcome)
    },
    onError: (error) => {
      if (isAxiosBadRequestError<ErrorResponse>(error)) {
        const formError = error.response?.data
        if (formError) {
          setErrMsg(formError.message)
        }
      }
    }
  })

  const resendCodeMutation = useMutation({
    mutationFn: (email: string) => authApi.resendConfirmCode(email),
    onError: (error) => {
      if (isAxiosBadRequestError<ErrorResponse>(error)) {
        const formError = error.response?.data
        if (formError) {
          setErrMsg(formError.message)
        }
      }
    }
  })

  const handleConfirm = async () => {
    await confirmAccountMutation.mutateAsync({ email: email as string, code: code })
  }

  const handleResendCode = () => {
    resendCodeMutation.mutate(email as string)
    startCountdown(document.getElementById('resend') as HTMLButtonElement)
  }

  function startCountdown(yourButtonElement: HTMLButtonElement) {
    if (!counting) {
      counting = true
      setIsCounting(true)
      countdown = setInterval(function () {
        remainingTime--
        // Cập nhật giao diện của button
        if (remainingTime > 0) {
          // Cập nhật văn bản trên button
          yourButtonElement.textContent = `Gửi lại mã xác nhận (${secondsToMinutes(remainingTime)})`
        } else {
          // Dừng bộ đếm và khôi phục trạng thái ban đầu
          clearInterval(countdown)
          counting = false
          setIsCounting(false)
          yourButtonElement.textContent = 'Gửi lại mã xác nhận'
        }
      }, 1000) // Cứ mỗi giây làm cập nhật
    }
  }

  useEffect(() => {
    startCountdown(document.getElementById('resend') as HTMLButtonElement)
    if (email !== btoa(emailStore as string)) {
      navigate('/authenticate/' + btoa(emailStore as string))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (document.activeElement === inputRef.current) {
      setIsEnable(true)
    }
  })

  return (
    <div className='flex justify-center'>
      <Card className='mt-24 w-[600px]'>
        <CardBody>
          <Typography variant='h4' color='blue-gray' className='mb-1'>
            Nhập mã xác nhận
          </Typography>
          <Typography variant='paragraph' color='black'>
            Để xác nhận tài khoản, hãy nhập mã gồm 6 chữ số mà chúng tôi gửi đến: <br />
            <b className='font-bold'>{decodeBase64(email as string)}</b>.
          </Typography>
          <button
            className={`mt-2 p-[2px] cursor-text rounded-[6px] w-full duration-100 ${
              isEnale ? 'outline outline-blue-600' : ''
            } `}
            onClick={() => {
              setIsEnable(true)
              inputRef.current?.focus()
            }}
          >
            <div className='p-2 rounded border border-gray-400'>
              <Input
                inputRef={inputRef}
                color='blue'
                className={`border-none duration-300 ${isEnale || code !== '' ? 'mt-2' : ''}`}
                containerProps={{ className: '' }}
                labelProps={{
                  className: `after:border-none duration-300 focus:border-none before:border-none ${
                    isEnale || code !== '' ? 'mt-2' : ''
                  }`
                }}
                label='mã gồm 6 chữ số'
                size='md'
                id='confirm-code'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                crossOrigin={undefined}
                onBlur={() => setIsEnable(false)}
                maxLength={6}
              />
            </div>
          </button>
          {errMsg ? (
            <div className='ml-1 flex gap-2 text-red-700 items-center'>
              <FontAwesomeIcon color='red' icon={faTriangleExclamation} />
              {errMsg}
            </div>
          ) : (
            ''
          )}
          <button
            disabled={isCounting}
            onClick={handleResendCode}
            id='resend'
            className='text-[#1b74e4] text-sm mt-2 ml-1 font-[500] disabled:text-gray-600'
          >
            Gửi lại mã xác nhận
          </button>
        </CardBody>
        <CardFooter className='pt-0 flex gap-2'>
          <button
            type='submit'
            color='green'
            className='bg-[#e4e6eb] font-semibold text-black py-[0.4rem] px-[0.3rem] rounded-[0.4rem] w-1/2 hover:bg-gradient-to-b hover:bg-[#d8dadf]'
          >
            Cập nhật thông tin liên hệ
          </button>
          <button
            disabled={code.length !== 6}
            type='submit'
            color='green'
            className='bg-[#e4e6eb] enabled:bg-[#1b74e4] enabled:text-white font-semibold text-black py-[0.2rem] px-[0.3rem] rounded-[0.4rem] w-1/2 hover:bg-gradient-to-b hover:bg-[#d8dadf] disabled:opacity-40 disabled:hover:bg-[#e4e6eb] disabled:hover:cursor-not-allowed enabled:hover:bg-blue-900'
            onClick={handleConfirm}
          >
            Tiếp tục
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}
export default ConfirmAccount
