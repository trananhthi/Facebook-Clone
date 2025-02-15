import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { PostListType, PostType } from 'src/types/post.type'

const URL_CREATE_POST = 'post/create'
const URL_UPDATE_POST = 'post/update'
const URL_GET_POST = 'post/get'

const postApi = {
  createPost: (body: FormData) => {
    return http.post<SuccessResponse>(URL_CREATE_POST, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  updatePost: (body: FormData, postId: string) => {
    return http.patch<PostType>(`${URL_UPDATE_POST}/${postId}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getPost: (pageNumber: number = -1, pageSize: number = 0, signal?: AbortSignal) => {
    return http.get<PostListType>(`${URL_GET_POST}?page=${pageNumber}&size=${pageSize}`, { signal })
  }
}

export default postApi
