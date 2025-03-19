import { useState, useEffect } from 'react'
import GridMediaItem from 'src/base-components/GridMediaItem'
import { PreviewMediaContentType } from 'src/types/media.type.ts'

interface Props {
  previewMediaContent: PreviewMediaContentType[]
}

function GridGallery({ previewMediaContent }: Props) {
  const [listAspectRatios, setListAspectRatios] = useState<number[]>([])

  async function loadImageAsync(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const PreviewImage = new Image()
      PreviewImage.onload = () => resolve(PreviewImage)
      PreviewImage.onerror = reject
      PreviewImage.src = src
    })
  }

  async function processImages() {
    const listAspectRatiosTemp: number[] = []
    for (let i = 0; i < previewMediaContent.length && i < 5; i++) {
      try {
        const PreviewImage = await loadImageAsync(previewMediaContent[i].url)
        listAspectRatiosTemp.push(PreviewImage.height / PreviewImage.width)
      } catch (error) {
        console.error('Error loading image:', error)
      }
    }

    return listAspectRatiosTemp
  }

  useEffect(() => {
    const promise = processImages()
    promise.then((list) => setListAspectRatios(list))
  }, [previewMediaContent])

  const renderGridPreviewImages = () => {
    // Render single image
    const renderSingleImage = () => {
      return (
        <GridMediaItem
          src={previewMediaContent[0].url}
          alt={previewMediaContent[0].url}
          className='rounded-lg mb-1 w-[450px]'
        ></GridMediaItem>
      )
    }

    // Render two images
    const renderTwoImages = () => {
      if (listAspectRatios.some((aspectRatio) => aspectRatio > 0.75)) {
        return (
          <>
            <div className={`grid grid-flow-col gap-1`}>
              <GridMediaItem
                src={previewMediaContent[0].url}
                className='h-[280px] rounded-l-lg  mb-1 object-cover'
              ></GridMediaItem>
              <GridMediaItem
                src={previewMediaContent[1].url}
                className='h-[280px] rounded-r-lg mb-1 object-cover'
              ></GridMediaItem>
            </div>
          </>
        )
      } else {
        return (
          <>
            <div className={`flex flex-col gap-1`}>
              <div>
                <GridMediaItem
                  src={previewMediaContent[0].url}
                  className=' w-[450px] rounded-t-lg  mb-1 object-cover'
                ></GridMediaItem>
              </div>
              <div className=''>
                <GridMediaItem
                  src={previewMediaContent[1].url}
                  className='w-[450px] rounded-b-lg object-cover'
                ></GridMediaItem>
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
              <GridMediaItem
                src={previewMediaContent[0].url}
                className='col-span-8 w-[450px] h-full rounded-t-lg mb-1 object-cover'
              ></GridMediaItem>
              <div className='grid gap-1 col-span-4' style={{ gridTemplateRows: 'repeat(2, 1fr)' }}>
                <GridMediaItem
                  src={previewMediaContent[1].url}
                  className='w-full h-[200px] rounded-tr-lg object-cover'
                ></GridMediaItem>
                <GridMediaItem
                  src={previewMediaContent[2].url}
                  className='w-full h-[200px] rounded-br-lg object-cover'
                ></GridMediaItem>
              </div>
            </div>
          </>
        )
      }
      return (
        <>
          <div className={`flex flex-col gap-1`}>
            <div>
              <GridMediaItem
                src={previewMediaContent[0].url}
                className='w-[450px] max-h-[300px] rounded-t-lg mb-1 object-cover'
              ></GridMediaItem>
            </div>
            <div className='grid gap-1' style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <GridMediaItem
                src={previewMediaContent[1].url}
                className='h-[250px] rounded-bl-lg object-cover'
              ></GridMediaItem>
              <GridMediaItem
                src={previewMediaContent[2].url}
                className='h-[250px] rounded-br-lg object-cover'
              ></GridMediaItem>
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
                <GridMediaItem
                  src={previewMediaContent[0].url}
                  className='w-full h-[220px] rounded-tl-lg object-cover aspect-[4/3]'
                ></GridMediaItem>
                <GridMediaItem
                  src={previewMediaContent[1].url}
                  className='w-full h-[220px] rounded-tr-lg object-cover aspect-[4/3] '
                ></GridMediaItem>
              </div>
              <div className='grid grid-flow-col gap-1'>
                <GridMediaItem
                  src={previewMediaContent[2].url}
                  className='w-full h-[220px] rounded-bl-lg object-cover'
                ></GridMediaItem>
                <GridMediaItem
                  src={previewMediaContent[3].url}
                  className='w-full h-[220px] rounded-br-lg object-cover '
                ></GridMediaItem>
              </div>
            </div>
          </>
        )
      }
      return (
        <div className={`flex flex-col gap-1`}>
          <div>
            <GridMediaItem
              src={previewMediaContent[0].url}
              className='w-full rounded-t-lg object-cover'
            ></GridMediaItem>
          </div>
          <div className='grid gap-1' style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <GridMediaItem
              src={previewMediaContent[1].url}
              className='h-[150px] rounded-bl-lg  object-cover'
            ></GridMediaItem>
            <GridMediaItem
              src={previewMediaContent[2].url}
              className='h-[150px] rounded-none object-cover'
            ></GridMediaItem>
            <GridMediaItem
              src={previewMediaContent[3].url}
              className='w-full h-[150px] rounded-br-lg object-cover'
            ></GridMediaItem>
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
              <GridMediaItem
                src={previewMediaContent[0].url}
                className='w-full rounded-tl-lg object-cover '
              ></GridMediaItem>
              <GridMediaItem
                src={previewMediaContent[1].url}
                className=' w-full h-full rounded-tr-lg  object-cover '
              ></GridMediaItem>
            </div>
            <div className='grid gap-1' style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <GridMediaItem
                src={previewMediaContent[2].url}
                className='w-full h-[150px] rounded-bl-lg  object-cover '
              ></GridMediaItem>
              <GridMediaItem
                src={previewMediaContent[3].url}
                className='w-full h-[150px] rounded-none object-cover '
              ></GridMediaItem>

              <div className='relative'>
                <GridMediaItem
                  src={previewMediaContent[4].url}
                  className={`w-full h-[150px] rounded-br-lg object-cover ${
                    previewMediaContent.length > 5 ? 'brightness-75' : ''
                  }`}
                ></GridMediaItem>
                <div className='flex justify-center items-center w-full h-full absolute top-0 left-0'>
                  <span className={`text-4xl text-white ${previewMediaContent.length > 5 ? '' : 'hidden'}`}>
                    {'+' + (previewMediaContent.length - 4)}
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
            <GridMediaItem
              src={previewMediaContent[0].url}
              className='w-full h-[225px] rounded-tl-lg aspect-[4/3] object-cover'
            ></GridMediaItem>
            <GridMediaItem
              src={previewMediaContent[1].url}
              className='w-full h-[225px] rounded-bl-lg aspect-[4/3] object-cover'
            ></GridMediaItem>
          </div>
          <div
            className='grid gap-1'
            style={{ gridTemplateRows: 'repeat(3, 1fr)', height: 'calc(2 * 225px + 0.5rem)' }}
          >
            <GridMediaItem
              src={previewMediaContent[2].url}
              className='w-full rounded-tr-lg  object-cover'
              style={{ height: 'calc((2 * 225px )/3)' }}
            ></GridMediaItem>
            <GridMediaItem
              src={previewMediaContent[3].url}
              className='w-full object-cover'
              style={{ height: 'calc((2 * 225px )/3)' }}
            ></GridMediaItem>

            <GridMediaItem
              src={previewMediaContent[4].url}
              style={{ height: 'calc((2 * 225px )/3)' }}
              className={`w-full rounded-br-lg  object-cover ${previewMediaContent.length > 5 ? 'brightness-75' : ''}`}
            ></GridMediaItem>
            <span
              className={`text-4xl text-white absolute mt-[370px] ml-[80px] ${
                previewMediaContent.length > 5 ? '' : 'hidden'
              }`}
            >
              {'+' + (previewMediaContent.length - 4)}
            </span>
          </div>
        </div>
      )
    }

    // Render based on the length of the preview images
    switch (previewMediaContent.length) {
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

  return !listAspectRatios ||
    (previewMediaContent.length < 5 && listAspectRatios.length < previewMediaContent.length) ? null : (
    <>{renderGridPreviewImages()}</>
  )
}

export default GridGallery
