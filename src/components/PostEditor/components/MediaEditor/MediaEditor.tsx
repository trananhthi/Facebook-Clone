import { DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react'
import { motion } from 'motion/react'
import React, { ChangeEvent, useEffect, useCallback, useMemo, useRef } from 'react'
import facebookIcon3 from 'src/assets/images/icon-pack/facbook_icon_3.png'
import addImageBlueIcon from 'src/assets/images/icon/Add-Image-Blue-Icon.png'
import null_states_media_gray_wash from 'src/assets/images/icon/null_states_media_gray_wash.svg'
import { snapImage } from 'src/utils/utils'
import styled from '@emotion/styled'
import PreviewMediaContent from 'src/base-components/PreviewMediaContent'
import { MediaDragItem, PreviewMediaContentType } from 'src/types/media.type.ts'
import { MediaTypeEnum } from 'src/constants/enum.ts'
import { mediaDragInitial, mediaReducer } from 'src/reducers/mediaReducer.ts'

//cột hàng
const calculateGridSize = (size: number): [number, number] => {
  if (size === 1) return [1, 1]
  if (size === 2) return [1, 2]
  if (size < 5) return [2, 2]
  return [3, Math.ceil(size / 3)]
}

//tinh toan vi tri cua con chuot
const calculateGridPosition = (
  info: any,
  bodyRef: any,
  curDialogRef: any,
  cellWidth: number,
  cellHeight: number,
  gridSize: [number, number]
): { x: number; y: number } | null => {
  if (!bodyRef.current || !curDialogRef.current) return null

  const rect = curDialogRef.current.getBoundingClientRect()
  const relativeX = Math.min(Math.max(info.point.x - rect.left, 0), bodyRef.current.scrollWidth)
  const relativeY = Math.min(Math.max(info.point.y - rect.top, 0), bodyRef.current.scrollHeight)

  return {
    x: Math.min(Math.max(Math.floor(relativeX / cellWidth), 0), gridSize[0] - 1),
    y: Math.min(Math.max(Math.floor(relativeY / cellHeight), 0), gridSize[1] - 1)
  }
}

const createUrlIndexMap = (items: MediaDragItem[]) => {
  // Sắp xếp items theo vị trí x, y trong grid
  const sortedItems = [...items].sort((a, b) => {
    if (a.y === b.y) return a.x - b.x
    return a.y - b.y
  })

  // Tạo map từ url và visualIndex (1, 2, 3...)
  const urlIndexMap = new Map()
  sortedItems.forEach((item, index) => {
    urlIndexMap.set(item.preview.url, index)
  })

  return urlIndexMap
}

interface Props {
  setOpenEditImage: React.Dispatch<React.SetStateAction<boolean>>
  curDialogRef: React.MutableRefObject<HTMLDivElement | null>
  mediaContentMap: Map<File, { preview: PreviewMediaContentType; visualIndex: number }>
  setMediaContentMap: React.Dispatch<
    React.SetStateAction<Map<File, { preview: PreviewMediaContentType; visualIndex: number }>>
  >
  setWidth: React.Dispatch<React.SetStateAction<string>>
}

const MediaEditor = ({ setOpenEditImage, curDialogRef, mediaContentMap, setMediaContentMap, setWidth }: Props) => {
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const [dragState, dispatch] = React.useReducer(mediaReducer, mediaDragInitial)
  const [isDragEnd, setIsDragEnd] = React.useState(false)
  const mediaArray = React.useMemo(() => Array.from(mediaContentMap.entries()), [mediaContentMap])
  const gap = 8

  const variants = {
    endDrag: ({ pointX, pointY }: { pointX: number; pointY: number }) => ({
      x: pointX,
      y: pointY,
      transition: { duration: 0.3, ease: 'easeOut' }
    }),
    normal: {}
  }

  const handleCancel = useCallback(() => {
    const UrlIndexMap = createUrlIndexMap(dragState.items)

    const updatedMediaMap = new Map(
      mediaArray.map(([file, { preview }]) => {
        const index = UrlIndexMap.get(preview.url)
        return [file, { preview: { ...preview, visualIndex: index !== undefined ? index : preview.visualIndex } }]
      })
    )
    setMediaContentMap(updatedMediaMap as any)
    setOpenEditImage(false)
  }, [setOpenEditImage, dragState.items, mediaContentMap])

  React.useEffect(() => {
    const size = mediaContentMap.size
    const items: MediaDragItem[] = []

    // Xác định kích thước lưới
    const gridSize: [number, number] = calculateGridSize(size)

    // Sắp xếp mediaArray theo visualIndex
    mediaArray.sort((a, b) => (a[1].preview.visualIndex ?? Infinity) - (b[1].preview.visualIndex ?? Infinity))

    // Duyệt qua danh sách mediaContentMap và đặt vị trí x, y phù hợp
    mediaArray.forEach(([, { preview }], index) => {
      const x = index % gridSize[0] // Xác định hàng
      const y = Math.floor(index / gridSize[0]) // Xác định cột

      const item = {
        preview,
        x,
        y
      }

      items.push(item)
    })

    // Dispatch tất cả items vào reducer
    dispatch({
      type: 'ADD_ITEM_INIT',
      payload: { items, gridSize }
    })
  }, [])

  const getFileByPreview = (previewToFind: PreviewMediaContentType) => {
    for (const [file, { preview }] of mediaContentMap.entries()) {
      if (preview === previewToFind) {
        return file // Trả về file đầu tiên tìm thấy
      }
    }
    return null // Không tìm thấy
  }

  const draggingItem = dragState.items.find((i) => i.preview.url === dragState.dragging?.url)

  const calculateWidth = useCallback((length: number) => {
    if (length === 0) return 'w-[500px]'
    if (length <= 2) return 'w-[680px]'
    if (length > 4) return 'w-[1220px]'
    return 'w-[900px]'
  }, [])

  const handleAddMedia = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const items: PreviewMediaContentType[] = []
    if (!files?.length) return

    const newMediaMap = new Map(mediaContentMap)
    const currentIndex = newMediaMap.size

    await Promise.all(
      Array.from(files).map(async (file, index) => {
        const visualIndex = currentIndex + index
        if (file.type.includes('image')) {
          const newPreview = { url: URL.createObjectURL(file), type: MediaTypeEnum.IMAGE, visualIndex: visualIndex }
          newMediaMap.set(file, {
            preview: newPreview,
            visualIndex
          })

          items.push(newPreview)
        } else {
          const url = URL.createObjectURL(file)
          const video = document.createElement('video')

          await new Promise((resolve) => {
            video.addEventListener('loadeddata', () => {
              snapImage(video, url).then((thumbNail) => {
                if (thumbNail) {
                  const newPreview = {
                    url: URL.createObjectURL(file),
                    type: MediaTypeEnum.VIDEO,
                    visualIndex: visualIndex
                  }
                  newMediaMap.set(file, {
                    preview: newPreview,
                    visualIndex
                  })

                  items.push(newPreview)
                }
                resolve(null)
              })
            })
            video.src = url
            video.muted = true
            video.playsInline = true
            video.preload = 'metadata'
            video.play()
          })
        }
      })
    )

    const gridSize: [number, number] = calculateGridSize(newMediaMap.size)

    dispatch({
      type: 'ADD_ITEM',
      payload: { items, gridSize }
    })

    setMediaContentMap(newMediaMap)
  }

  const handleRemoveMedia = useCallback(
    (urlToRemove: string) => {
      if (!urlToRemove) return

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const indexToRemove = mediaArray.findIndex(([_, data]) => data.preview.url === urlToRemove)

      if (indexToRemove === -1) return // Không tìm thấy media cần xóa

      const size = mediaContentMap.size - 1
      const [, removedData] = mediaArray[indexToRemove]

      // Tạo map mới và cập nhật visualIndex
      const reorderedMediaMap = new Map(
        mediaArray
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, data]) => data.preview.url !== urlToRemove) // Lọc bỏ phần tử cần xóa
          .map(([file, data], newIndex) => [file, { ...data, visualIndex: newIndex }]) // Cập nhật visualIndex mới
      )

      // Dispatch action xóa media và cập nhật gridSize
      dispatch({
        type: 'DELETE_ITEM',
        payload: { urlToRemove, gridSize: calculateGridSize(size) }
      })

      setMediaContentMap(reorderedMediaMap)

      // Giải phóng URL nếu là blob
      if (removedData.preview.url.startsWith('blob:')) {
        URL.revokeObjectURL(removedData.preview.url)
      }
    },
    [mediaContentMap, setMediaContentMap, dispatch]
  )

  useEffect(() => {
    const newWidth = calculateWidth(mediaContentMap.size)
    setWidth((prevWidth) => (prevWidth !== newWidth ? newWidth : prevWidth))
  }, [mediaContentMap, calculateWidth, setWidth])

  const MainBody = useMemo(() => {
    if (mediaContentMap.size === 0) {
      return (
        <div className='h-[192px] w-full flex flex-col justify-center items-center gap-4 bg-white'>
          <img height='112' src={null_states_media_gray_wash} width='112' alt=''></img>
          <span className='' dir='auto'>
            Thêm ảnh/video để bắt đầu
          </span>
        </div>
      )
    }

    const gridSize = calculateGridSize(mediaContentMap.size)

    return (
      <div className='p-2 pr-0 relative' style={{ minHeight: `${gridSize[1] * (335 + gap) + 8}px` }}>
        <GridLayer
          gridSize={calculateGridSize(dragState.items.length)}
          mediaSize={dragState.items.length}
          style={{ position: 'relative' }}
        >
          {dragState.items.map((item) => {
            const isDragging = item.preview.url === dragState.dragging?.url
            const file = getFileByPreview(item.preview)

            // Xác định số cột dựa trên số lượng media
            const cellWidth = mediaContentMap.size <= 2 ? 660 : mediaContentMap.size < 5 ? 438 : 397
            const cellHeight = 335

            if (!file) return null // Nếu không tìm thấy file, bỏ qua

            return (
              <motion.div
                key={item.preview.url}
                drag
                layoutId={item.preview.url}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
                // dragConstraints={bodyRef}
                dragMomentum={false}
                onDragStart={() => {
                  dispatch({ type: 'DRAG_STARTED', payload: { item } })
                }}
                onDrag={(_, info) => {
                  const point = calculateGridPosition(info, bodyRef, curDialogRef, cellWidth, cellHeight, gridSize)
                  if (!point) return

                  // Gửi thông tin về vị trí hiện tại trong quá trình kéo
                  dispatch({
                    type: 'HOVER_ITEM',
                    payload: { point }
                  })
                }}
                onDragEnd={(_, info) => {
                  const point = calculateGridPosition(info, bodyRef, curDialogRef, cellWidth, cellHeight, gridSize)
                  if (!point) return

                  setIsDragEnd(true)
                  setTimeout(() => {
                    setIsDragEnd(false)
                  }, 300)
                  dispatch({ type: 'DRAG_ENDED', payload: { item, point, gridSize } })
                }}
                initial={false}
                animate={isDragEnd ? 'endDrag' : 'normal'}
                variants={variants}
                custom={{
                  pointX:
                    dragState.dragging?.nextPoint.y == undefined ? 0 : dragState.dragging?.nextPoint.y * (335 + gap),
                  pointY:
                    dragState.dragging?.nextPoint.x == undefined
                      ? 0
                      : dragState.dragging?.nextPoint.x * (cellWidth + gap)
                }}
                style={{
                  position: isDragging ? 'fixed' : 'absolute',
                  opacity: isDragging ? 0.5 : 1,
                  top: item.y * (cellHeight + gap),
                  left: item.x * (cellWidth + gap),
                  width: cellWidth,
                  height: cellHeight,
                  zIndex: isDragging ? 99 : 1,
                  cursor: isDragging ? 'grabbing' : 'move',
                  willChange: 'transform'
                }}
              >
                <PreviewMediaContent
                  previewMediaContent={item.preview}
                  mediaContent={file}
                  width={cellWidth + 'px'}
                  height='335px'
                  handleRemoveMedia={handleRemoveMedia}
                />
              </motion.div>
            )
          })}
        </GridLayer>
      </div>
    )
  }, [handleRemoveMedia, dragState, isDragEnd])

  return (
    <div className='animate-scale-in-hor-center' ref={curDialogRef}>
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

      <DialogBody
        ref={bodyRef}
        className={`max-h-[525px] ${
          mediaContentMap.size == 0 ? 'h-full' : mediaContentMap.size == 1 ? 'h-[351px]' : 'h-[525px]'
        } bg-[#e4e6eb] overflow-y-auto overflow-x-hidden custom-scrollbar-vip relative p-0`}
      >
        {MainBody}
        {dragState.dragging && draggingItem && (
          <>
            <motion.div
              className='absolute border-2 border-dashed border-bluePrimary m-2 mr-0'
              style={{
                top: dragState.dragging.nextPoint.y * (335 + gap),
                left:
                  dragState.dragging.nextPoint.x *
                  (mediaContentMap.size <= 2 ? 660 : mediaContentMap.size < 5 ? 438 : 397 + gap),
                width: mediaContentMap.size <= 2 ? 660 : mediaContentMap.size < 5 ? 438 : 397,
                height: 335,
                borderRadius: 0.5 + 'rem'
              }}
            />
          </>
        )}
      </DialogBody>

      <DialogFooter className='h-[60px] gap-2 border-t-2 border-gray-300'>
        <div className='group'>
          <button
            className='flex items-center gap-1 justify-center text-center text-[15px] py-[6px] text-[#0064d1]
           font-semibold w-[148px] rounded-md group-hover:bg-[#f2f2f2]'
          >
            <img src={addImageBlueIcon} className='h-4 w-4' alt=''></img>
            Thêm ảnh/video
          </button>
          <input
            type='file'
            title=''
            accept='image/*, video/*, .mkv'
            onChange={handleAddMedia}
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

const GridLayer = styled.div<{ gridSize: [number, number]; mediaSize: number }>`
  width: 100%;
  display: grid;
  grid-gap: 8px;

  ${({ gridSize, mediaSize }) => {
    if (mediaSize === 2) {
      return `
        grid-template-columns: repeat(1, 100%);
        grid-template-rows: repeat(2, 335px);
      `
    }
    const width = mediaSize < 5 ? 438 : 397
    return `
      grid-template-columns: repeat(${gridSize[0]}, ${width}px);
      grid-auto-rows: 335px;
    `
  }}
`

export default MediaEditor
