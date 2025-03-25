import { useEffect, useState } from 'react'
import { Avatar } from '@material-tailwind/react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { getAverageColor } from 'src/utils/utils.ts'

interface Props {
  url: string
}

function UserStory({ url }: Props) {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)

  const [bgColor, setBgColor] = useState<string>('')
  useEffect(() => {
    if (url) {
      getAverageColor(url)
        .then(setBgColor)
        .catch((error) => {
          console.error('Error extracting color:', error)
          // Fallback color nếu không thể trích xuất
          setBgColor('rgb(200,200,200)')
        })
    }
  }, [url])

  return (
    <div className='flex h-[250px] w-[141px] relative' style={{ backgroundColor: bgColor, borderRadius: '8px' }}>
      <div className='flex justify-center items-center absolute bg-white rounded-full h-10 w-10 mt-3 ml-3'>
        <Avatar
          variant='circular'
          size='sm'
          alt='avatar'
          className='h-8 w-8 justify-items-center'
          src={userAccount.avatar}
        />
      </div>

      <div
        className={`h-[250px] w-[141px] bg-contain bg-center bg-no-repeat
              `}
        style={{ backgroundImage: `url(${url})` }}
      ></div>

      <div className='h-[250px] w-[141px] absolute flex items-end justify-start'>
        <span className='font-semibold text-[13px] mb-2 text-white ml-4'>Tin của bạn</span>
      </div>
    </div>
  )
}

export default UserStory
