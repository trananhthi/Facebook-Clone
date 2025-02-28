import _ from 'lodash'
import { Cells, Point } from 'src/types/utils.type.ts'
import { MediaDragArea, MediaDragItem, PreviewMediaContentType } from 'src/types/media.type.ts'

export const mediaDragInitial: MediaDragArea = {
  items: [],
  cells: [],
  ghostPosition: undefined,
  dragging: undefined
}

export type Action =
  | { type: 'ADD_ITEM_INIT'; payload: { items: MediaDragItem[]; gridSize: [number, number] } }
  | { type: 'ADD_ITEM'; payload: { items: PreviewMediaContentType[]; gridSize: [number, number] } }
  | { type: 'DELETE_ITEM'; payload: { indexToRemove: number; gridSize: [number, number] } }
  | { type: 'DRAG_STARTED'; payload: { item: MediaDragItem } }
  | { type: 'DRAG_ENDED'; payload: { item: MediaDragItem; point: Point; gridSize: [number, number] } }
  | { type: 'HOVER_ITEM'; payload: { point: Point } }

function createGrid(row: number, col: number): Cells {
  return _.range(row).map(() => _.range(col).map(() => 'none'))
}

export const mediaReducer = (state: MediaDragArea, action: Action) => {
  switch (action.type) {
    case 'ADD_ITEM_INIT': {
      const { items, gridSize } = action.payload

      // Lọc ra các item mới chưa có trong danh sách
      const newItems = items.filter(
        (newItem) => !state.items.some((existingItem) => existingItem.preview.url === newItem.preview.url)
      )

      return {
        ...state,
        items: [...state.items, ...newItems], // Thêm tất cả các item mới
        cells: createGrid(gridSize[1], gridSize[0]) // Cập nhật grid
      }
    }

    case 'ADD_ITEM': {
      const { items, gridSize } = action.payload
      const currentItems = state.items
      const currentSize = currentItems.length

      // Lọc ra những item mới (chưa có trong danh sách cũ)
      const filteredItems = items.filter(
        (newItem) => !currentItems.some((existingItem) => existingItem.preview.url === newItem.url)
      )

      if (filteredItems.length === 0) return state // Không có item mới để thêm

      let newItems
      if (currentSize >= 5) {
        // Chỉ thêm mới, không cập nhật lại x, y của danh sách cũ
        newItems = filteredItems.map((preview, index) => ({
          preview,
          x: (currentSize + index) % gridSize[0],
          y: Math.floor((currentSize + index) / gridSize[0])
        }))

        return {
          ...state,
          items: [...currentItems, ...newItems], // Chỉ thêm item mới
          cells: createGrid(gridSize[1], gridSize[0])
        }
      } else {
        // Cập nhật lại x, y toàn bộ danh sách (gồm item cũ + item mới)
        const updatedItems = [...currentItems, ...filteredItems].map((item, index) => {
          const preview = 'preview' in item ? item.preview : item
          return {
            preview,
            x: index % gridSize[0],
            y: Math.floor(index / gridSize[0])
          }
        })

        return {
          ...state,
          items: updatedItems, // Gán lại toàn bộ danh sách với x, y mới
          cells: createGrid(gridSize[1], gridSize[0])
        }
      }
    }

    case 'DELETE_ITEM': {
      const { indexToRemove, gridSize } = action.payload

      // Xóa item theo index
      const updatedItems = state.items.filter((_, index) => index !== indexToRemove)

      const reorderedItems = updatedItems.map((item, index) => ({
        ...item,
        x: index % gridSize[0],
        y: Math.floor(index / gridSize[0])
      }))

      return {
        ...state,
        cells: createGrid(gridSize[1], gridSize[0]),
        items: reorderedItems
      }
    }
    case 'DRAG_STARTED': {
      return {
        ...state,
        dragging: {
          url: action.payload.item.preview.url,
          initialPoint: { x: action.payload.item.x, y: action.payload.item.y },
          nextPoint: { x: action.payload.item.x, y: action.payload.item.y },
          valid: true
        }
      }
    }

    case 'DRAG_ENDED': {
      if (!state.dragging) return state

      const { item, point, gridSize } = action.payload
      const { x: startX, y: startY } = item
      const { x: endX, y: endY } = point

      // Nếu vị trí không thay đổi thì bỏ qua
      if (startX === endX && startY === endY) {
        return { ...state, dragging: undefined }
      }

      const updatedItems = [...state.items]

      // Xác định index của item đang kéo
      const draggedIndex = updatedItems.findIndex((i) => i.preview.url === item.preview.url)

      // Xác định index mới dựa trên (endX, endY)
      const targetIndex = updatedItems.findIndex((i) => i.x === endX && i.y === endY)
      // Xóa item kéo khỏi danh sách
      const [draggedItem] = updatedItems.splice(draggedIndex, 1)

      if (targetIndex !== -1) {
        updatedItems.splice(targetIndex, 0, draggedItem)
      } else {
        updatedItems.push(draggedItem)
      }

      // 🔥 **Cập nhật lại toàn bộ danh sách để sắp xếp đúng grid**
      const reorderedItems = updatedItems.map((i, idx) => ({
        ...i,
        x: idx % gridSize[0],
        y: Math.floor(idx / gridSize[0])
      }))

      return { ...state, items: reorderedItems, dragging: undefined }
    }

    case 'HOVER_ITEM': {
      if (!state.dragging) return state

      const { point } = action.payload
      const { initialPoint } = state.dragging

      if (point.x === initialPoint.x && point.y === initialPoint.y) return state

      return {
        ...state,
        ghostItem: point, // Đánh dấu vị trí trống
        dragging: { ...state.dragging, nextPoint: point }
      }
    }

    default: {
      return state
    }
  }
}
