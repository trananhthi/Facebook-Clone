import { Point } from 'src/types/utils.type.ts'

export type PostMediaType = {
  id: string
  postId: string
  url: string
  type: string
  size: number
  visualIndex: number
}

export type PreviewMediaContentType = {
  url: string
  type: string
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
