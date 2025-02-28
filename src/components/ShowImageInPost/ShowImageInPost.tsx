import { useEffect, useState } from 'react'
import { PostImageType } from 'src/types/media.type.ts'

interface Props {
  listImage: PostImageType[]
}

function ShowImageInPost({ listImage }: Props) {
  const [listAspectRatios, setListAspectRatios] = useState<number[]>([])

  async function loadImageAsync(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  async function processImages() {
    const listAspectRatiosTemp: number[] = []
    for (let i = 0; i < listImage.length && i < 5; i++) {
      try {
        const img = await loadImageAsync(listImage[i].url)
        listAspectRatiosTemp.push(img.height / img.width)
      } catch (error) {
        console.error('Error loading image:', error)
      }
    }

    return listAspectRatiosTemp
  }

  useEffect(() => {
    const promise = processImages()
    promise.then((list) => setListAspectRatios(list))
  }, [listImage])

  switch (listImage.length) {
    case 1:
      return <img src={listImage[0].url} alt={listImage[0].url} className=' mb-1 w-full mt-3 last:mb-0'></img>

    case 2:
      if (listAspectRatios[0] > 0.75 || listAspectRatios[1] > 0.75) {
        return (
          <>
            <div className={`flex gap-1 mt-3 `}>
              <img src={listImage[0].url} className='flex-1 h-[280px]  mb-1 object-cover last:mb-0'></img>
              <img src={listImage[1].url} className='w-[223px] h-[280px] mb-1 object-cover last:mb-0'></img>
            </div>
          </>
        )
      } else {
        return (
          <>
            <div className={`flex flex-col gap-1 mt-3 `}>
              <div>
                <img src={listImage[0].url} className='max-h-[280px] w-full mb-1 object-cover last:mb-0'></img>
              </div>
              <div className=''>
                <img src={listImage[1].url} className='w-full max-h-[280px] mb-1 object-cover last:mb-0'></img>
              </div>
            </div>
          </>
        )
      }

    case 3:
      if (
        (listAspectRatios[0] > 0.7 && listAspectRatios[1] > 0.7) ||
        (listAspectRatios[0] > 0.7 && listAspectRatios[2] > 0.7)
      ) {
        return (
          <>
            <div className={`flex gap-1 mt-3`}>
              <div>
                <img src={listImage[0].url} className='w-[450px] max-h-[400px]  mb-1 object-cover last:mb-0'></img>
              </div>
              <div className='grid gap-1' style={{ gridTemplateRows: 'repeat(2, 1fr)' }}>
                <img src={listImage[1].url} className='w-full h-[200px]   object-cover last:mb-0'></img>
                <img src={listImage[2].url} className='w-full h-[200px]  object-cover last:mb-0'></img>
              </div>
            </div>
          </>
        )
      }
      return (
        <>
          <div className={`flex flex-col gap-1 mt-3`}>
            <div>
              <img src={listImage[0].url} className='w-full max-h-[300px]  mb-1 object-cover last:mb-0'></img>
            </div>
            <div className='grid gap-1' style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <img src={listImage[1].url} className='h-[250px]  mb-1 object-cover last:mb-0'></img>
              <img src={listImage[2].url} className='h-[250px]  mb-1 object-cover last:mb-0'></img>
            </div>
          </div>
        </>
      )

    case 4:
      if (listAspectRatios[0] > 0.7) {
        return (
          <>
            <div className={`flex gap-1`}>
              <div>
                <img src={listImage[0].url} className='max-w-[290px] mt-3 mb-1 object-cover last:mb-0'></img>
              </div>
              <div className='grid gap-1' style={{ gridTemplateRows: 'repeat(3, 1fr)' }}>
                <img
                  src={listImage[1].url}
                  className='w-full min-h-[150px] max-h-[160px] mb-1 object-cover last:mb-0'
                ></img>
                <img
                  src={listImage[2].url}
                  className='w-full min-h-[150px] max-h-[160px] mb-1 object-cover last:mb-0'
                ></img>
                <img
                  src={listImage[3].url}
                  className='w-full min-h-[150px] max-h-[160px] mb-1 object-cover last:mb-0'
                ></img>
              </div>
            </div>
          </>
        )
      }
      return (
        <>
          <div className={`flex flex-col gap-1`}>
            <div>
              <img src={listImage[0].url} className='w-full mt-3 mb-1 object-cover last:mb-0'></img>
            </div>
            <div className='grid gap-1' style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <img src={listImage[1].url} className='h-[150px] mb-1 object-cover last:mb-0'></img>
              <img src={listImage[2].url} className='h-[150px] mb-1 object-cover last:mb-0'></img>
              <img src={listImage[3].url} className='w-full h-[150px] mb-1 object-cover last:mb-0'></img>
            </div>
          </div>
        </>
      )

    default:
      return (
        <>
          <div className={`grid grid-cols-2 gap-1 mt-3`}>
            <div className='grid gird-rows-2 gap-1'>
              <img src={listImage[0].url} className='w-full h-full mb-1 object-cover'></img>
              <img src={listImage[1].url} className='h-full mb-1 object-cover last:mb-0'></img>
            </div>
            <div className='grid gap-1' style={{ gridTemplateRows: 'repeat(3, 1fr)' }}>
              <img src={listImage[2].url} className='h-full mb-1 object-cover'></img>
              <img src={listImage[3].url} className='h-full mb-1 object-cover'></img>

              <img
                src={listImage[4].url}
                className={`h-full mb-1 object-cover ${listImage.length > 5 ? 'brightness-75' : ''}`}
              ></img>
              <span
                className={`text-4xl text-white absolute mt-[370px] ml-[80px] ${listImage.length > 5 ? '' : 'hidden'}`}
              >
                {'+' + (listImage.length - 4)}
              </span>
            </div>
          </div>
        </>
      )
  }
}

export default ShowImageInPost
