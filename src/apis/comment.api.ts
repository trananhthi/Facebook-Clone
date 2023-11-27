import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { CommentListType, Top2LatestCommentsType } from 'src/types/comment.type'
const URL_CREATE_COMMENT = 'comment/create'
const URL_GET_COMMENT = 'comment/get'
const URL_GET_TOP2_LASTEST_COMMENTS = 'comment/get/top-2-lastest-comments'

const commentApi = {
  createComment: (body: { content: string }, postID: number) => {
    return http.post<SuccessResponse>(`${URL_CREATE_COMMENT}/${postID}`, body)
  },
  getCommentByPostID: (postID: number, pageNumber: number = 0, pageSize: number = 7) => {
    return http.get<CommentListType>(`${URL_GET_COMMENT}/${postID}?page=${pageNumber}&size=${pageSize}`)
  },
  getTop2LatestComments: (postID: number) => {
    return http.get<Top2LatestCommentsType>(`${URL_GET_TOP2_LASTEST_COMMENTS}/${postID}`)
  }
}

export default commentApi
