import UserStory from 'src/components/UserStory'
import UserPost from 'src/components/UserPost'
import CreatePost from 'src/components/CreatePost'

import { useQuery } from '@tanstack/react-query'
import { PostType } from 'src/types/post.type'
import postApi from 'src/apis/post.api'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'

function HomeFeed() {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)

  const getAllPostQuery = useQuery({
    queryKey: ['get-all-post'],
    queryFn: () => postApi.getAllPost(),
    onError: (err) => console.log(err)
  })

  //console.log(getAllPostQuery.data?.data)

  return (
    <div className='px-8 flex flex-col items-center mt-4 gap-4 mb-6'>
      {/* Stories */}
      {/* Đăng story */}
      <div className='flex gap-2 py-2 w-[590px] justify-start'>
        <div className=''>
          <div
            className='h-[201px] w-[141px] bg-cover rounded-t-lg
              bg-[url(https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/361915590_3653939708258984_1524398243926436617_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF0Bj1L5zIiFLq5Hi1KAppWWjJCG21xzqtaMkIbbXHOq1IQGmds2sOMzv-UgelR5hvtrMFpcxy58_F348zvev5k&_nc_ohc=zn3UBEB81iMAX8apbbG&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfCkB8tMSMfsozDYIHLEu5e5GoAH1NmIjBW-dgevZnUKig&oe=65440685)]'
          ></div>
          <div className='h-[49px] rounded-b-lg bg-white flex justify-center items-end'>
            <div className='h-10 w-10 mb-7 flex justify-center items-center absolute bg-white rounded-full'>
              <div className='h-8 w-8 rounded-full bg-[#0866ff] flex justify-center items-center'>
                <svg viewBox='0 0 20 20' width='20px' height='20px' fill='white'>
                  <g fillRule='evenodd' transform='translate(-446 -350)'>
                    <g fillRule='nonzero'>
                      <path d='M95 201.5h13a1 1 0 1 0 0-2H95a1 1 0 1 0 0 2z' transform='translate(354.5 159.5)'></path>
                      <path
                        d='M102.5 207v-13a1 1 0 1 0-2 0v13a1 1 0 1 0 2 0z'
                        transform='translate(354.5 159.5)'
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <span className='font-semibold text-[13px] mb-2'>Tạo tin</span>
          </div>
        </div>
        {/* stories bạn bè */}
        <UserStory url='https://s3-hcm-r1.longvan.net/2502-facebook/1696172660306-zelda_totk.png' />
        <UserStory url='https://s3-hcm-r1.longvan.net/2502-facebook/1696173262970-electric_trap.png' />
        <UserStory url='https://s3-hcm-r1.longvan.net/2502-facebook/1696214980072-wp8629994.png' />
      </div>

      {/* Đăng bài */}
      <CreatePost />
      {/* Danh sách bài viết */}
      {getAllPostQuery.data?.data.map((post: PostType) => (
        <UserPost key={post.id} post={post} userAccount={userAccount} />
      ))}
    </div>
  )
}

export default HomeFeed
