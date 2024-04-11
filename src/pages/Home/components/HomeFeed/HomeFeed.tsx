import UserStory from 'src/components/UserStory'
import UserPost from 'src/components/UserPost'
import CreatePost from 'src/components/CreatePost'

import { useInfiniteQuery } from '@tanstack/react-query'
import { PostType } from 'src/types/post.type'
import postApi from 'src/apis/post.api'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { useCallback, useRef } from 'react'

function HomeFeed() {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)

  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    error,
    isLoading,
    refetch
  } = useInfiniteQuery(['get-all-post'], ({ pageParam = 0 }) => postApi.getPost(pageParam, 5), {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.last ? undefined : allPages.length
    }
  })

  const intObserver = useRef<IntersectionObserver | null>(null)
  const lastPostRef = useCallback(
    (post: Element) => {
      if (isFetchingNextPage) return

      if (intObserver.current) intObserver.current.disconnect()

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })

      if (post) intObserver.current.observe(post)
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  )

  const postData = data?.pages.map((pg) => {
    return pg.data.content.map((post: PostType, i) => {
      if (pg.data.content.length === i + 1) {
        return <UserPost ref={lastPostRef} key={post.id} post={post} userAccount={userAccount} />
      }
      return <UserPost key={post.id} post={post} userAccount={userAccount} />
    })
  })

  // const getPostQuery = useQuery({
  //   queryKey: ['get-all-post'],
  //   queryFn: () => postApi.getPost(),
  //   onError: (err) => console.log(err)
  // })

  const handleRefetch = () => {
    refetch()
  }

  if (status === 'error') return <p className='center'>Error: {(error as any).message}</p>

  return (
    <div className='px-8 flex flex-col items-center mt-4 gap-4 mb-6'>
      {/* Stories */}
      {/* Đăng story */}
      <div className='flex gap-2 py-2 w-[590px] justify-start relative'>
        <div className=''>
          <div
            style={{ backgroundImage: `url(${userAccount.avatar})` }}
            className='h-[201px] w-[141px] bg-cover rounded-t-lg'
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
      <CreatePost refetch={handleRefetch} />
      {/* Danh sách bài viết */}
      {postData}
      {(isFetchingNextPage || isLoading) &&
        Array.from({ length: 2 }, (_, index) => index).map((_, index) => (
          <div key={index} className='w-[590px] shadow-[0_0px_1px_1px_rgba(0,0,0,0.06)] bg-white rounded-lg p-4'>
            <div className='animate-pulse'>
              <div className='flex gap-2 items-center'>
                <div className='rounded-full bg-[#f0f2f5] h-10 w-10'></div>
                <div className='flex-1 py-1 gap-2 flex flex-col'>
                  <div className='h-[10px] bg-[#f0f2f5e3] rounded-full w-[90px]'></div>
                  <div className='h-[10px] bg-[#f0f2f5e3] rounded-full w-[110px]'></div>
                </div>
              </div>
              <div className='h-[170px]'></div>
              <div className='grid grid-flow-col gap-1' style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className='flex justify-center'>
                  <div className='h-[10px] bg-[#f0f2f5e3] rounded-full w-[70px]'></div>
                </div>
                <div className='flex justify-center'>
                  <div className='h-[10px] bg-[#f0f2f5e3] rounded-full w-[70px]'></div>
                </div>
                <div className='flex justify-center'>
                  <div className='h-[10px] bg-[#f0f2f5e3] rounded-full w-[70px]'></div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default HomeFeed
