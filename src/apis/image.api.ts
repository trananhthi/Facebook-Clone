import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
const URL_DELETE_POST_IMAGE = 'post-image/delete'

const imageApi = {
  deletePostImage: (imageID: number) => {
    return http.patch<SuccessResponse>(`${URL_DELETE_POST_IMAGE}/${imageID}`)
  }
}

export default imageApi
