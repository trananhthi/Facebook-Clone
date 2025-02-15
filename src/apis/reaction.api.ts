import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { ReactionType, ExpressReactionType } from 'src/types/reaction.type'
const URL_EXPRESS_REACTION = 'reaction/express'
const URL_GET_REACTION = 'reaction/get'

const reactionApi = {
  expressReaction: (body: ExpressReactionType, postId: string) => {
    return http.post<SuccessResponse>(`${URL_EXPRESS_REACTION}/${postId}`, body)
  },
  getAllReactionByPostID: (postId: string) => {
    return http.get<ReactionType[]>(`${URL_GET_REACTION}/${postId}`)
  }
}

export default reactionApi
