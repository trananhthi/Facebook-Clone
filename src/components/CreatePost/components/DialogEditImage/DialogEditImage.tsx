import { DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react'
import ShowImageInEdit from 'src/components/ShowImageInEdit'

/* import images */
import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'
import addImageBlueIcon from 'src/assets/images/icon/Add-Image-Blue-Icon.png'
import null_states_media_gray_wash from 'src/assets/images/icon/null_states_media_gray_wash.svg'
import { ChangeEvent, useEffect, useState } from 'react'
import { mergeFileLists } from 'src/utils/utils'

interface Props {
  setOpenEditImage: React.Dispatch<React.SetStateAction<boolean>>
  curDialogRef: React.MutableRefObject<null>
  selectedImage: FileList | null
  setSelectedImage: React.Dispatch<React.SetStateAction<FileList | null>>
  previewImage: string[]
  setPreviewImage: React.Dispatch<React.SetStateAction<string[]>>
}

const DialogEditImage = ({
  setOpenEditImage,
  curDialogRef,
  selectedImage,
  setSelectedImage,
  previewImage,
  setPreviewImage
}: Props) => {
  const [width, setWidth] = useState(
    previewImage.length === 2 ? 'w-[680px]' : previewImage.length > 4 ? 'w-[1220px]' : 'w-[900px]'
  )
  const [tempImage, setTempImage] = useState<FileList | null>(selectedImage)

  const handleCancel = () => {
    //setStartAnimationClosePrivacyDialog(true)
    setOpenEditImage(false)
  }

  const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const listImageUrl = []
    if (files && files.length > 0) {
      const mergeFileList = mergeFileLists(selectedImage, files)
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        listImageUrl.push(URL.createObjectURL(file))
      }
      setPreviewImage(previewImage.concat(listImageUrl))
      setTempImage(mergeFileList)
    }
  }

  useEffect(() => {
    if (previewImage.length <= 2 && previewImage.length > 0) setWidth('w-[680px]')
    else if (previewImage.length > 4) setWidth('w-[1220px]')
    else if (previewImage.length === 0) setWidth('w-[500px]')
    else setWidth('w-[900px]')

    setSelectedImage(tempImage)
  }, [previewImage, selectedImage])

  return (
    <div className={`${width} animate-scale-in-hor-center`} ref={curDialogRef}>
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
        {previewImage.length === 0 ? (
          <div className='h-[192px] w-full flex flex-col justify-center items-center gap-4 bg-white'>
            <img height='112' src={null_states_media_gray_wash} width='112' alt=''></img>
            <span className='' dir='auto'>
              Thêm ảnh/video để bắt đầu
            </span>
          </div>
        ) : (
          <ShowImageInEdit
            tempImage={tempImage}
            setTempImage={setTempImage}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          />
        )}
      </DialogBody>
      <DialogFooter className='h-[60px] gap-2 border-t-2 border-gray-300'>
        <div className='group'>
          <button
            //onClick={handleOpenWarning}
            className='flex items-center gap-1 justify-center text-center text-[15px] py-[6px] text-[#0064d1] font-semibold w-[148px] rounded-md group-hover:bg-[#f2f2f2]'
          >
            <img src={addImageBlueIcon} className='h-4 w-4'></img>
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

export default DialogEditImage
