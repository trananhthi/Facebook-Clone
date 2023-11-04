import * as yup from 'yup'

export const userSchema = yup.object({
  id: yup.number(),
  email: yup
    .string()
    .matches(/^[A-Za-z0-9]{1,30}@[a-z0-9]{2,10}(\.[a-z0-9]{2,10}){1,3}$/, 'Vui lòng nhập lại địa chỉ email hợp lệ.')
    .required('Bạn sẽ sử dụng thông tin này khi đăng nhập và khi cần đặt lại mật khẩu.'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu của bạn')
    .min(6, 'Nhập mật khẩu có tối thiểu 6 ký tự có thể bao gồm số, chữ cái và dấu chấm câu (như ! và &).'),
  lastName: yup.string().required('Tên của bạn là gì?'),
  firstName: yup.string().required('Họ của bạn là gì?'),
  phone: yup.string(),
  birthday: yup
    .date()
    .max(new Date(2019, 1, 1), 'Hình như bạn đã nhập sai thông tin. Hãy nhớ dùng ngày sinh thật của mình nhé.')
    .required('Hình như bạn đã nhập sai thông tin. Hãy nhớ dùng ngày sinh thật của mình nhé.'),
  gender: yup.string().required('Vui lòng chọn giới tính. Bạn có thể chọn người có thể xem nội dung này sau.'),
  avatar: yup.string(),
  timeCreated: yup.date(),
  privacyDefault: yup.string()
})

export type User = yup.InferType<typeof userSchema>

export type UserInfor = Pick<
  User,
  'email' | 'lastName' | 'firstName' | 'phone' | 'birthday' | 'gender' | 'avatar' | 'timeCreated' | 'privacyDefault'
>
