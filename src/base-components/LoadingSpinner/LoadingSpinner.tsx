interface Props {
  type?: string
  className?: string
  color?: string
}

const LoadingSpinner = ({ type, className, color }: Props) => {
  if (type == 'window') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <style>{`
          .loader {
            width: 50px;
            aspect-ratio: 1;
            border-radius: 50%;
            border: 4px solid ${color ? color : '#0866FF'} ;
            animation:
              l20-1 1.4s infinite linear alternate,
              l20-2 2.8s infinite linear;
          }
          @keyframes l20-1 {
            0% {
              clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
            }
            12.5% {
              clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
            }
            25% {
              clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
            }
            50% {
              clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
            }
            62.5% {
              clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
            }
            75% {
              clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
            }
            100% {
              clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
            }
          }
          @keyframes l20-2 {
            0% {
              transform: scaleY(1) rotate(0deg);
            }
            49.99% {
              transform: scaleY(1) rotate(135deg);
            }
            50% {
              transform: scaleY(-1) rotate(0deg);
            }
            100% {
              transform: scaleY(-1) rotate(-135deg);
            }
          }
        `}</style>
        <div className='loader'></div>
      </div>
    )
  }
  return (
    <svg className={`animate-spin ${className}`} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
      <circle className='opacity-50' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
      <path
        className='opacity-100'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      ></path>
    </svg>
  )
}

export default LoadingSpinner
