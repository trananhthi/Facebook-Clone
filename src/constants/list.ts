import friendIcon from 'src/assets/images/friendIcon.png'
import publicIcon from 'src/assets/images/publicIcon.png'
import exceptFriendIcon from 'src/assets/images/exceptFriendIcon.png'
import specificFriendIcon from 'src/assets/images/specificFriendIcon.png'
import onlymeIcon from 'src/assets/images/onlymeIcon.png'
import customIcon from 'src/assets/images/customIcon.png'
import { PrivacyType } from 'src/types/utils.type'

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
