import React from 'react'
import InfiniteMovingCardsDemo from './infinitemovingcards'

const Testimonials = () => {
    return (
  <>
        <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center bg-[#E4FFF0]">
            <div className=" h-full w-full">
                <div className="h-fit w-full flex flex-col items-center pt-5 lg:pb-15 pb-5 space-y-1">
                    <h1 className="text-[#00611F] lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
                        Best Selling <span className="text-black">Products</span>
                    </h1>
                    <p className="text-[#505050] lg:text-[20px] md:text-[22px] text-[16px] font-semibold">
                        Find what you are looking for
                    </p>
                </div>
                <div className='w-[100%]'>
                    <InfiniteMovingCardsDemo/>
                </div>
            </div>
        </div>
        
  </>
    )
}

export default Testimonials

