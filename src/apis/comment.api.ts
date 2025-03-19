import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { CommentListType, Top2LatestCommentsType } from 'src/types/comment.type'
const URL_CREATE_COMMENT = 'comment/create'
const URL_GET_COMMENT = 'comment/get'
const URL_GET_TOP2_LASTEST_COMMENTS = 'comment/get/top-2-lastest-comments'

const commentApi = {
  createComment: (body: { content: string }, postId: string) => {
    return http.post<SuccessResponse>(`${URL_CREATE_COMMENT}/${postId}`, body)
  },
  getCommentByPostId: (postId: string, pageNumber: number = 0, pageSize: number = 7) => {
    return http.get<CommentListType>(`${URL_GET_COMMENT}/${postId}?page=${pageNumber}&size=${pageSize}`)
  },
  getTop2LatestComments: (postId: string) => {
    return http.get<Top2LatestCommentsType>(`${URL_GET_TOP2_LASTEST_COMMENTS}/${postId}`)
  }
}

export default commentApi
