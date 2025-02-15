import React from 'react'

interface PreviewImageProps {
  className?: string
  style?: React.CSSProperties // Để truyền các style tùy chỉnh
  alt?: string
  src: string
}

const GridMediaItem: React.FC<PreviewImageProps> = ({ className, style, alt, src }) => {
  // Biểu thức chính quy để kiểm tra chuỗi base64
  const isBase64 = (str: string) => {
    const regex = /^data:image\/(png|jpeg|jpg|gif);base64,[A-Za-z0-9+/=]+$/
    return regex.test(str)
  }

  if (!isBase64(src)) {
    return <img src={src} alt={alt} className={className} style={style} />
  }

  return (
    <div className='relative'>
      <img src={src} className={className} style={style} alt={alt} />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-[70px] h-[70px] border-4 border-gray-300 bg-transparent rounded-full cursor-default'>
        <span className='text-gray-300 text-4xl ml-2'>▶</span> {/* Ký hiệu nút Play */}
      </div>
    </div>
  )
}

export default GridMediaItem
