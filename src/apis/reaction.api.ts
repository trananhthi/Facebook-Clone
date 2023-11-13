import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { ReactionType, ExpressReactionType } from 'src/types/reaction.type'
const URL_EXPRESS_REACTION = 'reaction/express'
const URL_GET_REACTION = 'reaction/get'

const reactionApi = {
  expressReaction: (body: ExpressReactionType, postID: number) => {
    return http.post<SuccessResponse>(`${URL_EXPRESS_REACTION}/${postID}`, body)
  },
  getAllReactionByPostID: (postID: number) => {
    return http.get<ReactionType[]>(`${URL_GET_REACTION}/${postID}`)
  }
}

export default reactionApi
