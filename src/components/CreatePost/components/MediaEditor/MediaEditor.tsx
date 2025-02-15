import { DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react'

/* import images */
import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'
import addImageBlueIcon from 'src/assets/images/icon/Add-Image-Blue-Icon.png'
import null_states_media_gray_wash from 'src/assets/images/icon/null_states_media_gray_wash.svg'
import React, { ChangeEvent, useEffect } from 'react'
import { mergeFileLists, snapImage } from 'src/utils/utils'
import PreviewMediaContent from 'src/base-components/PreviewMediaContent'
import { PreviewMediaContentType } from 'src/types/utils.type.ts'
import { MediaTypeEnum } from 'src/constants/enum.ts'

interface Props {
  setOpenEditImage: React.Dispatch<React.SetStateAction<boolean>>
  curDialogRef: React.MutableRefObject<null>
  selectedMediaContent: FileList | null
  setSelectedMediaContent: React.Dispatch<React.SetStateAction<FileList | null>>
  previewMediaContent: PreviewMediaContentType[]
  setPreviewMediaContent: React.Dispatch<React.SetStateAction<PreviewMediaContentType[]>>
  setWidth: React.Dispatch<React.SetStateAction<string>>
}

const MediaEditor = ({
  setOpenEditImage,
  curDialogRef,
  selectedMediaContent,
  setSelectedMediaContent,
  previewMediaContent,
  setPreviewMediaContent,
  setWidth
}: Props) => {
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

  // Xử lý khi người dùng thêm ảnh/video
  // const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files
  //   const listImageUrl = []
  //   if (files && files.length > 0) {
  //     const mergeFileList = mergeFileLists(selectedMediaContent, files)
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i]
  //       listImageUrl.push({
  //         url: URL.createObjectURL(file),
  //         type: MediaTypeEnum.IMAGE
  //       })
  //     }
  //     setPreviewMediaContent(previewMediaContent.concat(listImageUrl))
  //     setSelectedMediaContent(mergeFileList)
  //
  //     setWidth(calculateWidth(previewMediaContent.concat(listImageUrl).length))
  //   }
  // }
  const handleAddImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const listImageUrl: PreviewMediaContentType[] = []

    if (files && files.length > 0) {
      const mergeFileList = mergeFileLists(selectedMediaContent, files)

      const promises = Array.from(files).map((file) => {
        return new Promise<void>((resolve) => {
          // Kiểm tra xem file có phải là hình ảnh không
          if (file.type.includes('image')) {
            listImageUrl.push({
              url: URL.createObjectURL(file),
              type: MediaTypeEnum.IMAGE
            })
            resolve()
          } else {
            const url = URL.createObjectURL(file)
            const video = document.createElement('video')

            // Sự kiện loadeddata để lấy thumbnail
            video.addEventListener('loadeddata', () => {
              const thumbNail = snapImage(video, url)
              if (thumbNail != null) {
                listImageUrl.push({
                  url: thumbNail,
                  type: MediaTypeEnum.VIDEO
                  // videoUrl: url
                })
              }
              resolve()
            })

            // Thiết lập thuộc tính cho video
            video.src = url
            video.muted = true
            video.playsInline = true
            video.preload = 'metadata'
            video.play()
          }
        })
      })

      await Promise.all(promises)
      setPreviewMediaContent(previewMediaContent.concat(listImageUrl))
      setSelectedMediaContent(mergeFileList)
    }
  }

  // Xử lý khi người dùng xóa ảnh/video
  const handleRemoveImage = (indexToRemove: number) => {
    if (indexToRemove < 0 || indexToRemove >= previewMediaContent.length) {
      console.error('Invalid index')
      return
    }

    const removedItem = previewMediaContent[indexToRemove]
    const newArr = previewMediaContent.filter((_, index) => index !== indexToRemove)
    setPreviewMediaContent(newArr)
    const filesArray = Array.from(selectedMediaContent as FileList)

    // Tạo DataTransfer để tạo lại FileList
    const dataTransfer = new DataTransfer()

    //Loại bỏ phần tử tại vị trí indexToRemove && Thêm các file từ mảng mới vào DataTransfer
    filesArray
      .filter((_, index) => index !== indexToRemove)
      .forEach((file) => {
        dataTransfer.items.add(file)
      })

    // Lấy FileList từ DataTransfer
    setSelectedMediaContent(dataTransfer.files)
    if (removedItem?.url && removedItem.url.startsWith('blob:')) {
      URL.revokeObjectURL(removedItem.url)
    }
  }

  useEffect(() => {
    setWidth(calculateWidth(previewMediaContent.length))
  }, [previewMediaContent.length])

  const MainBody = () => {
    if (previewMediaContent.length === 1)
      return (
        <div className='w-full p-2 pr-0'>
          <PreviewMediaContent
            previewMediaContent={previewMediaContent[0]}
            width='660px'
            height='335px'
            index={0}
            handleRemoveImage={handleRemoveImage}
          />
        </div>
      )

    if (previewMediaContent.length === 2)
      return (
        <div className='w-full p-2 pr-0'>
          {previewMediaContent.map((media, index) => (
            <div key={index} className='last:mt-2'>
              <PreviewMediaContent
                previewMediaContent={media}
                width='660px'
                height='335px'
                index={index}
                handleRemoveImage={handleRemoveImage}
              />
            </div>
          ))}
        </div>
      )

    if (previewMediaContent.length < 5 && previewMediaContent.length > 2)
      return (
        <div className='w-full grid grid-cols-2 grid-rows-2 gap-2 p-2 pr-0'>
          {previewMediaContent.map((media, index) => (
            <PreviewMediaContent
              key={index}
              previewMediaContent={media}
              width='438px'
              height='335px'
              index={index}
              handleRemoveImage={handleRemoveImage}
            />
          ))}
        </div>
      )

    if (previewMediaContent.length >= 5) {
      return (
        <div className='w-full grid grid-cols-3 gap-2 p-2 pr-0'>
          {previewMediaContent.map((media, index) => (
            <PreviewMediaContent
              key={index}
              previewMediaContent={media}
              width='397px'
              height='335px'
              index={index}
              handleRemoveImage={handleRemoveImage}
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
        {previewMediaContent.length === 0 ? (
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
            accept='image/*, video/*'
            onChange={handleAddImage}
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
