import { IconButton } from '@material-tailwind/react'

import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'

interface PreviewImageProps {
  url: string
  width: string
  height: string
  index: number
  handleRemoveImage: (indexToRemove: number) => void
}

function PreviewImage({ url, width, height, handleRemoveImage, index }: PreviewImageProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        width: width, // Đảm bảo kích thước của container
        height: height, // Đảm bảo kích thước của container
        position: 'relative',
        overflow: 'hidden'
      }}
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
            onClick={() => handleRemoveImage(index)}
          >
            <div
              style={{ backgroundImage: `url(${facebookIcon3})` }}
              className='bg-[length:190px_186px] bg-[-142px_-132px] h-4 w-4'
            ></div>
          </IconButton>
        </div>
        <img src={url} className=' h-[205px] object-cover'></img>
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

interface Props {
  tempImage: FileList | null
  setTempImage: React.Dispatch<React.SetStateAction<FileList | null>>
  previewImage: string[]
  setPreviewImage: React.Dispatch<React.SetStateAction<string[]>>
}

const ShowImageInEdit = ({ tempImage, setTempImage, previewImage, setPreviewImage }: Props) => {
  const handleRemoveImage = (indexToRemove: number) => {
    if (indexToRemove >= 0 && indexToRemove < previewImage.length) {
      let newArr = previewImage.filter((_, index) => index !== indexToRemove)
      setPreviewImage(newArr)
      const filesArray = Array.from(tempImage as FileList)

      // Tạo DataTransfer để tạo lại FileList
      const dataTransfer = new DataTransfer()

      //Loại bỏ phần tử tại vị trí indexToRemove && Thêm các file từ mảng mới vào DataTransfer
      filesArray
        .filter((_, index) => index !== indexToRemove)
        .forEach((file) => {
          dataTransfer.items.add(file)
        })

      // Lấy FileList từ DataTransfer
      setTempImage(dataTransfer.files)
    } else {
      console.error('Invalid index')
    }
  }

  if (previewImage.length === 1)
    return (
      <div className='w-full p-2 pr-0'>
        <PreviewImage
          url={previewImage[0]}
          width='660px'
          height='335px'
          index={0}
          handleRemoveImage={handleRemoveImage}
        />
      </div>
    )

  if (previewImage.length === 2)
    return (
      <div className='w-full p-2 pr-0'>
        {previewImage.map((image, index) => (
          <div key={index} className='last:mt-2'>
            <PreviewImage
              url={image}
              width='660px'
              height='335px'
              index={index}
              handleRemoveImage={handleRemoveImage}
            />
          </div>
        ))}
      </div>
    )

  if (previewImage.length < 5 && previewImage.length > 2)
    return (
      <div className='w-full grid grid-cols-2 grid-rows-2 gap-2 p-2 pr-0'>
        {previewImage.map((image, index) => (
          <PreviewImage
            key={index}
            url={image}
            width='438px'
            height='335px'
            index={index}
            handleRemoveImage={handleRemoveImage}
          />
        ))}
      </div>
    )

  if (previewImage.length >= 5) {
    return (
      <div className='w-full grid grid-cols-3 gap-2 p-2 pr-0'>
        {previewImage.map((image, index) => (
          <PreviewImage
            key={index}
            url={image}
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

export default ShowImageInEdit
