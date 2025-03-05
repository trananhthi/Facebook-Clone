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

      // Khi kết thúc drag, chỉ cần xóa trạng thái dragging
      return {
        ...state,
        dragging: undefined
      }
    }

    case 'HOVER_ITEM': {
      if (!state.dragging) return state

      const { point } = action.payload
      const { initialPoint } = state.dragging
      const draggingUrl = state.dragging.url

      // Nếu vị trí không thay đổi, bỏ qua
      if (point.x === initialPoint.x && point.y === initialPoint.y) return state

      // Nếu point giống với nextPoint hiện tại, bỏ qua
      if (state.dragging.nextPoint && state.dragging.nextPoint.x === point.x && state.dragging.nextPoint.y === point.y)
        return state

      // Tìm item đang được kéo và item đích
      const draggingItemIndex = state.items.findIndex((item) => item.preview.url === draggingUrl)
      const targetItemIndex = state.items.findIndex((item) => item.x === point.x && item.y === point.y)

      // Nếu không có thay đổi vị trí, bỏ qua
      if (draggingItemIndex === targetItemIndex) return state

      // Tối ưu: Chỉ hoán đổi hai vị trí thay vì tính toán lại toàn bộ
      const updatedItems = [...state.items]
      const direction = targetItemIndex > draggingItemIndex ? 1 : -1

      // Di chuyển các phần tử ở giữa
      if (direction === 1) {
        // Dịch chuyển từ vị trí cũ đến vị trí mới
        for (let i = draggingItemIndex; i < targetItemIndex; i++) {
          updatedItems[i] = { ...updatedItems[i + 1], x: updatedItems[i].x, y: updatedItems[i].y }
        }
      } else if (direction === -1 && targetItemIndex !== -1) {
        // Dịch chuyển từ vị trí mới đến vị trí cũ
        for (let i = draggingItemIndex; i > targetItemIndex; i--) {
          updatedItems[i] = { ...updatedItems[i - 1], x: updatedItems[i].x, y: updatedItems[i].y }
        }
      }

      // Đặt item đang kéo vào vị trí mới
      if (targetItemIndex !== -1) {
        console.log('Chay cai nay')
        updatedItems[targetItemIndex] = { ...state.items[draggingItemIndex], x: point.x, y: point.y }
      }

      return {
        ...state,
        items: updatedItems,
        dragging: {
          ...state.dragging,
          nextPoint: point
        }
      }
    }

    default: {
      return state
    }
  }
}
