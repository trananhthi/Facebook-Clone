import { PrivacyType, EmojiType } from 'src/types/utils.type'

/* import images */
import friendIcon from 'src/assets/images/privacy-icon/friendIcon2.png'
import publicIcon from 'src/assets/images/privacy-icon/publicIcon.png'
import exceptFriendIcon from 'src/assets/images/privacy-icon/exceptFriendIcon.png'
import specificFriendIcon from 'src/assets/images/privacy-icon/specificFriendIcon.png'
import onlymeIcon from 'src/assets/images/privacy-icon/onlymeIcon.png'
import customIcon from 'src/assets/images/privacy-icon/customIcon.png'
import like from 'src/assets/images/emoji_post/like.png'
import love from 'src/assets/images/emoji_post/love.png'
import care from 'src/assets/images/emoji_post/care.png'
import haha from 'src/assets/images/emoji_post/haha.png'
import wow from 'src/assets/images/emoji_post/wow.png'
import sad from 'src/assets/images/emoji_post/sad.png'
import angry from 'src/assets/images/emoji_post/angry.png'

export const months = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`)

export const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`)

export const years = Array.from({ length: new Date().getFullYear() - 1980 + 1 }, (_, i) => `${i + 1980}`).reverse()

export const privacyList: PrivacyType[] = [
  {
    icon: publicIcon,
    value: 'public',
    title: 'Công khai',
    description: 'Bất kỳ ai ở trên hoặc ngoài Facebook'
  },
  {
    icon: friendIcon,
    value: 'friend',
    title: 'Bạn bè',
    description: 'Bạn bè của bạn trên Facebook'
  },
  {
    icon: exceptFriendIcon,
    value: 'except_friend',
    title: 'Bạn bè ngoại trừ...',
    description: 'Không hiển thị với một số bạn bè'
  },
  {
    icon: specificFriendIcon,
    value: 'specific_friend',
    title: 'Bạn bè cụ thể',
    description: 'Chỉ hiển thị với một số bạn bè'
  },
  {
    icon: onlymeIcon,
    value: 'only_me',
    title: 'Chỉ mình tôi',
    description: ''
  },
  {
    icon: customIcon,
    value: 'custom',
    title: 'Tùy chỉnh',
    description: 'Bao gồm và loại trừ bạn bè, danh sách'
  }
]

export const emojiList: EmojiType[] = [
  {
    icon: like,
    title: 'Thích',
    value: 'like',
    color: '#0566ff'
  },
  {
    icon: love,
    title: 'Yêu thích',
    value: 'love',
    color: '#e73b54'
  },
  {
    icon: care,
    title: 'Thương thương',
    value: 'care',
    color: '#eaa823'
  },
  {
    icon: haha,
    title: 'Haha',
    value: 'haha',
    color: '#eaa823'
  },
  {
    icon: wow,
    title: 'Wow',
    value: 'wow',
    color: '#eaa823'
  },
  {
    icon: sad,
    title: 'Buồn',
    value: 'sad',
    color: '#eaa823'
  },
  {
    icon: angry,
    title: 'Phẫn nộ',
    value: 'angry',
    color: '#df7722'
  }
]
