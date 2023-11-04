import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { CreatePostType, PostType } from 'src/types/post.type'

const URL_CREATE_POST = 'post/create'
const URL_GET_POST = 'post/get'

const postApi = {
  createPost: (body: CreatePostType) => {
    return http.post<SuccessResponse>(URL_CREATE_POST, body)
  },
  getAllPost: () => {
    return http.get<PostType[]>(URL_GET_POST)
  }
}

export default postApi
