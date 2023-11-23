import { PopoverContent } from '@material-tailwind/react'
import { PostType } from 'src/types/post.type'
import { UserInfor } from 'src/types/user.type'
import { useEffect, useState } from 'react'

/* import images */
import facebookIcon12 from 'src/assets/images/icon-pack/facbook_icon_12.png'
import facebookIcon13 from 'src/assets/images/icon-pack/facbook_icon_13.png'
import facebookIcon14 from 'src/assets/images/icon-pack/facbook_icon_14.png'
import facebookIcon15 from 'src/assets/images/icon-pack/facbook_icon_15.png'
import changePrivacyIcon from 'src/assets/images/icon/changePrivacyIcon.png'

interface Props {
  arrowBox: string
  handleOpenEditPostDialog: () => void
  post: PostType
  userAccount: Partial<UserInfor>
}

function EditPostPopover({ arrowBox, handleOpenEditPostDialog, post, userAccount }: Props) {
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const imageSources = [facebookIcon12, facebookIcon13, facebookIcon14, facebookIcon15, changePrivacyIcon]

  useEffect(() => {
    const imageElements = imageSources.map((src) => {
      const img = new Image()
      img.src = src

      return img
    })

    const checkImagesLoaded = () => {
      const allImagesLoaded = imageElements.every((img) => img.complete)

      if (allImagesLoaded) {
        setImagesLoaded(true)
      }
    }

    imageElements.forEach((img) => {
      img.addEventListener('load', checkImagesLoaded)
      img.addEventListener('error', checkImagesLoaded)
    })

    return () => {
      imageElements.forEach((img) => {
        img.removeEventListener('load', checkImagesLoaded)
        img.removeEventListener('error', checkImagesLoaded)
      })
    }
  }, [imageSources])

  return (
    <PopoverContent className={`p-2 ${arrowBox} border-none rounded shadow-[0_0px_4px_3px_rgba(163,163,163,0.45)]`}>
      {/* Ghim bài viết */}
      {imagesLoaded ? (
        <div>
          <button className='flex gap-3 w-[328px] h-[36px] rounded p-2 hover:bg-[#f6f6f6] '>
            <div
              style={{ backgroundImage: `url(${facebookIcon12})` }}
              className='bg-[length:22px_776px] bg-[0px_-550px] h-5 w-5 opacity-[0.85]'
            ></div>
            <span className='text-[15px] text-[#050505] font-semibold opacity-[0.85]'>Ghim bài viết</span>
          </button>

          {/* Lưu bài viết */}
          <button className='flex gap-3 w-[328px] h-[46px] rounded p-2 hover:bg-[#f6f6f6] '>
            <div
              style={{ backgroundImage: `url(${facebookIcon13})` }}
              className='bg-[length:26px_268px] bg-[0px_-70px] h-5 w-5 opacity-[0.85]'
            ></div>
            <div className='flex flex-col flex-1 items-start -mt-1'>
              <span className='text-[15px] text-[#050505] font-semibold opacity-[0.85] '>Lưu bài viết</span>
              <span className='text-[12px] text-[#65676b] opacity-[0.85]'>Thêm vào danh sách mục đã lưu.</span>
            </div>
          </button>
          <hr className={`border-gray-300 mx-2 border my-2`}></hr>

          {/* Chỉnh sửa bài viết */}
          <button
            disabled={!(userAccount.email === post.author.email)}
            onClick={handleOpenEditPostDialog}
            className='flex gap-3 w-[328px] h-[36px] rounded p-2 hover:bg-[#f6f6f6] '
          >
            <div
              style={{ backgroundImage: `url(${facebookIcon14})` }}
              className='bg-[length:22px_484px] bg-[0px_-308px] h-5 w-5 opacity-[0.85]'
            ></div>
            <span className='text-[15px] text-[#050505] font-semibold opacity-[0.85]'>Chỉnh sửa bài viết</span>
          </button>

          {/* Chỉnh sửa đối tượng */}
          <button className='flex gap-3 w-[328px] h-[36px] rounded p-2 hover:bg-[#f6f6f6] '>
            <img
              src={changePrivacyIcon}
              className='bg-[length:22px_776px] bg-[0px_-550px] h-5 w-5 opacity-[0.85]'
            ></img>
            <span className='text-[15px] text-[#050505] font-semibold opacity-[0.85]'>Chỉnh sửa đối tượng</span>
          </button>

          {/* Tắt thông báo về bài viết này */}
          <button className='flex gap-3 w-[328px] h-[36px] rounded p-2 hover:bg-[#f6f6f6] '>
            <div
              style={{ backgroundImage: `url(${facebookIcon12})` }}
              className='bg-[length:22px_776px] bg-[0px_-66px] h-5 w-5 opacity-[0.85]'
            ></div>
            <span className='text-[15px] text-[#050505] font-semibold opacity-[0.85]'>
              Tắt thông báo về bài viết này
            </span>
          </button>

          {/* Tắt bản dịch */}
          <button className='flex gap-3 w-[328px] h-[36px] rounded p-2 hover:bg-[#f6f6f6] '>
            <div
              style={{ backgroundImage: `url(${facebookIcon14})` }}
              className='bg-[length:22px_484px] bg-[0px_-462px] h-5 w-5 opacity-[0.85]'
            ></div>
            <span className='text-[15px] text-[#050505] font-semibold opacity-[0.85]'>Tắt bản dịch</span>
          </button>

          {/* Chỉnh sửa ngày */}
          <button className='flex gap-3 w-[328px] h-[36px] rounded p-2 hover:bg-[#f6f6f6] '>
            <div
              style={{ backgroundImage: `url(${facebookIcon15})` }}
              className='bg-[length:22px_678px] bg-[0px_-44px] h-5 w-5 opacity-[0.85]'
            ></div>
            <span className='text-[15px] text-[#050505] font-semibold opacity-[0.85]'>Chỉnh sửa ngày</span>
          </button>

          <hr className={`border-gray-300 mx-2 border my-2`}></hr>

          {/* Chuyển vào kho lưu trữ */}
          <button className='flex gap-3 w-[328px] h-[36px] rounded p-2 hover:bg-[#f6f6f6] '>
            <div
              style={{ backgroundImage: `url(${facebookIcon14})` }}
              className='bg-[length:22px_484px] bg-[0px_-22px] h-5 w-5 opacity-[0.85]'
            ></div>
            <span className='text-[15px] text-[#050505] font-semibold opacity-[0.85]'>Chuyển vào kho lưu trữ</span>
          </button>

          {/* Chuyển vào thùng rác */}
          <button className='flex gap-3 w-[328px] h-[46px] rounded p-2 hover:bg-[#f6f6f6] '>
            <div
              style={{ backgroundImage: `url(${facebookIcon12})` }}
              className='bg-[length:22px_776px] bg-[0px_-660px] h-5 w-5 opacity-[0.85]'
            ></div>
            <div className='flex flex-col flex-1 items-start -mt-1'>
              <span className='text-[15px] text-[#050505] font-semibold opacity-[0.85] '>Chuyển vào thùng rác</span>
              <span className='text-[12px] text-[#65676b] opacity-[0.85]'>
                Các mục trong thùng rác sẽ bị xóa sau 30 ngày.
              </span>
            </div>
          </button>
        </div>
      ) : (
        <div className='h-[60px] w-[344px] bg-red-500'>loading...</div>
      )}
    </PopoverContent>
  )
}

export default EditPostPopover
