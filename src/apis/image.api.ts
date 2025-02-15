import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
const URL_DELETE_POST_IMAGE = 'post-media/delete'

const imageApi = {
  deletePostImage: (mediaId: string) => {
    return http.patch<SuccessResponse>(`${URL_DELETE_POST_IMAGE}/${mediaId}`)
  }
}

export default imageApi
