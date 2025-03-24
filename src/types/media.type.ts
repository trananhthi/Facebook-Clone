import { Point } from 'src/types/utils.type.ts'
import { MediaTypeEnum } from 'src/constants/enum.ts'

export type PostMediaType = {
  id: string
  postId: string
  url: string
  type: MediaTypeEnum
  size: number
  visualIndex: number
  height: number
  width: number
}

export type PreviewMediaContentType = {
  url: string
  type: MediaTypeEnum
  visualIndex: number
}

export interface MediaDragItem {
  preview: PreviewMediaContentType
  x: number
  y: number
}

export type MediaDragArea = {
  items: MediaDragItem[]
  cells: string[][]
  ghostPosition?: Point
  dragging?: {
    url: string
    initialPoint: Point
    nextPoint: Point
    valid: boolean
  }
}
