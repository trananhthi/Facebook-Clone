import { IconButton } from '@material-tailwind/react'
import React, { ChangeEvent } from 'react'

/* import images */
import facebookIcon10 from 'src/assets/images/icon-pack/facbook_icon_10.png'
import facebookIcon11 from 'src/assets/images/icon-pack/facbook_icon_11.png'
import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'
import GridGallery from 'src/components/GridMediaGallery'
import { snapImage } from 'src/utils/utils'
import { PreviewMediaContentType } from 'src/types/media.type.ts'
import { MediaTypeEnum } from 'src/constants/enum.ts'

interface Props {
  openAddMediaContent: boolean
  mediaContentMap: Map<File, { preview: PreviewMediaContentType; visualIndex: number }>
  setMediaContentMap: React.Dispatch<
    React.SetStateAction<Map<File, { preview: PreviewMediaContentType; visualIndex: number }>>
  >
  fileInputRef: React.MutableRefObject<null>
  handleCloseSelectMediaContent: () => void
  setOpenEditMediaContent: React.Dispatch<React.SetStateAction<boolean>>
}

function AddMediaContent({
  openAddMediaContent,
  mediaContentMap,
  setMediaContentMap,
  fileInputRef,
  handleCloseSelectMediaContent,
  setOpenEditMediaContent
}: Props) {
  const sortedMediaArray = React.useMemo(
    () =>
      Array.from(mediaContentMap.entries()).sort(
        (a, b) => (a[1].preview.visualIndex ?? Infinity) - (b[1].preview.visualIndex ?? Infinity)
      ),
    [mediaContentMap]
  )
  // Xử lý khi người dùng chọn ảnh/video
  const handleAddMedia = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files.length > 0) {
      const newMediaMap = new Map(mediaContentMap)
      const currentIndex = newMediaMap.size // Bắt đầu index từ vị trí hiện tại

      const promises = Array.from(files).map((file, index) => {
        return new Promise<void>((resolve) => {
          const visualIndex = currentIndex + index // Gán index theo thứ tự chọn

          if (file.type.includes('image')) {
            newMediaMap.set(file, {
              preview: { url: URL.createObjectURL(file), type: MediaTypeEnum.IMAGE, visualIndex: visualIndex },
              visualIndex
            })
            resolve()
          } else {
            const url = URL.createObjectURL(file)
            const video = document.createElement('video')

            video.addEventListener('loadeddata', () => {
              snapImage(video, url).then((thumbNail) => {
                if (thumbNail != null) {
                  newMediaMap.set(file, {
                    preview: { url: thumbNail, type: MediaTypeEnum.VIDEO, visualIndex: visualIndex },
                    visualIndex
                  })
                }
                resolve()
              })
            })

            video.src = url
            video.muted = true
            video.playsInline = true
            video.preload = 'metadata'
            video.play()
          }
        })
      })

      await Promise.all(promises)
      setMediaContentMap(newMediaMap)
    }
  }
  console.log(mediaContentMap)
  return (
    <div className={`border border-gray-300 p-2 rounded-lg mt-6 ${openAddMediaContent ? '' : 'hidden'}`}>
      {/* nút tắt */}
      <div className='absolute ml-[413px] mt-2 border border-gray-300 rounded-full z-10'>
        <IconButton
          color='blue-gray'
          className='h-[30px] w-[30px] bg-white rounded-full hover:bg-[#f2f2f2]'
          variant='text'
          onClick={handleCloseSelectMediaContent}
        >
          <div
            style={{ backgroundImage: `url(${facebookIcon3})` }}
            className='bg-[length:190px_186px] bg-[-142px_-132px] h-4 w-4 opacity-60'
          ></div>
        </IconButton>
      </div>
      {/*  */}

      {mediaContentMap.size > 0 ? (
        <>
          <div className='relative z-10'>
            {/*BEGIN: edit button */}
            <button
              onClick={() => setOpenEditMediaContent(true)}
              disabled={mediaContentMap.size === 1}
              className={`bg-white absolute rounded-md px-[10px] py-[6px] flex gap-1 items-center justify-center mt-2 ml-2 ${
                mediaContentMap.size === 1 ? 'hidden' : ''
              } hover:bg-gray-200`}
            >
              <div
                className='bg-[length:26px_606px] bg-[0px_-488px] h-4 w-4'
                style={{ backgroundImage: `url(${facebookIcon11})` }}
              ></div>
              <span className='text-[15px] leading-5 text-[#050505] font-semibold'>Chỉnh sửa</span>
            </button>

            {/*END: edit button */}

            {/*BEGIN: add more button */}
            <div className='group'>
              <button
                className={`bg-white absolute rounded-md px-[10px] py-[6px] flex gap-1 items-center justify-center mt-2 ${
                  mediaContentMap.size === 1 ? 'ml-[10px]' : 'ml-[130px]'
                } group-hover:bg-gray-200`}
              >
                <div
                  className='bg-[length:26px_606px] bg-[0px_-506px] h-4 w-4'
                  style={{ backgroundImage: `url(${facebookIcon11})` }}
                ></div>
                <span className='text-[15px] leading-5 text-[#050505] font-semibold'>Thêm ảnh/video</span>
              </button>
              <input
                ref={fileInputRef}
                type='file'
                title=''
                accept='image/*, video/*, .mkv'
                onChange={handleAddMedia}
                className={`w-[154px] h-[32px] opacity-0 absolute mt-2 ${
                  mediaContentMap.size === 1 ? 'ml-[10px]' : 'ml-[130px]'
                } cursor-pointer rounded-lg file:cursor-pointer`}
                multiple
              />
            </div>

            {/*END: add more button */}
          </div>

          {/*BEGIN: show preview image */}
          <div className='z-0'>
            <GridGallery
              listMedia={sortedMediaArray.map(([, { preview }]) => ({
                id: 'new',
                postId: 'new',
                size: 0,
                url: preview.url,
                type: preview.type,
                visualIndex: preview.visualIndex,
                height: 0,
                width: 0
              }))}
              type='edit'
            />
          </div>
          {/*END: show preview image */}
        </>
      ) : (
        <div className='group'>
          <div className='w-[450px] h-[183px] absolute cursor-pointer flex flex-col justify-center items-center gap-1 bg-[#f7f8fa] rounded-lg group-hover:bg-[#eaebed]'>
            {/* icon và chữ */}
            <div className='p-[10px] rounded-full bg-[#e4e6eb] group-hover:bg-[#d8dadf]'>
              <div
                className='bg-[length:38px_122px] bg-[0px_-64px] h-5 w-5'
                style={{ backgroundImage: `url(${facebookIcon10})` }}
              ></div>
            </div>
            <span className='text-[#050505] text-[17px] leading-5 font-normal'>Thêm ảnh/video</span>
            <span className='text-[#65676b] text-[12px] leading-4 font-normal'>hoặc Kéo và thả</span>
            {/*  */}
          </div>
          {/* input file */}
          <input
            ref={fileInputRef}
            type='file'
            title=''
            accept='image/*, video/*, .mkv'
            onChange={handleAddMedia}
            className='w-[450px] h-[183px] opacity-0 cursor-pointer rounded-lg file:cursor-pointer'
            multiple
          />
        </div>
      )}
    </div>
  )
}

export default AddMediaContent
