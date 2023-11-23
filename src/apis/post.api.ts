import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { PostType } from 'src/types/post.type'

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
  updatePost: (body: FormData, postID: number) => {
    return http.patch<PostType>(`${URL_UPDATE_POST}/${postID}`, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getAllPost: () => {
    return http.get<PostType[]>(URL_GET_POST)
  }
}

export default postApi
