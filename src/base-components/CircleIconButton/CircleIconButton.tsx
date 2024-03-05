interface CircleIconButtonProps {
  children: React.ReactNode
  size?: number
}

export const CircleIconButton = ({ children, size }: CircleIconButtonProps) => {
  return (
    <div
      style={{
        height: size ? `${size}px` : '36px',
        width: size ? `${size}px` : '36px'
      }}
      className={` rounded-full flex justify-center items-center bg-[#e4e6eb] hover:bg-[#d8dadf]`}
    >
      {children}
    </div>
  )
}

export default CircleIconButton
