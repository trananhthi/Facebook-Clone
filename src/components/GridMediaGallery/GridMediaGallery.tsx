import React, { useState, useEffect } from 'react'
import GridMediaItem from 'src/base-components/GridMediaItem'
import { PostMediaType } from 'src/types/media.type.ts'
import { average } from 'color.js'
import { MediaTypeEnum } from 'src/constants/enum.ts'
import VideoPlayer from 'src/components/VideoPlayer'
import { snapImage } from 'src/utils/utils.ts'
import LoadingSpinner from 'src/base-components/LoadingSpinner'

interface Props {
  listMedia: PostMediaType[]
  type: string
}

function GridMediaGallery({ listMedia, type }: Props) {
  const [listAspectRatios, setListAspectRatios] = useState<number[]>([])
  const [bgColor, setBgColor] = useState<string>('')
  const [listUrl, setListUrl] = useState<{ url: string; type: MediaTypeEnum }[]>([])
  const [loading, setLoading] = useState<boolean[]>([])

  React.useEffect(() => {
    if (type == 'edit') {
      setBgColor('')
    } else if (listMedia[0].type == MediaTypeEnum.IMAGE) {
      average(listMedia[0].url, { format: 'hex' }).then((color) => setBgColor(color.toString()))
    }
  }, [listMedia])

  // async function loadImageAsync(src: string): Promise<HTMLImageElement> {
  //   return new Promise((resolve, reject) => {
  //     const PreviewImage = new Image()
  //     PreviewImage.onload = () => resolve(PreviewImage)
  //     PreviewImage.onerror = reject
  //     PreviewImage.src = src
  //   })
  // }

  async function processImages(listUrl: { url: string; type: MediaTypeEnum }[]) {
    const listAspectRatiosTemp: number[] = []
    const loadingStatus: boolean[] = Array(listUrl.length).fill(true)
    setLoading(loadingStatus)
    for (let i = 0; i < listUrl.length && i < 5; i++) {
      try {
        // const PreviewImage = await loadImageAsync(listUrl[i].url)
        listAspectRatiosTemp.push(listMedia[i].height / listMedia[i].width)
        loadingStatus[i] = false
        setLoading([...loadingStatus])
      } catch (error) {
        console.error('Error loading image:', error)
        loadingStatus[i] = false
        setLoading([...loadingStatus])
      }
    }

    return listAspectRatiosTemp
  }

  useEffect(() => {
    setLoading(Array(listMedia.length).fill(true))
    const fetchUrls = async () => {
      try {
        const urls = await Promise.all(
          listMedia.map(async (media) => {
            if (media.type === 'VIDEO' && type !== 'edit') {
              try {
                const video = document.createElement('video')
                video.crossOrigin = 'anonymous'
                video.src = media.url
                video.muted = true
                video.playsInline = true
                video.preload = 'metadata'

                await new Promise((resolve, reject) => {
                  video.addEventListener('loadeddata', resolve, { once: true })
                  video.addEventListener('error', reject, { once: true })
                  video.play()
                })

                const snapshot = await snapImage(video, media.url)
                video.remove()
                return { url: snapshot ?? media.url, type: media.type }
              } catch (error) {
                console.error('Error loading video:', media.url, error)
                return { url: media.url, type: media.type }
              }
            }
            return { url: media.url, type: media.type }
          })
        )

        setListUrl(urls)
        const list = await processImages(urls)
        setListAspectRatios(list)
      } catch (error) {
        console.error('Error processing images:', error)
      }
    }

    fetchUrls()

    return () => {
      // Cleanup nếu có request nào bị treo
      setListUrl([])
      setListAspectRatios([])
      setLoading([])
    }
  }, [listMedia])

  const LoadingPlaceholder = ({ className }: { className?: string }) => (
    <div className={`bg-gray-300 flex items-center justify-center ${className || 'w-full h-full'}`}>
      <LoadingSpinner className='w-10 h-10' type='window' />
    </div>
  )

  const MediaItemWithLoading = ({
    src,
    type,
    className,
    index,
    style
  }: {
    src: string
    type: MediaTypeEnum
    className?: string
    index: number
    style?: React.CSSProperties
  }) => {
    if (loading[index]) {
      return <LoadingPlaceholder className={className} />
    }
    return <GridMediaItem src={src} type={type} className={className} style={style} alt={`Media ${index}`} />
  }

  const renderGridPreviewImages = () => {
    // Render single image
    const renderSingleImage = () => {
      if (listMedia[0].type == MediaTypeEnum.VIDEO && type != 'edit') {
        return (
          <div className='flex justify-center items-center w-full h-full'>
            {loading[0] ? <LoadingPlaceholder className='w-full h-[500px]' /> : <VideoPlayer src={listMedia[0].url} />}
          </div>
        )
      }
      return (
        <div
          className='flex justify-center items-center'
          style={{
            backgroundColor: `${bgColor}`
          }}
        >
          {loading[0] ? (
            <LoadingPlaceholder
              className={type == 'edit' ? 'rounded-lg mb-1 w-[450px] h-[500px]' : 'mb-1 w-full h-[500px] last:mb-0'}
            />
          ) : (
            <GridMediaItem
              src={listUrl[0].url}
              alt={listUrl[0].url}
              type={listMedia[0].type}
              className={type == 'edit' ? 'rounded-lg mb-1 w-[450px]' : 'mb-1 w-full max-h-[500px] last:mb-0'}
            />
          )}
        </div>
      )
    }

    // Render two images
    const renderTwoImages = () => {
      if (listAspectRatios.some((aspectRatio) => aspectRatio > 0.75)) {
        return (
          <>
            <div className={`grid grid-flow-col gap-1`}>
              <MediaItemWithLoading
                src={listUrl[0].url}
                type={listUrl[0].type}
                index={0}
                className={
                  type == 'edit' ? 'h-[280px] rounded-l-lg mb-1 object-cover' : 'h-[280px] mb-1 object-cover last:mb-0'
                }
              />
              <MediaItemWithLoading
                src={listUrl[1].url}
                type={listUrl[1].type}
                index={1}
                className={
                  type == 'edit' ? 'h-[280px] rounded-r-lg mb-1 object-cover' : 'h-[280px] mb-1 object-cover last:mb-0'
                }
              />
            </div>
          </>
        )
      } else {
        return (
          <>
            <div className={`flex flex-col gap-1`}>
              <div>
                <MediaItemWithLoading
                  src={listUrl[0].url}
                  type={listUrl[0].type}
                  index={0}
                  className={
                    type == 'edit'
                      ? 'w-[450px] rounded-t-lg mb-1 object-cover'
                      : 'max-h-[280px] w-full mb-1 object-cover last:mb-0'
                  }
                />
              </div>
              <div className=''>
                <MediaItemWithLoading
                  src={listUrl[1].url}
                  type={listUrl[1].type}
                  index={1}
                  className={
                    type == 'edit'
                      ? 'w-[450px] rounded-b-lg object-cover'
                      : 'w-full max-h-[280px] mb-1 object-cover last:mb-0'
                  }
                />
              </div>
            </div>
          </>
        )
      }
    }

    // Render three images
    const renderThreeImages = () => {
      if (
        (listAspectRatios[0] > 0.75 && listAspectRatios[1] > 0.75) ||
        (listAspectRatios[0] > 0.75 && listAspectRatios[2] > 0.75)
      ) {
        return (
          <>
            <div className={`grid grid-flow-col gap-1`}>
              <MediaItemWithLoading
                src={listUrl[0].url}
                type={listUrl[0].type}
                index={0}
                className={
                  type == 'edit'
                    ? 'col-span-8 w-[450px] h-full rounded-t-lg mb-1 object-cover'
                    : 'w-[450px] max-h-[400px] mb-1 object-cover last:mb-0'
                }
              />
              <div className='grid gap-1 col-span-4' style={{ gridTemplateRows: 'repeat(2, 1fr)' }}>
                <MediaItemWithLoading
                  src={listUrl[1].url}
                  type={listUrl[1].type}
                  index={1}
                  className={
                    type == 'edit'
                      ? 'w-full h-[200px] rounded-tr-lg object-cover'
                      : 'w-full h-[200px] object-cover last:mb-0'
                  }
                />
                <MediaItemWithLoading
                  src={listUrl[2].url}
                  type={listUrl[2].type}
                  index={2}
                  className={
                    type == 'edit'
                      ? 'w-full h-[200px] rounded-br-lg object-cover'
                      : 'w-full h-[200px] object-cover last:mb-0'
                  }
                />
              </div>
            </div>
          </>
        )
      }
      return (
        <>
          <div className={`flex flex-col gap-1`}>
            <div>
              <MediaItemWithLoading
                src={listUrl[0].url}
                type={listUrl[0].type}
                index={0}
                className={
                  type == 'edit'
                    ? 'w-[450px] max-h-[300px] rounded-t-lg mb-1 object-cover'
                    : 'w-full max-h-[300px] mb-1 object-cover last:mb-0'
                }
              />
            </div>
            <div className='grid gap-1' style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <MediaItemWithLoading
                src={listUrl[1].url}
                type={listUrl[1].type}
                index={1}
                className={
                  type == 'edit' ? 'h-[250px] rounded-bl-lg object-cover' : 'h-[250px] mb-1 object-cover last:mb-0'
                }
              />
              <MediaItemWithLoading
                src={listUrl[2].url}
                type={listUrl[2].type}
                index={2}
                className={
                  type == 'edit' ? 'h-[250px] rounded-br-lg object-cover' : 'h-[250px] mb-1 object-cover last:mb-0'
                }
              />
            </div>
          </div>
        </>
      )
    }

    // Render four images
    const renderFourImages = () => {
      if (listAspectRatios[0] > 0.75) {
        return (
          <>
            <div className={`grid w-full`}>
              <div className='grid grid-flow-col gap-1 w-full'>
                <MediaItemWithLoading
                  src={listUrl[0].url}
                  type={listUrl[0].type}
                  index={0}
                  className={
                    type == 'edit'
                      ? 'w-full h-[220px] rounded-tl-lg object-cover aspect-[4/3]'
                      : 'max-w-[290px] mt-3 mb-1 object-cover last:mb-0'
                  }
                />
                <MediaItemWithLoading
                  src={listUrl[1].url}
                  type={listUrl[1].type}
                  index={1}
                  className={
                    type == 'edit'
                      ? 'w-full h-[220px] rounded-tr-lg object-cover aspect-[4/3]'
                      : 'w-full min-h-[150px] max-h-[160px] mb-1 object-cover last:mb-0'
                  }
                />
              </div>
              <div className='grid grid-flow-col gap-1'>
                <MediaItemWithLoading
                  src={listUrl[2].url}
                  type={listUrl[2].type}
                  index={2}
                  className={
                    type == 'edit'
                      ? 'w-full h-[220px] rounded-bl-lg object-cover'
                      : 'w-full min-h-[150px] max-h-[160px] mb-1 object-cover last:mb-0'
                  }
                />
                <MediaItemWithLoading
                  src={listUrl[3].url}
                  type={listUrl[3].type}
                  index={3}
                  className={
                    type == 'edit'
                      ? 'w-full h-[220px] rounded-br-lg object-cover'
                      : 'w-full min-h-[150px] max-h-[160px] mb-1 object-cover last:mb-0'
                  }
                />
              </div>
            </div>
          </>
        )
      }
      return (
        <div className={`flex flex-col gap-1`}>
          <div>
            <MediaItemWithLoading
              src={listUrl[0].url}
              type={listUrl[0].type}
              index={0}
              className={
                type == 'edit' ? 'w-full rounded-t-lg object-cover' : 'w-full mt-3 mb-1 object-cover last:mb-0'
              }
            />
          </div>
          <div className='grid gap-1' style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <MediaItemWithLoading
              src={listUrl[1].url}
              type={listUrl[1].type}
              index={1}
              className={
                type == 'edit' ? 'h-[150px] rounded-bl-lg object-cover' : 'h-[150px] mb-1 object-cover last:mb-0'
              }
            />
            <MediaItemWithLoading
              src={listUrl[2].url}
              type={listUrl[2].type}
              index={2}
              className={
                type == 'edit' ? 'h-[150px] rounded-none object-cover' : 'h-[150px] mb-1 object-cover last:mb-0'
              }
            />
            <MediaItemWithLoading
              src={listUrl[3].url}
              type={listUrl[3].type}
              index={3}
              className={
                type == 'edit'
                  ? 'w-full h-[150px] rounded-br-lg object-cover'
                  : 'w-full h-[150px] mb-1 object-cover last:mb-0'
              }
            />
          </div>
        </div>
      )
    }

    // Render default images
    const renderDefaultImages = () => {
      if (listAspectRatios.filter((aspectRatio) => aspectRatio > 0.7).length >= 4) {
        return (
          <div className={`flex flex-col gap-1`}>
            <div className='grid grid-flow-col'>
              <MediaItemWithLoading
                src={listUrl[0].url}
                type={listUrl[0].type}
                index={0}
                className={type == 'edit' ? 'w-full rounded-tl-lg object-cover' : 'w-full h-full mb-1 object-cover'}
              />
              <MediaItemWithLoading
                src={listUrl[1].url}
                type={listUrl[1].type}
                index={1}
                className={
                  type == 'edit' ? 'w-full h-full rounded-tr-lg object-cover' : 'h-full mb-1 object-cover last:mb-0'
                }
              />
            </div>
            <div className='grid gap-1' style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <MediaItemWithLoading
                src={listUrl[2].url}
                type={listUrl[2].type}
                index={2}
                className={type == 'edit' ? 'w-full h-[150px] rounded-bl-lg object-cover' : 'h-full mb-1 object-cover'}
              />
              <MediaItemWithLoading
                src={listUrl[3].url}
                type={listUrl[3].type}
                index={3}
                className={type == 'edit' ? 'w-full h-[150px] rounded-none object-cover' : 'h-full mb-1 object-cover'}
              />

              <div className='relative'>
                <MediaItemWithLoading
                  src={listUrl[4].url}
                  type={listUrl[4].type}
                  index={4}
                  className={`${listMedia.length > 5 ? 'brightness-75 ' : ''} ${
                    type == 'edit' ? 'w-full h-[150px] rounded-br-lg object-cover' : 'h-full mb-1 object-cover'
                  }`}
                />
                <div className='flex justify-center items-center w-full h-full absolute top-0 left-0'>
                  <span className={`text-4xl text-white ${listMedia.length > 5 ? '' : 'hidden'}`}>
                    {'+' + (listMedia.length - 4)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className={`grid grid-cols-2 gap-1`}>
          <div className='grid gap-1'>
            <MediaItemWithLoading
              src={listUrl[0].url}
              type={listUrl[0].type}
              index={0}
              className={
                type == 'edit'
                  ? 'w-full h-[225px] rounded-tl-lg aspect-[4/3] object-cover'
                  : 'w-full h-full mb-1 object-cover'
              }
            />
            <MediaItemWithLoading
              src={listUrl[1].url}
              type={listUrl[1].type}
              index={1}
              className={
                type == 'edit'
                  ? 'w-full h-[225px] rounded-bl-lg aspect-[4/3] object-cover'
                  : 'w-full h-full mb-1 object-cover'
              }
            />
          </div>
          <div
            className='grid gap-1'
            style={{ gridTemplateRows: 'repeat(3, 1fr)', height: 'calc(2 * 225px + 0.5rem)' }}
          >
            <MediaItemWithLoading
              src={listUrl[2].url}
              type={listUrl[2].type}
              index={2}
              className={type == 'edit' ? 'w-full rounded-tr-lg object-cover' : 'w-full h-full mb-1 object-cover'}
              style={{ height: 'calc((2 * 225px )/3)' }}
            />
            <MediaItemWithLoading
              src={listUrl[3].url}
              type={listUrl[3].type}
              index={3}
              className={type == 'edit' ? 'w-full object-cover' : 'w-full h-full mb-1 object-cover'}
              style={{ height: 'calc((2 * 225px )/3)' }}
            />

            <div className='relative'>
              <MediaItemWithLoading
                src={listUrl[4].url}
                type={listUrl[4].type}
                index={4}
                style={{ height: 'calc((2 * 225px )/3)' }}
                className={`${
                  type == 'edit' ? 'w-full rounded-br-lg object-cover' : 'w-full h-full mb-1 object-cover'
                } ${listMedia.length > 5 ? 'brightness-75' : ''}`}
              />
              <span
                className={`text-4xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                  listMedia.length > 5 ? '' : 'hidden'
                }`}
              >
                {'+' + (listMedia.length - 4)}
              </span>
            </div>
          </div>
        </div>
      )
    }

    // Render based on the length of the preview images
    switch (listMedia.length) {
      case 1:
        return renderSingleImage()

      case 2:
        return renderTwoImages()

      case 3:
        return renderThreeImages()

      case 4:
        return renderFourImages()

      default:
        return renderDefaultImages()
    }
  }
  if (!listUrl.length) {
    return <LoadingPlaceholder className='w-full min-h-[300px] h-auto' />
  }

  return !listAspectRatios || (listMedia.length < 5 && listAspectRatios.length < listMedia.length) ? (
    <LoadingPlaceholder className='w-full min-h-[300px] h-auto' />
  ) : (
    <>{renderGridPreviewImages()}</>
  )
}

export default GridMediaGallery
