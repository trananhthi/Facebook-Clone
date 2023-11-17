import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { CommentType, Top2LatestCommentsType } from 'src/types/comment.type'
const URL_CREATE_COMMENT = 'comment/create'
const URL_GET_COMMENT = 'comment/get'
const URL_GET_TOP2_LASTEST_COMMENTS = 'comment/get/top-2-lastest-comments'

const commentApi = {
  createComment: (body: { content: string }, postID: number) => {
    return http.post<SuccessResponse>(`${URL_CREATE_COMMENT}/${postID}`, body)
  },
  getAllCommentByPostID: (postID: number) => {
    return http.get<CommentType[]>(`${URL_GET_COMMENT}/${postID}`)
  },
  getTop2LatestComments: (postID: number) => {
    return http.get<Top2LatestCommentsType>(`${URL_GET_TOP2_LASTEST_COMMENTS}/${postID}`)
  }
}

export default commentApi
