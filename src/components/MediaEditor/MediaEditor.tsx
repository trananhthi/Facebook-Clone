// import PreviewMediaContent from 'src/base-components/PreviewMediaContent'
//
// interface Props {
//   selectedMediaContent: FileList | null
//   setSelectedMediaContent: React.Dispatch<React.SetStateAction<FileList | null>>
//   previewImage: string[]
//   setPreviewImage: React.Dispatch<React.SetStateAction<string[]>>
// }
//
// const MediaEditor = ({ selectedMediaContent, setSelectedMediaContent, previewImage, setPreviewImage }: Props) => {
//   const handleRemoveImage = (indexToRemove: number) => {
//     if (indexToRemove >= 0 && indexToRemove < previewImage.length) {
//       let newArr = previewImage.filter((_, index) => index !== indexToRemove)
//       setPreviewImage(newArr)
//       const filesArray = Array.from(selectedMediaContent as FileList)
//
//       // Tạo DataTransfer để tạo lại FileList
//       const dataTransfer = new DataTransfer()
//
//       //Loại bỏ phần tử tại vị trí indexToRemove && Thêm các file từ mảng mới vào DataTransfer
//       filesArray
//         .filter((_, index) => index !== indexToRemove)
//         .forEach((file) => {
//           dataTransfer.items.add(file)
//         })
//
//       // Lấy FileList từ DataTransfer
//       setSelectedMediaContent(dataTransfer.files)
//     } else {
//       console.error('Invalid index')
//     }
//   }
//
//   if (previewImage.length === 1)
//     return (
//       <div className='w-full p-2 pr-0'>
//         <PreviewMediaContent
//           url={previewImage[0]}
//           width='660px'
//           height='335px'
//           index={0}
//           handleRemoveImage={handleRemoveImage}
//         />
//       </div>
//     )
//
//   if (previewImage.length === 2)
//     return (
//       <div className='w-full p-2 pr-0'>
//         {previewImage.map((image, index) => (
//           <div key={index} className='last:mt-2'>
//             <PreviewMediaContent
//               url={image}
//               width='660px'
//               height='335px'
//               index={index}
//               handleRemoveImage={handleRemoveImage}
//             />
//           </div>
//         ))}
//       </div>
//     )
//
//   if (previewImage.length < 5 && previewImage.length > 2)
//     return (
//       <div className='w-full grid grid-cols-2 grid-rows-2 gap-2 p-2 pr-0'>
//         {previewImage.map((image, index) => (
//           <PreviewMediaContent
//             key={index}
//             url={image}
//             width='438px'
//             height='335px'
//             index={index}
//             handleRemoveImage={handleRemoveImage}
//           />
//         ))}
//       </div>
//     )
//
//   if (previewImage.length >= 5) {
//     return (
//       <div className='w-full grid grid-cols-3 gap-2 p-2 pr-0'>
//         {previewImage.map((image, index) => (
//           <PreviewMediaContent
//             key={index}
//             url={image}
//             width='397px'
//             height='335px'
//             index={index}
//             handleRemoveImage={handleRemoveImage}
//           />
//         ))}
//       </div>
//     )
//   }
// }
//
// export default MediaEditor
