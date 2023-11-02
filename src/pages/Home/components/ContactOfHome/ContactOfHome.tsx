function ContactOfHome() {
  return (
    <div className='w-[360px] fixed flex flex-col h-[670px] overflow-x-hidden overflow-y-auto custom-scrollbar mt-4'>
      <span className='text-[17px] text-[#65676B] my-2 mx-4 font-semibold'>Cuộc trò chuyện nhóm</span>
      <button className='h-[52px] w-[344] group hover:bg-[#e4e6e9] mx-2 rounded-md flex items-center'>
        <div className='h-9 w-9 mx-3 rounded-full flex justify-center items-center bg-[#e4e6eb] group-hover:bg-[#d8dadf]'>
          <svg viewBox='0 0 20 20' width='20px' height='20px' fill='black'>
            <g fillRule='evenodd' transform='translate(-446 -350)'>
              <g fillRule='nonzero'>
                <path d='M95 201.5h13a1 1 0 1 0 0-2H95a1 1 0 1 0 0 2z' transform='translate(354.5 159.5)'></path>
                <path d='M102.5 207v-13a1 1 0 1 0-2 0v13a1 1 0 1 0 2 0z' transform='translate(354.5 159.5)'></path>
              </g>
            </g>
          </svg>
        </div>
        <span className='text-[15px] text-[#050505] font-medium'>Tạo nhóm mới</span>
      </button>
    </div>
  )
}

export default ContactOfHome
