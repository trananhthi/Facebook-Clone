// import { Dialog } from '@material-tailwind/react'
// import { useEffect, useState } from 'react'
// import { UserInfor } from 'src/types/user.type'
// import DialogCreatePost from '../DialogCreatePost'
// import DialogPrivacyContent from '../DialogPrivacyContent'
// import { PrivacyType } from 'src/types/utils.type'
// import { privacyList } from 'src/constants/list'

// interface Props {
//   open: boolean
//   handleOpen: () => void
//   content: string
//   setContent: React.Dispatch<React.SetStateAction<string>>
//   userAccount: Partial<UserInfor>
// }

// function DialogCreatePost_old({ open, handleOpen, content, setContent, userAccount }: Props) {
//   const [openPrivacy, setOpenPrivacy] = useState<boolean>(false)
//   const [privacyPost, setPrivacyPost] = useState<PrivacyType>(
//     privacyList.find((p) => p.value === (userAccount.privacyDefault as string)) as PrivacyType
//   )
//   const [isStartAnimationClosePrivacyDialog, setIsStartAnimationClosePrivacyDialog] = useState(false)
//   const dialogMainContent: JSX.Element = (
//     <DialogCreatePost
//       type='create'
//       content={content}
//       setContent={setContent}
//       handleOpen={handleOpen}
//       userAccount={userAccount}
//       setOpenPrivacy={setOpenPrivacy}
//       privacyPost={privacyPost}
//       isStartAnimationClosePrivacyDialog={isStartAnimationClosePrivacyDialog}
//       setIsStartAnimationClosePrivacyDialog={setIsStartAnimationClosePrivacyDialog}
//     />
//   )
//   const dialogPrivacyContent: JSX.Element = (
//     <DialogPrivacyContent
//       type='create'
//       openPrivacy={openPrivacy}
//       setOpenPrivacy={setOpenPrivacy}
//       privacyPost={privacyPost}
//       setPrivacyPost={setPrivacyPost}
//       userAccount={userAccount}
//       setIsStartAnimationClosePrivacyDialog={setIsStartAnimationClosePrivacyDialog}
//     />
//   )
//   useEffect(() => {
//     if (!open) setOpenPrivacy(false)
//   }, [open, openPrivacy, privacyPost])

//   return (
//     <Dialog
//       dismiss={{ enabled: false }}
//       open={open}
//       handler={handleOpen}
//       className={`${openPrivacy ? 'w-[500px]' : 'w-[500px]'} bg-white`}
//       size='xs'
//     >
//       {openPrivacy ? dialogPrivacyContent : dialogMainContent}
//     </Dialog>
//   )
// }

// export default DialogCreatePost_old
