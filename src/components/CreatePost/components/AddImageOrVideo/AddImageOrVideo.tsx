import { IconButton } from '@material-tailwind/react'
import { ChangeEvent, useEffect, useState } from 'react'

/* import images */
import facebookIcon10 from 'src/assets/images/icon-pack/facbook_icon_10.png'
import facebookIcon11 from 'src/assets/images/icon-pack/facbook_icon_11.png'
import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'
import ShowPreviewImage from 'src/components/ShowPreviewImage'
import { mergeFileLists } from 'src/utils/utils'

interface Props {
  openAddImage: boolean
  selectedImage: FileList | null
  setSelectedImage: React.Dispatch<React.SetStateAction<FileList | null>>
  previewImage: string[]
  setPreviewImage: React.Dispatch<React.SetStateAction<string[]>>
  fileInputRef: React.MutableRefObject<null>
  handleCloseSelectImage: () => void
  setOpenEditImage: React.Dispatch<React.SetStateAction<boolean>>
}

function AddImageOrVideo({
  openAddImage,
  selectedImage,
  setSelectedImage,
  previewImage,
  setPreviewImage,
  fileInputRef,
  handleCloseSelectImage,
  setOpenEditImage
}: Props) {
  const [temp, setTemp] = useState<any>(selectedImage)

  // const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files
  //   const listImageUrl = []
  //   if (files && files.length > 0) {
  //     setTemp(files)
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i]
  //       listImageUrl.push(URL.createObjectURL(file))
  //     }
  //     setPreviewImage(listImageUrl)
  //   }
  // }

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
      setTemp(mergeFileList)
    }
  }

  useEffect(() => {
    setSelectedImage(temp)
  }, [previewImage])

  return (
    <div className={`border border-gray-300 p-2 rounded-lg mt-6 ${openAddImage ? '' : 'hidden'}`}>
      {/* nút tắt */}
      <div className='absolute ml-[413px] mt-2 border border-gray-300 rounded-full z-10'>
        <IconButton
          color='blue-gray'
          className='h-[30px] w-[30px] bg-white rounded-full hover:bg-[#f2f2f2]'
          variant='text'
          onClick={handleCloseSelectImage}
        >
          <div
            style={{ backgroundImage: `url(${facebookIcon3})` }}
            className='bg-[length:190px_186px] bg-[-142px_-132px] h-4 w-4 opacity-60'
          ></div>
        </IconButton>
      </div>
      {/*  */}

      {previewImage.length > 0 ? (
        <div>
          <button
            onClick={() => setOpenEditImage(true)}
            disabled={previewImage.length === 1}
            className={`bg-white absolute rounded-md px-[10px] py-[6px] flex gap-1 items-center justify-center mt-2 ml-2 ${
              previewImage.length === 1 ? 'hidden' : ''
            } hover:bg-gray-200`}
          >
            <div
              className='bg-[length:26px_606px] bg-[0px_-488px] h-4 w-4'
              style={{ backgroundImage: `url(${facebookIcon11})` }}
            ></div>
            <span className='text-[15px] leading-5 text-[#050505] font-semibold'>Chỉnh sửa</span>
          </button>
          <div className='group'>
            <button
              className={`bg-white absolute rounded-md px-[10px] py-[6px] flex gap-1 items-center justify-center mt-2 ${
                previewImage.length === 1 ? 'ml-[10px]' : 'ml-[130px]'
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
              accept='image/*, video/*'
              onChange={handleAddImage}
              className={`w-[154px] h-[32px] opacity-0 absolute mt-2 ${
                previewImage.length === 1 ? 'ml-[10px]' : 'ml-[130px]'
              } cursor-pointer rounded-lg file:cursor-pointer`}
              multiple
            />
          </div>
          {/* hiển thị xem trước hình ảnh */}
          <ShowPreviewImage previewImage={previewImage} />
        </div>
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
            accept='image/*, video/*'
            onChange={handleAddImage}
            className='w-[450px] h-[183px] opacity-0 cursor-pointer rounded-lg file:cursor-pointer'
            multiple
          />
        </div>
      )}
    </div>
  )
}

export default AddImageOrVideo
