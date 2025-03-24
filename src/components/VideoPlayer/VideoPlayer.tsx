import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBackwardStep,
  faCompress,
  faExpand,
  faForwardStep,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark
} from '@fortawesome/free-solid-svg-icons'
import LoadingSpinner from 'src/base-components/LoadingSpinner'

interface Props {
  src: string
  autoPlay?: boolean
  initialVolume?: number
  className?: string
}

const VideoPlayer = ({ src, autoPlay = false, initialVolume = 0.5, className }: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay)
  const [duration, setDuration] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [volume, setVolume] = useState<number>(initialVolume)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [showControls, setShowControls] = useState<boolean>(true)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  // Loading and buffering states
  const [bufferedPercentage, setBufferedPercentage] = useState<number>(0)
  const [isBuffering, setIsBuffering] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const scrollPositionRef = useRef<number>(0)

  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const controlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const setVideoData = (): void => {
      setDuration(video.duration)
      setCurrentTime(video.currentTime)
      setIsLoading(false)
    }

    const handleTimeUpdate = (): void => {
      setCurrentTime(video.currentTime)
    }

    const handleVideoEnd = (): void => {
      setIsPlaying(false)
      setCurrentTime(video.duration)
    }

    // Add event listener for buffer progress
    const handleProgress = (): void => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        const percentLoaded = Math.round((bufferedEnd / video.duration) * 100)
        setBufferedPercentage(percentLoaded)
      }
    }

    // Detect when the video is buffering/stalled
    const handleWaiting = (): void => {
      setIsBuffering(true)
    }

    const handlePlaying = (): void => {
      setIsBuffering(false)
    }

    // Loading states
    const handleLoadStart = (): void => {
      setIsLoading(true)
    }

    const handleLoadedData = (): void => {
      setIsLoading(false)
    }

    video.preload = 'metadata' // Only load metadata initially

    video.addEventListener('loadedmetadata', setVideoData)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleVideoEnd)
    video.addEventListener('progress', handleProgress)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('loadeddata', handleLoadedData)

    return () => {
      video.removeEventListener('loadedmetadata', setVideoData)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleVideoEnd)
      video.removeEventListener('progress', handleProgress)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('loadstart', handleLoadStart)
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      // When user starts playing, begin loading the video content
      if (video.preload === 'metadata') {
        video.preload = 'auto'
      }

      video.play().catch((error) => {
        console.error('Error playing video:', error)
        setIsPlaying(false)
      })
    } else {
      video.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.volume = volume
    video.muted = isMuted
  }, [volume, isMuted])

  useEffect(() => {
    const hideControls = (): void => {
      if (!isHovering && isPlaying && !isBuffering) {
        setShowControls(false)
      }
    }

    if (isHovering || isBuffering) setShowControls(true)
    if (isPlaying && !isBuffering) {
      controlsTimeout.current = setTimeout(hideControls, 2000)
    } else {
      setShowControls(true)
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current)
    }

    return () => {
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current)
    }
  }, [isPlaying, isHovering, isBuffering])

  // Pause when video goes out of viewport
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isPlaying) {
          setIsPlaying(false)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(video)
    // return () => observer.disconnect()
  }, [isPlaying])

  const handlePlayPause = (): void => {
    setIsPlaying(!isPlaying)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVolume(parseFloat(e.target.value))
    setIsMuted(parseFloat(e.target.value) === 0)
  }

  const toggleMute = (): void => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = (): void => {
    if (!document.fullscreenElement && playerRef.current) {
      scrollPositionRef.current = window.scrollY
      playerRef.current.requestFullscreen().catch((err: Error) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`)
      })
      setIsFullscreen(true)
    } else if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setTimeout(() => {
          window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' })
        }, 0)
      })
      setIsFullscreen(false)
    }
  }

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const skip = (seconds: number): void => {
    const video = videoRef.current
    if (video) {
      video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), duration)
    }
  }

  // Show spinner if either loading or buffering
  const showSpinner = isLoading || isBuffering

  return (
    <div
      ref={playerRef}
      className={`relative w-full max-w-4xl mx-auto overflow-hidden shadow-lg ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        className='w-full h-auto'
        onClick={handlePlayPause}
        src={src}
        autoPlay={autoPlay}
        preload='metadata'
      />

      {/* Spinner for loading/buffering */}
      {showSpinner && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/40'>
          <LoadingSpinner className='w-10 h-10' type='window' />
        </div>
      )}

      {/* Video controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pb-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress bar */}
        <div className='relative w-full h-4 group flex items-center'>
          {/* Track background */}
          <div className='absolute w-full h-[0.15rem] bg-gray-600 rounded-full'>
            {/* Buffer indicator */}
            <div
              className='absolute top-0 left-0 h-full bg-gray-300 rounded-full'
              style={{ width: `${bufferedPercentage}%` }}
            />

            {/* Progress indicator */}
            <div
              className='absolute top-0 left-0 h-full bg-blue-500 rounded-full'
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* Thumb/button that appears on hover */}
          <div
            className='absolute h-3 w-3 bg-white rounded-full shadow-md transform -translate-y-0 opacity-0 group-hover:opacity-100 transition-opacity'
            style={{ left: `calc(${(currentTime / duration) * 100}% - 6px)` }}
          />

          {/* Invisible range input for interaction */}
          <input
            type='range'
            min='0'
            max={duration || 0}
            value={currentTime}
            onChange={handleTimeChange}
            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10'
          />
        </div>

        {/* Controls */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            {/* Play/Pause button */}
            <button
              onClick={handlePlayPause}
              className='flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors'
              disabled={isLoading}
            >
              {isPlaying ? (
                <FontAwesomeIcon icon={faPause} className='w-[14px] h-[14px] text-white' />
              ) : (
                <FontAwesomeIcon icon={faPlay} className='w-[14px] h-[14px] text-white' />
              )}
            </button>

            {/* Skip backward */}
            <button
              onClick={() => skip(-10)}
              className='text-white hover:text-blue-400 transition-colors'
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faBackwardStep} className='w-4 h-4' />
            </button>

            {/* Skip forward */}
            <button
              onClick={() => skip(10)}
              className='text-white hover:text-blue-400 transition-colors'
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faForwardStep} className='w-4 h-4' />
            </button>

            {/* Time display */}
            <div className='text-sm text-white'>
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            {/* Volume control */}
            <div className='flex items-center'>
              <button onClick={toggleMute} className='text-white hover:text-blue-400 transition-colors'>
                {isMuted ? (
                  <FontAwesomeIcon icon={faVolumeXmark} className='w-4 h-4' />
                ) : (
                  <FontAwesomeIcon icon={faVolumeHigh} className='w-4 h-4' />
                )}
              </button>
              <input
                type='range'
                min='0'
                max='1'
                step='0.01'
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className='w-20 h-1 ml-2 bg-gray-600 rounded-full appearance-none cursor-pointer'
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                    (isMuted ? 0 : volume) * 100
                  }%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, #4b5563 100%)`
                }}
              />
            </div>

            {/* Fullscreen button */}
            <button onClick={toggleFullscreen} className='text-white hover:text-blue-400 transition-colors'>
              {isFullscreen ? (
                <FontAwesomeIcon icon={faCompress} className='w-4 h-4' />
              ) : (
                <FontAwesomeIcon icon={faExpand} className='w-4 h-4' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Play/Pause overlay icon */}
      {!isPlaying && !showSpinner && (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div
            className='flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/70 hover:bg-blue-600/70 transition-colors cursor-pointer'
            onClick={handlePlayPause}
          >
            <FontAwesomeIcon icon={faPlay} className='w-10 h-10 text-white ml-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
