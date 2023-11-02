import { Avatar, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { UserInfor } from 'src/types/user.type'
import Picker from '@emoji-mart/react'
// import './style.css'

/* import image */
import defaultAva from 'src/assets/images/default_avatar.png'
import friendIcon from 'src/assets/images/friendIcon.png'
import friendIcon2 from 'src/assets/images/friendIcon2.png'
import chooseBackGroundIcon from 'src/assets/images/chooseBackGroundIcon.png'
import facebookIcon7 from 'src/assets/images/facbook_icon_7.png'
import facebookIcon3 from 'src/assets/images/facbook_icon_3.png'
import imageIcon from 'src/assets/images/imageIcon.png'
import tagFriendIcon from 'src/assets/images/tagFriendIcon.png'
import activityIcon from 'src/assets/images/activityIcon.png'
import locationIcon from 'src/assets/images/locationIcon.png'
import gifIcon from 'src/assets/images/gifIcon.png'
import publicIcon from 'src/assets/images/publicIcon.png'
import exceptFriendIcon from 'src/assets/images/exceptFriendIcon.png'
import specificFriendIcon from 'src/assets/images/specificFriendIcon.png'
import onlymeIcon from 'src/assets/images/onlymeIcon.png'
import customIcon from 'src/assets/images/customIcon.png'

interface MainContentProps {
  handleOpen: () => void
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  userAccount: Partial<UserInfor>
  setOpenPrivacy: React.Dispatch<React.SetStateAction<boolean>>
}

function DialogMainContent({ handleOpen, content, setContent, userAccount, setOpenPrivacy }: MainContentProps) {
  const [openEmoji, setOpenEmoji] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [rows, setRows] = useState<number>(3)

  const handleEmojiSelect = (emoji: any) => {
    setContent(content + emoji.native)
  }

  const handleClickOutsideEmojiPicker = () => {
    if (openEmoji && !isClicked) setOpenEmoji(false)
  }

  const handleClickEmojiButton = () => {
    setOpenEmoji((cur) => !cur)
    setIsClicked(true)
  }

  const handleTextInput = (textArea: HTMLElement) => {
    textArea.style.height = textArea.scrollHeight + 'px'
    let scrollHeight = textArea.scrollHeight
    let maxRows = 1 // Đặt số hàng tối đa
    let lineHeight = scrollHeight / maxRows
    if (scrollHeight > lineHeight * maxRows) {
      textArea.style.height = maxRows * lineHeight + 'px'
    } else {
      textArea.style.height = scrollHeight + 'px'
    }
    if (content.length < 50) {
      setRows(3)
      textArea.style.height = '96px'
    }
  }
  return (
    <div>
      <DialogHeader className='bg-white rounded-t-md h-[60px] border-b border-gray-300 p-4'>
        <div className='w-full flex justify-center'>
          <span className='text-[20px] text-[#050505] font-bold'>Tạo bài viết</span>
        </div>
        <div className='flex justify-end absolute w-[464px]'>
          <IconButton
            color='blue-gray'
            className='h-9 w-9 bg-[#e4e6eb] rounded-full hover:bg-[#d8dadf] px-4'
            variant='text'
            onClick={handleOpen}
          >
            <div
              style={{ backgroundImage: `url(${facebookIcon3})` }}
              className='bg-[length:190px_186px] bg-[-22px_-110px] h-5 w-5 opacity-60'
            ></div>
          </IconButton>
        </div>
      </DialogHeader>

      <DialogBody className='w-[500px] p-4'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <Avatar
              variant='circular'
              size='sm'
              alt='avatar'
              className='h-10 w-10 border-solid border-gray-400 border'
              src={defaultAva}
            />
            <div className='flex flex-col'>
              <span className='text-[#050505] text-[15px] font-semibold cursor-pointer'>
                {userAccount.firstName + ' ' + userAccount.lastName}
              </span>
              {/* <div> */}
              <button
                onClick={() => setOpenPrivacy(true)}
                className='text-[#65676B] text-[13px] w-[89px] h-6 bg-[#e4e6eb] rounded-md flex justify-center items-center gap-1'
              >
                <img src={friendIcon} alt='friend-logo' className='h-3 w-3 text-[#65676B] inline ml-1' />
                <span className='text-[#050505] text-[13px] font-semibold'>Bạn bè</span>
                <div
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className='bg-[length:190px_186px] bg-[0px_-172px] h-3 w-3'
                ></div>
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <textarea
            rows={rows}
            onInput={(event) => handleTextInput(event.target as HTMLElement)}
            className={`w-full input-scrollbar overflow-y-auto min-h-[80px] max-h-[260px] ${
              content.length > 100 ? 'text-[15px] leading-5' : 'text-2xl'
            } text-[#050505] resize-none active:outline-0 focus:outline-0 placeholder:text-2xl placeholder:text-[#65676b]`}
            placeholder={userAccount.lastName + ` ơi, bạn đang nghĩ gì thế?`}
            value={content}
            onChange={(content) => setContent(content.target.value)}
          />
          <div className={`flex justify-between items-center  ${rows >= 5 ? 'mt-3' : 'mt-6'}`}>
            <button>
              <img src={chooseBackGroundIcon} alt='friend-logo' className='h-[38px] w-[38px]' />
            </button>
            <button
              onMouseLeave={() => setIsClicked(false)}
              onClick={handleClickEmojiButton}
              className='h-9 w-9 flex justify-center items-center'
            >
              <div
                style={{ backgroundImage: `url(${facebookIcon7})` }}
                className='bg-[length:38px_486px] bg-[0px_-76px] opacity-70 h-6 w-6 hover:opacity-100'
              ></div>
            </button>
            {/* Emoji Picker */}
            <div className={`${openEmoji ? '' : 'hidden'} absolute ml-[480px] mb-[200px]`}>
              <Picker
                onClickOutside={() => handleClickOutsideEmojiPicker()}
                theme='light'
                locale='vi'
                showReview={true}
                set='facebook'
                previewPosition='none'
                onEmojiSelect={handleEmojiSelect}
              />
            </div>
          </div>
        </div>
        {/* add more */}
        <div className='h-[58px] flex justify-between items-center rounded-lg border border-gray-500 shadow mt-4 p-4'>
          <span className='text-[#050505] text-[15px] font-semibold'>Thêm vào bài viết của bạn</span>

          <div className='flex justify-center items-center '>
            <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
              <img src={imageIcon} className='h-6 w-6' />
            </button>
            <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
              <img src={tagFriendIcon} className='h-6 w-6' />
            </button>
            <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
              <img src={activityIcon} className='h-6 w-6' />
            </button>
            <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
              <img src={locationIcon} className='h-6 w-6' />
            </button>
            <button className='h-9 w-9 rounded-full hover:bg-[#f2f2f2] flex items-center justify-center'>
              <img src={gifIcon} className='h-6 w-6' />
            </button>
            <button className='hover:bg-[#f2f2f2] h-8 w-8 rounded-full flex justify-center items-center'>
              <div
                style={{ backgroundImage: `url(${facebookIcon3})` }}
                className='bg-[length:190px_186px] bg-[-44px_-110px] h-5 w-5'
              ></div>
            </button>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className='p-4 pt-0'>
        <button disabled={content === ''} className='py-1 rounded-md bg-[#0866ff] w-full disabled:bg-[#e4e6eb]'>
          <span className={`text-[15px] leading-5 font-semibold ${content !== '' ? 'text-white' : 'text-[#bcc0c4]'}`}>
            Đăng
          </span>
        </button>
      </DialogFooter>
    </div>
  )
}

interface PrivacyContentProps {
  setOpenPrivacy: React.Dispatch<React.SetStateAction<boolean>>
  privacyType: string
  setPrivacyType: React.Dispatch<React.SetStateAction<string>>
}

function DialogPrivacyContent({ setOpenPrivacy, privacyType, setPrivacyType }: PrivacyContentProps) {
  return (
    <div>
      <DialogHeader className='bg-white rounded-t-md h-[60px] border-b border-gray-300 p-4'>
        <div className='absolute w-full flex justify-start'>
          <IconButton
            color='blue-gray'
            className='h-9 w-9 bg-[#e4e6eb] rounded-full hover:bg-[#d8dadf] p-4'
            variant='text'
            onClick={() => setOpenPrivacy(false)}
          >
            <div
              style={{ backgroundImage: `url(${facebookIcon3})` }}
              className='bg-[length:190px_186px] bg-[-78px_-62px] h-5 w-5 opacity-60'
            ></div>
          </IconButton>
        </div>
        <div className='w-full flex justify-center'>
          <span className='text-[20px] text-[#050505] font-bold'>Đối tượng của bài viết</span>
        </div>
      </DialogHeader>
      <DialogBody className='w-full max-h-[380px] h-auto p-0 input-scrollbar overflow-y-auto overflow-x-hidden'>
        <div className='flex flex-col gap-1 p-4 pb-2'>
          <span className='text-[#050505] text-[17px] font-semibold'>Ai có thể xem bài viết của bạn?</span>
          <span className='text-[#65676B] text-[14px] font-light'>
            Bài viết của bạn sẽ hiển thị ở Bảng feed, trang cá nhân và kết quả tìm kiếm.
          </span>
          <span className='text-[#65676B] text-[14px] font-light'>
            Tuy đối tượng mặc định là <span className='font-semibold'>Bạn bè</span>, nhưng bạn có thể thay đổi đối tượng
            của riêng bài viết này.
          </span>
        </div>
        <div className='flex flex-col px-2'>
          <label htmlFor='public' className='flex gap-3 items-center cursor-pointer rounded-lg p-2 hover:bg-[#f2f2f2]'>
            <div className='rounded-full bg-[#e4e6eb] p-[18px]'>
              <img src={publicIcon} alt='public' className='h-6 w-6' />
            </div>
            <div className='flex items-center justify-between w-[381px]'>
              <div className='flex flex-col'>
                <span className='text-[#050505] text-[17px] font-semibold'>Công khai</span>
                <span className='text-[#65676B] text-[14px] font-light'>Bất kỳ ai ở trên hoặc ngoài Facebook</span>
              </div>
              <input
                onChange={() => setPrivacyType('public')}
                className='appearance-none privacy-radio-input'
                type='radio'
                id='public'
                name='privacy'
                value='public'
                checked={privacyType === 'public'}
              />
              {privacyType === 'public' ? (
                <i
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className=' bg-[length:190px_186px] bg-[-154px_-88px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                ></i>
              ) : (
                <i
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className=' bg-[length:190px_186px] bg-[0px_-110px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                ></i>
              )}
            </div>
          </label>
          {/* friend */}
          <label
            htmlFor='friend-privacy'
            className='flex gap-3 items-center cursor-pointer rounded-lg p-2 hover:bg-[#f2f2f2]'
          >
            <div className='rounded-full bg-[#e4e6eb] p-[18px]'>
              <img src={friendIcon2} alt='friend' className='h-6 w-6' />
            </div>
            <div className='flex items-center justify-between w-[381px]'>
              <div className='flex flex-col'>
                <span className='text-[#050505] text-[17px] font-semibold'>Bạn bè</span>
                <span className='text-[#65676B] text-[14px] font-light'>Bạn bè của bạn trên Facebook</span>
              </div>
              <input
                onChange={() => setPrivacyType('friend')}
                className='appearance-none privacy-radio-input'
                type='radio'
                id='friend-privacy'
                name='privacy'
                value='friend'
                checked={privacyType === 'friend'}
              />
              {privacyType === 'friend' ? (
                <i
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className=' bg-[length:190px_186px] bg-[-154px_-88px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                ></i>
              ) : (
                <i
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className=' bg-[length:190px_186px] bg-[0px_-110px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                ></i>
              )}
            </div>
          </label>
          {/* Friend but some one */}
          <label
            htmlFor='exceptFriend'
            className='flex gap-3 items-center cursor-pointer rounded-lg p-2 hover:bg-[#f2f2f2]'
          >
            <div className='rounded-full bg-[#e4e6eb] p-[18px]'>
              <img src={exceptFriendIcon} alt='exceptFriend' className='h-6 w-6' />
            </div>
            <div className='flex items-center justify-between w-[381px]'>
              <div className='flex flex-col'>
                <span className='text-[#050505] text-[17px] font-semibold'>Bạn bè ngoại trừ...</span>
                <span className='text-[#65676B] text-[14px] font-light'>Không hiển thị với một số bạn bè</span>
              </div>
              <input
                onChange={() => setPrivacyType('exceptFriend')}
                className='appearance-none privacy-radio-input'
                type='radio'
                id='exceptFriend'
                name='privacy'
                value='exceptFriend'
                checked={privacyType === 'exceptFriend'}
              />
              {privacyType === 'exceptFriend' ? (
                <i
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className=' bg-[length:190px_186px] bg-[-154px_-88px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                ></i>
              ) : (
                <i
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className=' bg-[length:190px_186px] bg-[0px_-110px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                ></i>
              )}
            </div>
          </label>
          {/* specific friend */}
          <label
            htmlFor='specificFriend'
            className='flex gap-3 items-center cursor-pointer rounded-lg p-2 hover:bg-[#f2f2f2]'
          >
            <div className='rounded-full bg-[#e4e6eb] p-[18px]'>
              <img src={specificFriendIcon} alt='specificFriend' className='h-6 w-6' />
            </div>
            <div className='flex items-center justify-between w-[381px]'>
              <div className='flex flex-col'>
                <span className='text-[#050505] text-[17px] font-semibold'>Bạn bè cụ thể</span>
                <span className='text-[#65676B] text-[14px] font-light'>Chỉ hiển thị với một số bạn bè</span>
              </div>
              <input
                onChange={() => setPrivacyType('specificFriend')}
                className='appearance-none privacy-radio-input'
                type='radio'
                id='specificFriend'
                name='privacy'
                value='specificFriend'
                checked={privacyType === 'specificFriend'}
              />
              {privacyType === 'specificFriend' ? (
                <i
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className=' bg-[length:190px_186px] bg-[-154px_-88px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                ></i>
              ) : (
                <i
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className=' bg-[length:190px_186px] bg-[0px_-110px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                ></i>
              )}
            </div>
          </label>
          {/* only me */}
          <label htmlFor='onlyMe' className='flex gap-3 items-center cursor-pointer rounded-lg p-2 hover:bg-[#f2f2f2]'>
            <div className='rounded-full bg-[#e4e6eb] p-[18px]'>
              <img src={onlymeIcon} alt='onlyMe' className='h-6 w-6' />
            </div>
            <div className='flex items-center justify-between w-[381px]'>
              <div className='flex flex-col'>
                <span className='text-[#050505] text-[17px] font-semibold'>Chỉ mình tôi</span>
              </div>
              <input
                onChange={() => setPrivacyType('onlyMe')}
                className='appearance-none privacy-radio-input'
                type='radio'
                id='onlyMe'
                name='privacy'
                value='onlyMe'
                checked={privacyType === 'onlyMe'}
              />
              {privacyType === 'onlyMe' ? (
                <i
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className=' bg-[length:190px_186px] bg-[-154px_-88px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                ></i>
              ) : (
                <i
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className=' bg-[length:190px_186px] bg-[0px_-110px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                ></i>
              )}
            </div>
          </label>
          {/* custom  */}
          <label htmlFor='custom' className='flex gap-3 items-center cursor-pointer rounded-lg p-2 hover:bg-[#f2f2f2]'>
            <div className='rounded-full bg-[#e4e6eb] p-[18px]'>
              <img src={customIcon} alt='custom' className='h-6 w-6' />
            </div>
            <div className='flex items-center justify-between w-[381px]'>
              <div className='flex flex-col'>
                <span className='text-[#050505] text-[17px] font-semibold'>Tùy chỉnh</span>
                <span className='text-[#65676B] text-[14px] font-light'>Bao gồm và loại trừ bạn bè, danh sách</span>
              </div>
              <input
                onChange={() => setPrivacyType('custom')}
                className='appearance-none privacy-radio-input'
                type='radio'
                id='custom'
                name='privacy'
                value='custom'
                checked={privacyType === 'custom'}
              />
              {privacyType === 'custom' ? (
                <i
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className=' bg-[length:190px_186px] bg-[-154px_-88px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                ></i>
              ) : (
                <i
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className=' bg-[length:190px_186px] bg-[0px_-110px]  absolute cursor-pointer ml-[360px] h-5 w-5 rounded-full'
                ></i>
              )}
            </div>
          </label>
        </div>
      </DialogBody>
      <DialogFooter className='flex justify-end'>
        <div className='flex gap-3 justify-center items-center'>
          <button className='text-[#0064D1] text-[15px] px-3 py-[5px] rounded-md hover:bg-[#f2f2f2]'>Hủy</button>
          <button className='bg-[#0866ff] px-10 py-[5px] text-white text-[15px] font-medium rounded-md hover:bg-[#0861f2]'>
            Xong
          </button>
        </div>
      </DialogFooter>
    </div>
  )
}

interface Props {
  open: boolean
  handleOpen: () => void
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  userAccount: Partial<UserInfor>
}

function DialogCreatePost({ open, handleOpen, content, setContent, userAccount }: Props) {
  const [OpenPrivacy, setOpenPrivacy] = useState<boolean>(false)
  const [privacyType, setPrivacyType] = useState<string>('friend')
  const dialogMainContent: JSX.Element = (
    <DialogMainContent
      content={content}
      setContent={setContent}
      handleOpen={handleOpen}
      userAccount={userAccount}
      setOpenPrivacy={setOpenPrivacy}
    />
  )
  const dialogPrivacyContent: JSX.Element = (
    <DialogPrivacyContent setOpenPrivacy={setOpenPrivacy} privacyType={privacyType} setPrivacyType={setPrivacyType} />
  )
  const [render, setRender] = useState<JSX.Element>(dialogMainContent)

  useEffect(() => {
    // const dialog = document.getElementById(':r1m:')
    // if (dialog) {
    //   dialog.parentElement?.classList.add('bg-[#f3f3f4]', 'bg-opacity-80')
    // }

    if (OpenPrivacy) {
      setRender(dialogPrivacyContent)
    } else {
      setRender(dialogMainContent)
    }
    if (!open) setOpenPrivacy(false)
  }, [open, OpenPrivacy, privacyType])

  return (
    <Dialog
      dismiss={{ enabled: false }}
      open={open}
      handler={handleOpen}
      className={`${OpenPrivacy ? 'w-[500px]' : 'w-[500px]'} bg-white backdrop:bg-[#f3f3f4] backdrop-opacity-60`}
      size='xs'
    >
      {render}
    </Dialog>
  )
}

export default DialogCreatePost
