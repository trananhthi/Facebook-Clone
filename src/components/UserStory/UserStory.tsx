import { useState } from 'react'
import { Avatar } from '@material-tailwind/react'
import defaultAva from 'src/assets/images/default_avatar.png'
import { average } from 'color.js'

interface Props {
  url: string
}

function UserStory({ url }: Props) {
  const [bgColor, setBgColor] = useState<string>('')
  average(url, { format: 'hex' }).then((color) => {
    setBgColor(color.toString())
  })

  return (
    <div className='flex h-[250px] w-[141px]' style={{ backgroundColor: bgColor, borderRadius: '8px' }}>
      <div className='flex justify-center items-center absolute bg-white rounded-full h-10 w-10 mt-3 ml-3'>
        <Avatar variant='circular' size='sm' alt='avatar' className='h-8 w-8 justify-items-center' src={defaultAva} />
      </div>

      <div
        className={`h-[250px] w-[141px] bg-contain bg-center bg-no-repeat
              `}
        style={{ backgroundImage: `url(${url})` }}
      ></div>

      <div className='h-[250px] w-[141px] absolute flex items-end justify-start ml-4'>
        <span className='font-semibold text-[13px] mb-2 text-white'>Tin của bạn</span>
      </div>
    </div>
  )
}

export default UserStory
