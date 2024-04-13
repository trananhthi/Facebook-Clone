interface CircleIconButtonProps {
  children: React.ReactNode
  size?: number
  bgColor?: string
  bgHoverColor?: string
}

export const CircleIconButton = ({ children, size, bgColor, bgHoverColor }: CircleIconButtonProps) => {
  return (
    <div
      style={{
        height: size ? `${size}px` : '36px',
        width: size ? `${size}px` : '36px'
      }}
      className={` rounded-full flex justify-center items-center bg-[${bgColor ? bgColor : '#e4e6eb'}] hover:bg-[${
        bgHoverColor ? bgHoverColor : '#d8dadf'
      }]`}
    >
      {children}
    </div>
  )
}

export default CircleIconButton
