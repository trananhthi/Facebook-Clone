import { useEffect, useState } from 'react'

interface Props {
  previewImage: string[]
}

function ShowPreviewImage({ previewImage }: Props) {
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
    for (let i = 0; i < previewImage.length && i < 5; i++) {
      try {
        const img = await loadImageAsync(previewImage[i])
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
  }, [previewImage])

  switch (previewImage.length) {
    case 1:
      return <img src={previewImage[0]} alt={previewImage[0]} className='rounded-lg mb-1 w-[450px] last:mb-0'></img>

    case 2:
      if (listAspectRatios[0] > 0.75 || listAspectRatios[1] > 0.75) {
        return (
          <>
            <div className={`flex gap-1`}>
              <img src={previewImage[0]} className='flex-1 h-[280px] rounded-l-lg  mb-1 object-cover last:mb-0'></img>
              <img src={previewImage[1]} className='w-[223px] h-[280px] rounded-r-lg mb-1 object-cover last:mb-0'></img>
            </div>
          </>
        )
      } else {
        return (
          <>
            <div className={`flex flex-col gap-1`}>
              <div>
                <img src={previewImage[0]} className=' w-[450px] rounded-t-lg  mb-1 object-cover last:mb-0'></img>
              </div>
              <div className=''>
                <img src={previewImage[1]} className='w-[450px] rounded-b-lg mb-1 object-cover last:mb-0'></img>
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
            <div className={`flex gap-1`}>
              <div>
                <img
                  src={previewImage[0]}
                  className='w-[450px] max-h-[400px] rounded-t-lg mb-1 object-cover last:mb-0'
                ></img>
              </div>
              <div className='grid gap-1' style={{ gridTemplateRows: 'repeat(2, 1fr)' }}>
                <img src={previewImage[1]} className='w-full h-[200px] rounded-tr-lg  object-cover last:mb-0'></img>
                <img src={previewImage[2]} className='w-full h-[200px] rounded-br-lg  object-cover last:mb-0'></img>
              </div>
            </div>
          </>
        )
      }
      return (
        <>
          <div className={`flex flex-col gap-1`}>
            <div>
              <img
                src={previewImage[0]}
                className='w-[450px] max-h-[300px] rounded-t-lg mb-1 object-cover last:mb-0'
              ></img>
            </div>
            <div className='grid gap-1' style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <img src={previewImage[1]} className='h-[250px] rounded-bl-lg mb-1 object-cover last:mb-0'></img>
              <img src={previewImage[2]} className='w-full h-[250px] rounded-br-lg mb-1 object-cover last:mb-0'></img>
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
                <img src={previewImage[0]} className='max-w-[290px] rounded-l-lg mb-1 object-cover last:mb-0'></img>
              </div>
              <div className='grid gap-1' style={{ gridTemplateRows: 'repeat(3, 1fr)' }}>
                <img
                  src={previewImage[1]}
                  className='w-full min-h-[150px] max-h-[160px] rounded-tr-lg mb-1 object-cover last:mb-0'
                ></img>
                <img
                  src={previewImage[2]}
                  className='w-full min-h-[150px] max-h-[160px] rounded-none mb-1 object-cover last:mb-0'
                ></img>
                <img
                  src={previewImage[3]}
                  className='w-full min-h-[150px] max-h-[160px] rounded-br-lg mb-1 object-cover last:mb-0'
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
              <img src={previewImage[0]} className='w-full rounded-t-lg mb-1 object-cover last:mb-0'></img>
            </div>
            <div className='grid gap-1' style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <img src={previewImage[1]} className='h-[150px] rounded-bl-lg mb-1 object-cover last:mb-0'></img>
              <img src={previewImage[2]} className='h-[150px] rounded-none mb-1 object-cover last:mb-0'></img>
              <img src={previewImage[3]} className='w-full h-[150px] rounded-br-lg mb-1 object-cover last:mb-0'></img>
            </div>
          </div>
        </>
      )

    default:
      return (
        <>
          <div className={`grid grid-cols-2 gap-1`}>
            <div>
              <img src={previewImage[0]} className='w-full h-[230px] rounded-tl-lg mb-1 object-cover'></img>
              <img src={previewImage[1]} className='h-[230px] rounded-bl-lg mb-1 object-cover last:mb-0'></img>
            </div>
            <div className='grid gap-1' style={{ gridTemplateRows: 'repeat(3, 1fr)' }}>
              <img src={previewImage[2]} className='h-full rounded-tr-lg mb-1 object-cover'></img>
              <img src={previewImage[3]} className='h-full mb-1 object-cover'></img>

              <img
                src={previewImage[4]}
                className={`h-full rounded-br-lg mb-1 object-cover ${previewImage.length > 5 ? 'brightness-75' : ''}`}
              ></img>
              <span
                className={`text-4xl text-white absolute mt-[370px] ml-[80px] ${
                  previewImage.length > 5 ? '' : 'hidden'
                }`}
              >
                {'+' + (previewImage.length - 4)}
              </span>
            </div>
          </div>
        </>
      )
  }
}

export default ShowPreviewImage
