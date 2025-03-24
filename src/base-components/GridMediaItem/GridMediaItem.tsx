import React from 'react'
import { MediaTypeEnum } from 'src/constants/enum.ts'

interface PreviewImageProps {
  className?: string
  style?: React.CSSProperties // Để truyền các style tùy chỉnh
  alt?: string
  src: string
  type: MediaTypeEnum
}

const GridMediaItem: React.FC<PreviewImageProps> = ({ className, style, alt, src, type }) => {
  if (type === MediaTypeEnum.IMAGE) {
    return <img src={src} alt={alt} className={className} style={style} loading='lazy' />
  }

  return (
    <div className='relative'>
      <img src={src} className={className} style={style} alt={alt} loading='lazy' />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-[70px] h-[70px] border-4 border-gray-300 bg-transparent rounded-full cursor-default'>
        <span className='text-gray-300 text-4xl ml-2'>▶</span> {/* Ký hiệu nút Play */}
      </div>
    </div>
  )
}

export default GridMediaItem
