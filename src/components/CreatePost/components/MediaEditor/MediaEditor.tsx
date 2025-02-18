import { DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react'

/* import images */
import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'
import addImageBlueIcon from 'src/assets/images/icon/Add-Image-Blue-Icon.png'
import null_states_media_gray_wash from 'src/assets/images/icon/null_states_media_gray_wash.svg'
import React, { ChangeEvent, useEffect } from 'react'
import { snapImage } from 'src/utils/utils'
import PreviewMediaContent from 'src/base-components/PreviewMediaContent'
import { PreviewMediaContentType } from 'src/types/utils.type.ts'
import { MediaTypeEnum } from 'src/constants/enum.ts'

interface Props {
  setOpenEditImage: React.Dispatch<React.SetStateAction<boolean>>
  curDialogRef: React.MutableRefObject<null>
  mediaContentMap: Map<File, { preview: PreviewMediaContentType; visualIndex: number }>
  setMediaContentMap: React.Dispatch<
    React.SetStateAction<Map<File, { preview: PreviewMediaContentType; visualIndex: number }>>
  >
  setWidth: React.Dispatch<React.SetStateAction<string>>
}

const MediaEditor = ({ setOpenEditImage, curDialogRef, mediaContentMap, setMediaContentMap, setWidth }: Props) => {
  const handleCancel = () => {
    //setStartAnimationClosePrivacyDialog(true)
    setOpenEditImage(false)
  }

  const calculateWidth = (length: number) => {
    if (length === 0) {
      return 'w-[500px]'
    } else if (length === 1 || length === 2) {
      return 'w-[680px]'
    } else if (length > 4) {
      return 'w-[1220px]'
    } else {
      return 'w-[900px]'
    }
  }

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
              preview: { url: URL.createObjectURL(file), type: MediaTypeEnum.IMAGE },
              visualIndex
            })
            resolve()
          } else {
            const url = URL.createObjectURL(file)
            const video = document.createElement('video')

            video.addEventListener('loadeddata', () => {
              const thumbNail = snapImage(video, url)
              if (thumbNail != null) {
                newMediaMap.set(file, {
                  preview: { url: thumbNail, type: MediaTypeEnum.VIDEO },
                  visualIndex
                })
              }
              resolve()
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

  // Xử lý khi người dùng xóa ảnh/video
  const handleRemoveMedia = (indexToRemove: number) => {
    if (indexToRemove < 0 || indexToRemove >= mediaContentMap.size) {
      console.error('Invalid index')
      return
    }

    // Chuyển Map thành array để thao tác dễ dàng
    const mediaArray = Array.from(mediaContentMap.entries())

    // Lấy file cần xóa
    const [removedFile, removedData] = mediaArray[indexToRemove]

    // Xóa file khỏi Map
    const newMediaMap = new Map(mediaContentMap)
    newMediaMap.delete(removedFile)

    // Tạo DataTransfer để cập nhật FileList
    const dataTransfer = new DataTransfer()
    newMediaMap.forEach((_, file) => dataTransfer.items.add(file))

    // Cập nhật visualIndex để giữ thứ tự
    let updatedIndex = 0
    const reorderedMediaMap = new Map<File, { preview: PreviewMediaContentType; visualIndex: number }>()
    newMediaMap.forEach((data, file) => {
      reorderedMediaMap.set(file, { ...data, visualIndex: updatedIndex++ })
    })

    // Cập nhật state
    setMediaContentMap(reorderedMediaMap)
    // setSelectedMediaContent(dataTransfer.files)

    // Giải phóng bộ nhớ nếu cần
    if (removedData.preview.url.startsWith('blob:')) {
      URL.revokeObjectURL(removedData.preview.url)
    }
  }

  useEffect(() => {
    setWidth(calculateWidth(mediaContentMap.size))
  }, [mediaContentMap.size])

  const MainBody = () => {
    if (mediaContentMap.size === 1) {
      const [file, { preview }] = Array.from(mediaContentMap.entries())[0]
      return (
        <div className='w-full p-2 pr-0'>
          <PreviewMediaContent
            previewMediaContent={preview}
            mediaContent={file}
            width='660px'
            height='335px'
            index={0}
            handleRemoveMedia={handleRemoveMedia}
          />
        </div>
      )
    }

    if (mediaContentMap.size === 2) {
      return (
        <div className='w-full p-2 pr-0'>
          {Array.from(mediaContentMap.entries()).map(([file, { preview }], index) => (
            <div key={index} className='last:mt-2'>
              <PreviewMediaContent
                previewMediaContent={preview}
                mediaContent={file}
                width='660px'
                height='335px'
                index={index}
                handleRemoveMedia={handleRemoveMedia}
              />
            </div>
          ))}
        </div>
      )
    }

    if (mediaContentMap.size < 5 && mediaContentMap.size > 2)
      return (
        <div className='w-full grid grid-cols-2 grid-rows-2 gap-2 p-2 pr-0'>
          {Array.from(mediaContentMap.entries()).map(([file, { preview }], index) => (
            <PreviewMediaContent
              key={index}
              previewMediaContent={preview}
              mediaContent={file}
              width='438px'
              height='335px'
              index={index}
              handleRemoveMedia={handleRemoveMedia}
            />
          ))}
        </div>
      )

    if (mediaContentMap.size >= 5) {
      return (
        <div className='w-full grid grid-cols-3 gap-2 p-2 pr-0'>
          {Array.from(mediaContentMap.entries()).map(([file, { preview }], index) => (
            <PreviewMediaContent
              key={index}
              previewMediaContent={preview}
              mediaContent={file}
              width='397px'
              height='335px'
              index={index}
              handleRemoveMedia={handleRemoveMedia}
            />
          ))}
        </div>
      )
    }
  }

  return (
    <div className={`animate-scale-in-hor-center`} ref={curDialogRef}>
      <DialogHeader className='rounded-t-md h-[60px] border-b border-gray-300 p-4 block'>
        <div className='flex items-center'>
          <div className='absolute w-full flex justify-start'>
            <IconButton
              color='blue-gray'
              className='h-9 w-9 bg-[#e4e6eb] rounded-full hover:bg-[#d8dadf] p-4'
              variant='text'
              onClick={handleCancel}
            >
              <div
                style={{ backgroundImage: `url(${facebookIcon3})` }}
                className='bg-[length:190px_186px] bg-[-78px_-62px] h-5 w-5 opacity-60'
              ></div>
            </IconButton>
          </div>
          <div className='w-full flex justify-center'>
            <span className='text-[20px] text-[#050505] font-bold'>Ảnh/Video</span>
          </div>
        </div>
      </DialogHeader>
      <DialogBody className='max-h-[525px] p-0 bg-[#e4e6eb] overflow-y-auto overflow-x-hidden custom-scrollbar-vip'>
        {mediaContentMap.size === 0 ? (
          <div className='h-[192px] w-full flex flex-col justify-center items-center gap-4 bg-white'>
            <img height='112' src={null_states_media_gray_wash} width='112' alt=''></img>
            <span className='' dir='auto'>
              Thêm ảnh/video để bắt đầu
            </span>
          </div>
        ) : (
          <MainBody />
        )}
      </DialogBody>
      <DialogFooter className='h-[60px] gap-2 border-t-2 border-gray-300'>
        <div className='group'>
          <button
            //onClick={handleOpenWarning}
            className='flex items-center gap-1 justify-center text-center text-[15px] py-[6px] text-[#0064d1] font-semibold w-[148px] rounded-md group-hover:bg-[#f2f2f2]'
          >
            <img src={addImageBlueIcon} className='h-4 w-4' alt=''></img>
            Thêm ảnh/video
          </button>
          <input
            type='file'
            title=''
            accept='image/*, video/*, .mkv'
            onChange={handleAddMedia}
            className={`w-[148px] h-[32px] opacity-0 absolute bottom-2 right-[140px] cursor-pointer rounded-lg file:cursor-pointer`}
            multiple
          />
        </div>

        <button
          onClick={handleCancel}
          className='bg-[#0866ff] rounded-md py-[6px] text-center text-[15px] text-white font-semibold w-[116px] hover:brightness-90'
        >
          Xong
        </button>
      </DialogFooter>
    </div>
  )
}

export default MediaEditor
