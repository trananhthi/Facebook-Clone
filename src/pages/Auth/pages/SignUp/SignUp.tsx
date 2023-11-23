import {
  Dialog,
  Card,
  DialogHeader,
  IconButton,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Popover,
  PopoverHandler,
  PopoverContent
} from '@material-tailwind/react'
import { useMutation } from '@tanstack/react-query'
import { /* Link, */ useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'

import { useDispatch } from 'react-redux/es/exports'
import { days, months, years } from 'src/constants/list'
import { useFormik } from 'formik'
import { useState } from 'react'
import MenuCustomList from 'src/components/MenuCustomList'
import { User, userSchema } from 'src/types/user.type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import './style.css'
import { isAxiosInternalServerError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { updateTempAccountAction } from 'src/redux/actions/tempAccountAction'

interface Props {
  open: boolean
  handleOpen: () => void
}

function SignUp({ open, handleOpen }: Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [gender, setGender] = useState<string>('male')
  const [openPopoverFirstName, setOpenPopoverFirstName] = useState<boolean>(false)
  const [openPopoverLastName, setOpenPopoverLastName] = useState<boolean>(false)
  const [openPopoverEmail, setOpenPopoverEmail] = useState<boolean>(false)
  const [openPopoverPassword, setOpenPopoverPassword] = useState<boolean>(false)
  const [openPopoverBirthday, setOpenPopoverBirthday] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [errorServer, setErrorServer] = useState<string>('')

  const signupMutation = useMutation({
    mutationFn: (body: Pick<User, 'email' | 'password' | 'lastName' | 'firstName' | 'birthday' | 'gender'>) =>
      authApi.signUp(body),
    onSuccess: (res, vars) => {
      if (res.status === 201) {
        dispatch(updateTempAccountAction({ email: vars.email, password: vars.password, isConfirmed: false }))
        navigate('/authenticate/' + res.data.key)
      }
    },
    onError: (error) => {
      if (isAxiosInternalServerError<ErrorResponse>(error)) {
        const formError = error.response?.data
        if (formError) {
          setErrorServer(formError.message)
        }
      }
    }
  })

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      birthday: new Date(),
      gender: gender
    },
    initialTouched: {
      firstName: false,
      lastName: false,
      email: false,
      password: false
    },
    validationSchema: userSchema,
    onSubmit: async (data) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { day, month, year, ...rest } = data
      await signupMutation.mutate(rest)
    }
  })

  return (
    <Dialog
      size='sm'
      open={open}
      handler={handleOpen}
      className='bg-transparent shadow-none'
      dismiss={{ enabled: false }}
    >
      <DialogHeader className='justify-between bg-white rounded-t-md w-full'>
        <div className=''>
          <Typography variant='h3' color='black'>
            Đăng ký
          </Typography>
          <Typography variant='small' className='opacity-75' color='black'>
            Nhanh chóng và dễ dàng
          </Typography>
        </div>
        <IconButton color='blue-gray' size='sm' variant='text' onClick={handleOpen}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </IconButton>
      </DialogHeader>
      <form onSubmit={formik.handleSubmit}>
        <Card className='mx-auto w-full max-w-[30rem] rounded-none rounded-b-md'>
          <hr className='border-gray-300'></hr>
          <CardBody className='flex flex-col gap-4 w-full'>
            <div className='flex gap-3 w-full'>
              {/* input first name */}
              <Popover
                open={openPopoverFirstName}
                dismiss={{ referencePress: true }}
                placement='bottom'
                offset={{ mainAxis: 15, crossAxis: -28 }}
                handler={setOpenPopoverFirstName}
              >
                <PopoverHandler
                  onKeyDown={(e: { key: string }) => {
                    if (e.key === ' ') {
                      formik.setFieldValue('firstName', formik.values.firstName + ' ')
                    }
                  }}
                  onClick={() => {
                    formik.errors.firstName && formik.touched.firstName
                      ? setOpenPopoverFirstName(true)
                      : setOpenPopoverFirstName(false)
                  }}
                >
                  <Input
                    color='blue'
                    containerProps={{ className: 'bg-[#f5f6f7]' }}
                    label='Họ'
                    size='md'
                    id='firstName'
                    name='firstName'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    crossOrigin={undefined}
                    onBlur={formik.handleBlur}
                    icon={
                      formik.errors.firstName && formik.touched.firstName ? (
                        <FontAwesomeIcon icon={faCircleExclamation} beat color='red' size='sm' />
                      ) : (
                        ''
                      )
                    }
                    error={formik.errors.firstName && formik.touched.firstName ? true : false}
                  />
                </PopoverHandler>
                <PopoverContent
                  onFocus={() => {
                    setErrorMsg(formik.errors.firstName as string)
                    document.getElementById('firstName')?.focus()
                  }}
                  className={`${
                    formik.errors.firstName ? '' : 'hidden'
                  } z-[99999] rounded py-3 border-none arrow_box-top-left text-white text-[0.8rem]`}
                >
                  {errorMsg ? errorMsg : ''}
                </PopoverContent>
              </Popover>
              {/* input last name */}
              <Popover
                open={openPopoverLastName}
                dismiss={{ referencePress: true }}
                placement='bottom'
                offset={{ mainAxis: 15, crossAxis: -28, alignmentAxis: 300 }}
                handler={setOpenPopoverLastName}
              >
                <PopoverHandler
                  onKeyDown={(e: { key: string }) => {
                    if (e.key === ' ') {
                      formik.setFieldValue('lastName', formik.values.lastName + ' ')
                    }
                  }}
                  onClick={() => {
                    formik.errors.lastName && formik.touched.lastName
                      ? setOpenPopoverLastName(true)
                      : setOpenPopoverLastName(false)
                  }}
                >
                  <Input
                    color='blue'
                    containerProps={{ className: 'bg-[#f5f6f7]' }}
                    label='Tên'
                    size='md'
                    id='lastName'
                    name='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    crossOrigin={undefined}
                    onBlur={formik.handleBlur}
                    icon={
                      formik.errors.lastName && formik.touched.lastName ? (
                        <FontAwesomeIcon icon={faCircleExclamation} beat color='red' size='sm' />
                      ) : (
                        ''
                      )
                    }
                    error={formik.errors.lastName && formik.touched.lastName ? true : false}
                  />
                </PopoverHandler>
                <PopoverContent
                  onFocus={() => {
                    setErrorMsg(formik.errors.lastName as string)
                    document.getElementById('lastName')?.focus()
                  }}
                  className={`${
                    formik.errors.lastName ? '' : 'hidden'
                  } z-[99999] rounded py-3 border-none arrow_box-top-left text-white text-[0.8rem]`}
                >
                  {errorMsg}
                </PopoverContent>
              </Popover>
            </div>
            {/* input email */}
            <Popover
              open={openPopoverEmail}
              dismiss={{ referencePress: true }}
              placement='left'
              offset={18}
              handler={setOpenPopoverEmail}
            >
              <PopoverHandler
                onClick={() => {
                  formik.errors.email && formik.touched.email ? setOpenPopoverEmail(true) : setOpenPopoverEmail(false)
                }}
              >
                <Input
                  color='blue'
                  containerProps={{ className: 'bg-[#f5f6f7]' }}
                  label='Email'
                  size='md'
                  id='my-email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  crossOrigin={undefined}
                  onBlur={formik.handleBlur}
                  icon={
                    formik.errors.email && formik.touched.email ? (
                      <FontAwesomeIcon icon={faCircleExclamation} beat color='red' size='sm' />
                    ) : (
                      ''
                    )
                  }
                  error={formik.errors.email && formik.touched.email ? true : false}
                />
              </PopoverHandler>
              <PopoverContent
                onFocus={() => {
                  setErrorMsg(formik.errors.email as string)
                  document.getElementById('my-email')?.focus()
                }}
                className='z-[99999] max-w-[320px] rounded py-3 border-none arrow_box-right text-white text-[0.8rem]'
              >
                {errorMsg}
              </PopoverContent>
            </Popover>
            {/* input password */}
            <Popover
              open={openPopoverPassword}
              dismiss={{ referencePress: true }}
              placement='left'
              offset={18}
              handler={setOpenPopoverPassword}
            >
              <PopoverHandler
                onClick={() => {
                  formik.errors.password && formik.touched.password
                    ? setOpenPopoverPassword(true)
                    : setOpenPopoverPassword(false)
                }}
              >
                <Input
                  color='blue'
                  containerProps={{ className: 'bg-[#f5f6f7]' }}
                  label='Mật khẩu'
                  size='md'
                  type='password'
                  id='my-password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  crossOrigin={undefined}
                  onBlur={formik.handleBlur}
                  icon={
                    formik.errors.password && formik.touched.password ? (
                      <FontAwesomeIcon icon={faCircleExclamation} beat color='red' size='sm' />
                    ) : (
                      ''
                    )
                  }
                  error={formik.errors.password && formik.touched.password ? true : false}
                />
              </PopoverHandler>
              <PopoverContent
                onFocus={() => {
                  setErrorMsg(formik.errors.password as string)
                  document.getElementById('my-password')?.focus()
                }}
                className='z-[99999] max-w-[300px] rounded py-3 border-none arrow_box-right text-white text-[0.8rem]'
              >
                {errorMsg}
              </PopoverContent>
            </Popover>

            <div className=''>
              <div className='flex justify-between'>
                <div className='flex items-center gap-1'>
                  <p className='text-[12px] text-gray-700'>Ngày sinh</p>
                  <Popover placement='left-start'>
                    <PopoverHandler>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        className='w-4 h-4 cursor-pointer'
                      >
                        <path
                          fillRule='evenodd'
                          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </PopoverHandler>
                    <PopoverContent className='z-[99999] max-w-[370px]'>
                      <div className='text-[13px]'>
                        <b>Cung cấp sinh nhật của bạn</b> giúp đảm bảo bạn có được trải nghiệm Facebook phù hợp với độ
                        tuổi của mình. Nếu bạn muốn thay đổi người nhìn thấy thông tin này, hãy đi tới phần Giới thiệu
                        trên trang cá nhân của bạn. Để biết thêm chi tiết, vui lòng truy cập vào{' '}
                        <span className='text-blue-600 hover:underline cursor-pointer'>Chính sách quyền riêng tư</span>{' '}
                        của chúng tôi.
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                {formik.errors.birthday && (formik.touched.day || formik.touched.month || formik.touched.year) ? (
                  <Popover
                    open={openPopoverBirthday}
                    dismiss={{ referencePress: true }}
                    placement='left'
                    offset={{ mainAxis: 400, crossAxis: 30 }}
                    handler={setOpenPopoverBirthday}
                  >
                    <PopoverHandler
                      onClick={() => {
                        formik.errors.birthday && (formik.touched.day || formik.touched.month || formik.touched.year)
                          ? setOpenPopoverBirthday(true)
                          : setOpenPopoverBirthday(false)
                      }}
                    >
                      <FontAwesomeIcon icon={faCircleExclamation} beat color='red' size='sm' />
                    </PopoverHandler>
                    <PopoverContent
                      onFocus={() => {
                        setErrorMsg(formik.errors.birthday as string)
                      }}
                      className='z-[99999] max-w-[300px] rounded py-3 border-none arrow_box-right text-white text-[0.8rem]'
                    >
                      {errorMsg}
                    </PopoverContent>
                  </Popover>
                ) : (
                  ''
                )}
              </div>

              <div className='flex gap-5'>
                <MenuCustomList
                  initialValue={formik.values.day.toString()}
                  listItem={days}
                  handleChange={(value) => {
                    formik.setFieldValue('day', parseInt(value))
                    formik.setFieldValue(
                      'birthday',
                      new Date(formik.values.year, formik.values.month - 1, parseInt(value))
                    )
                  }}
                  name='day'
                  formik={formik}
                  setOpenPopoverBirthday={setOpenPopoverBirthday}
                />
                <MenuCustomList
                  initialValue={'Tháng ' + formik.values.month.toString()}
                  listItem={months}
                  handleChange={(value) => {
                    formik.setFieldValue('month', parseInt(value.substring(5)))
                    formik.setFieldValue(
                      'birthday',
                      new Date(formik.values.year, parseInt(value.substring(5)) - 1, formik.values.day)
                    )
                  }}
                  name='month'
                  formik={formik}
                  setOpenPopoverBirthday={setOpenPopoverBirthday}
                />
                <MenuCustomList
                  initialValue={formik.values.year.toString()}
                  listItem={years}
                  handleChange={(value) => {
                    formik.setFieldValue('year', parseInt(value))
                    formik.setFieldValue(
                      'birthday',
                      new Date(parseInt(value), formik.values.month - 1, formik.values.day)
                    )
                  }}
                  name='year'
                  formik={formik}
                  setOpenPopoverBirthday={setOpenPopoverBirthday}
                />
              </div>
            </div>

            <div className=''>
              <div className='flex items-center gap-1'>
                <p className='text-[12px] text-gray-700'>Giới tính</p>
                <Popover placement='left-start'>
                  <PopoverHandler>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      className='w-4 h-4 cursor-pointer'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </PopoverHandler>
                  <PopoverContent className='z-[99999] max-w-[370px]'>
                    <div className='text-[13px]'>
                      Bạn có thể thay đổi người nhìn thấy giới tính của mình trên trang cá nhân vào lúc khác. Chọn Tùy
                      chỉnh nếu bạn thuộc giới tính khác hoặc không muốn tiết lộ.
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className='flex gap-5'>
                <label htmlFor='male' className='flex border border-gray-400 p-2 py-1 rounded'>
                  <span className='mr-12 text-black'>Nữ</span>
                  <input
                    type='radio'
                    id='male'
                    name='gender'
                    value='male'
                    checked={'male' === gender}
                    onChange={(e) => {
                      setGender('male')
                      formik.setFieldValue('gender', e.target.value)
                    }}
                  />
                </label>

                <label htmlFor='female' className='flex border border-gray-400 p-2 py-1 rounded'>
                  <span className='mr-12 text-black'>Nam</span>
                  <input
                    type='radio'
                    id='female'
                    name='gender'
                    value='female'
                    checked={'female' === gender}
                    onChange={(e) => {
                      setGender('female')
                      formik.setFieldValue('gender', e.target.value)
                    }}
                  />
                </label>

                <label htmlFor='unknown' className='flex border border-gray-400 p-2 py-1 rounded'>
                  <span className='mr-10 text-black'>Tùy chỉnh</span>
                  <input
                    type='radio'
                    id='unknown'
                    name='gender'
                    value='unknown'
                    checked={'unknown' === gender}
                    onChange={(e) => {
                      setGender('unknown')
                      formik.setFieldValue('gender', e.target.value)
                    }}
                  />
                </label>
              </div>
            </div>
            <div className=''>
              <p className='text-[11px]'>
                Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của bạn lên Facebook.{' '}
                <span className='text-blue-900 hover:underline cursor-pointer'>Tìm hiểu thêm</span>.
              </p>
              <p className='text-[11px] mt-2'>
                Bằng cách nhấp vào Đăng ký, bạn đồng ý với{' '}
                <span className='text-blue-900 hover:underline cursor-pointer'>Điều khoản</span>,{' '}
                <span className='text-blue-900 hover:underline cursor-pointer'>Chính sách quyền riêng tư</span> và{' '}
                <span className='text-blue-900 hover:underline cursor-pointer'>Chính sách cookie</span> của chúng tôi.
                Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.
              </p>
            </div>
          </CardBody>
          <CardFooter className='pt-0 flex flex-col w-full items-center'>
            {errorServer ? (
              <div className='ml-1 mb-2 flex gap-2 text-red-700 items-center'>
                <FontAwesomeIcon color='red' icon={faTriangleExclamation} />
                {errorServer}
              </div>
            ) : (
              ''
            )}
            <button
              type='submit'
              color='green'
              className='bg-[#00A400] text-white py-[0.2rem] px-[0.3rem] rounded-[0.4rem] w-1/2 hover:bg-gradient-to-b hover:from-green-400 hover:to-green-500'
            >
              <b className=' text-lg font-bold'>Đăng kí</b>
            </button>
          </CardFooter>
        </Card>
      </form>
    </Dialog>
  )
}

export default SignUp
