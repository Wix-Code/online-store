import React from 'react'

const page = () => {
  return (
    <div className='max-w-[1000px] my-5 space-y-8 m-auto'>
      <div className='flex-1'>
        <img className='w-[50%]' src="https://pictures-nigeria.jijistatic.net/160598210_MzAwLTI3MC00NzlhY2Y4Yjdi.webp" alt="" />
      </div>
      <div className='flex gap-4'>
        <div className='text-[12px] text-[#555555] text-justify font-[400] flex-1'>
          <p>We are a listening organization and will be glad to hear from you. For enquiries, refund, returns and complaints, do not hesitate to contact us at dportas2@gmail.com OR simply fill out the contact form below:</p>
        </div>
        <div className='flex-1 space-y-5'>
          <div className='flex flex-col space-y-1'>
            <label className='text-[12px] text-[#555555] font-[400]' htmlFor="">Your Name (required)</label>
            <input type="text" className='border-[1px] px-2 py-1.5 w-full outline-none border-[#eeeeee]' />
          </div>
          <div className='flex flex-col space-y-1'>
            <label className='text-[12px] text-[#555555] font-[400]' htmlFor="">Your Email (required)</label>
            <input type="text" className='border-[1px] px-2 py-1.5 w-full outline-none border-[#eeeeee]' />
          </div>
          <div className='flex flex-col space-y-1'>
            <label className='text-[12px] text-[#555555] font-[400]' htmlFor="">Subject</label>
            <input type="text" className='border-[1px] px-2 py-1.5 w-full outline-none border-[#eeeeee]' />
          </div>
          <div className='flex flex-col space-y-1'>
            <label className='text-[12px] text-[#555555] font-[400]' htmlFor="">Message</label>
            <textarea className='border-[1px] p-3 w-full resize-none h-[200px] outline-none border-[#eeeeee]' />
          </div>
          <button className='bg-[#eeeeee] cursor-pointer px-6 tracking-[1px] text-[#555555] p-2.5 text-[12px] font-[400]'>SEND</button>
        </div>
      </div>
    </div>
  )
}

export default page