import { Select, Option } from '@material-tailwind/react'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  initialValue: string
  listItem: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (value: any) => void
  name: string
  setOpenPopoverBirthday: React.Dispatch<React.SetStateAction<boolean>>
}

function MenuCustomList({ initialValue, listItem, handleChange, name, formik, setOpenPopoverBirthday }: Props) {
  return (
    <Select
      onClick={() => {
        formik.errors.birthDay && (formik.touched.day || formik.touched.month || formik.touched.year)
          ? setOpenPopoverBirthday(true)
          : setOpenPopoverBirthday(false)
      }}
      onBlur={formik.handleBlur}
      color='blue'
      className='border-none text-black '
      containerProps={{
        className: `${
          formik.errors.birthday && (formik.touched.day || formik.touched.month || formik.touched.year)
            ? 'border-red-400'
            : 'border-gray-400'
        } w-[120px] h-[35px] border text-base font-normal border capitalize tracking-normal rounded`
      }}
      labelProps={{ className: 'hidden' }}
      menuProps={{ className: 'max-h-[300px] p-0' }}
      value={initialValue}
      onChange={(value) => handleChange(value)}
      id={name}
      name={name}
    >
      {listItem.map((item) => (
        <Option
          value={item}
          className='text-black hover:text-white focus:text-white hover:bg-gray-800 focus:bg-gray-800'
          key={item}
        >
          {item}
        </Option>
      ))}
    </Select>
  )
}

export default MenuCustomList
