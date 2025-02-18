import { IconButton } from '@material-tailwind/react'

import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'
import { PreviewMediaContentType } from 'src/types/utils.type.ts'
import { MediaTypeEnum } from 'src/constants/enum.ts'
import { useEffect, useState } from 'react'

interface PreviewImageProps {
  previewMediaContent: PreviewMediaContentType
  mediaContent: File | null
  width?: string
  height?: string
  index: number
  handleRemoveMedia: (indexToRemove: number) => void
}

function PreviewMediaContent({
  previewMediaContent,
  mediaContent,
  width,
  height,
  handleRemoveMedia,
  index
}: PreviewImageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null)
  const isVideo = previewMediaContent.type === MediaTypeEnum.VIDEO

  const handleMouseEnter = () => {
    if (mediaContent && isVideo) {
      const blobUrl = URL.createObjectURL(mediaContent)
      setVideoBlobUrl(blobUrl) // Lưu trữ URL blob
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (videoBlobUrl) {
      URL.revokeObjectURL(videoBlobUrl) // Giải phóng URL blob
    }
    setIsHovered(false)
  }

  // Cleanup khi component unmount hoặc URL thay đổi
  useEffect(() => {
    return () => {
      if (videoBlobUrl) {
        URL.revokeObjectURL(videoBlobUrl)
      }
    }
  }, [videoBlobUrl])
  return (
    <div
      style={{
        backgroundImage: `url(${previewMediaContent.url})`,
        backgroundSize: 'cover',
        width: width, // Đảm bảo kích thước của container
        height: height, // Đảm bảo kích thước của container
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='w-full rounded-lg group'
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(10px)' // Điều chỉnh mức độ nhòe tại đây
        }}
        className='flex flex-col justify-center items-center'
      >
        {/* nút xóa */}
        <div className='absolute right-3 top-3 rounded-full z-10 hidden group-hover:block'>
          <IconButton
            color='blue-gray'
            className='h-[27px] w-[27px] bg-white rounded-full hover:bg-[#f2f2f2]'
            variant='text'
            onClick={() => handleRemoveMedia(index)}
          >
            <div
              style={{ backgroundImage: `url(${facebookIcon3})` }}
              className='bg-[length:190px_186px] bg-[-142px_-132px] h-4 w-4'
            ></div>
          </IconButton>
        </div>
        {/*{previewMediaContent.type === MediaTypeEnum.VIDEO ? (*/}
        {/*  <div></div>*/}
        {/*) : (*/}
        {/*  <img src={previewMediaContent.url} className=' h-[205px] object-cover' alt=''></img>*/}
        {/*)}*/}
        {isVideo ? (
          <>
            {!isHovered ? (
              <img src={previewMediaContent.url} className='h-[205px] object-cover' alt='Thumbnail' />
            ) : (
              <video
                className={`h-[205px] object-cover`}
                src={videoBlobUrl as string} // Sử dụng Blob URL video
                muted
                playsInline
                loop
                autoPlay={isHovered}
              />
            )}
          </>
        ) : (
          <img src={previewMediaContent.url} className='h-[205px] object-cover' alt='' />
        )}

        <div className='h-[130px] w-full bg-white rounded-b-lg p-2'>
          {/*  */}
          <div className='relative p-[2px]'>
            <input
              name='test'
              id='test'
              type='input'
              className='peer w-full h-[82px] border leading-5 border-[#9b9b9b] text-[17px] text-[#050505]
        p-1 pl-4 bg-transparent transition-colors rounded-lg placeholder:text-transparent focus:pb-1
        focus:outline-none focus:shadow-custom'
              placeholder='Chú thích'
            />
            <label
              htmlFor='test'
              className='left-4 top-3 text-[12px] peer-placeholder-shown:text-[16px] peer-placeholder-shown:cursor-text peer-placeholder-shown:top-[15px]
        peer-placeholder-shown:left-4 absolute block duration-200 text-[#9b9b9b] peer-focus:absolute peer-focus:top-3 peer-focus:duration-200
        peer-focus:text-[12px] peer-focus:text-[#0866ff]'
            >
              Chú thích
            </label>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  )
}

export default PreviewMediaContent
