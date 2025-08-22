import React from 'react'
import Image from "next/image";

const Banner = () => {
    return (
        <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center bg-[#E4FFF0]">
            <div className=" h-full lg:w-[60%] md:w-[90%] w-[95%] flex justify-between">
                <div className='relative h-[410px] w-[49%] bg-[#4CBA9B] flex rounded-xl '>
                    <div className='absolute top-8 left-10'>
                        <div className='flex space-x-5'>
                            <Image
                                src="/site/home/Vector.svg"
                                alt=""
                                width={10}
                                height={100}
                                className="h-[160px] w-fit opacity-15 object-cover"
                            />
                            <Image
                                src="/site/home/Vector.svg"
                                alt=""
                                width={280}
                                height={400}
                                className="h-[160px] w-fit opacity-15 object-cover rotate-100 mt-2"
                            />
                        </div>
                        <div className='flex space-x-5'>
                            <Image
                                src="/site/home/Vector.svg"
                                alt=""
                                width={280}
                                height={400}
                                className="h-[160px] w-fit opacity-15 object-cover"
                            />
                            <Image
                                src="/site/home/Vector.svg"
                                alt=""
                                width={280}
                                height={400}
                                className="h-[160px] w-fit opacity-15 object-cover rotate-100 mt-2"
                            />
                        </div>
                    </div>
                    <div className='z-10 absolute top-0 right-5'>
                        <Image
                            src="/site/home/m.png"
                            alt=""
                            width={200}
                            height={200}
                            className="h-[300px] w-[100%] object-cover "
                        />
                    </div>
                    <div className='z-11 h-fit w-[60%] absolute left-10 top-[50%] -translate-y-1/2 space-y-3  '>
                        <h1 className='text-white text-[28px] font-medium'>Monsoon Special Green</h1>
                        <p className='text-white text-[20px] font-medium'>Fresh, lush plants perfect for the summer season.</p>
                        <button className='border-2 border-white lg:h-[60px] lg:w-[191px] md:h-[35px] md:w-[110px] w-[90px] h-[30px] flex justify-center items-center lg:rounded-xl md:rounded-xl rounded-[5px] text-[#FFFFFF] lg:text-[20px]'>View Collection</button>
                    </div>
                </div>
                <div className='relative h-[410px] w-[49%] bg-white flex rounded-xl '>
                    <div className='absolute top-8 left-10'>
                        <div className='flex space-x-5 '>
                            <Image
                                src="/site/home/Vector-green.svg"
                                alt=""
                                width={10}
                                height={100}
                                className="h-[160px] w-fit opacity-15 object-cover"
                            />
                            <Image
                                src="/site/home/Vector-green.svg"
                                alt=""
                                width={280}
                                height={400}
                                className="h-[160px] w-fit opacity-15 object-cover rotate-100 mt-2"
                            />
                        </div>
                        <div className='flex space-x-5'>
                            <Image
                                src="/site/home/Vector-green.svg"
                                alt=""
                                width={280}
                                height={400}
                                className="h-[160px] w-fit opacity-15 object-cover"
                            />
                            <Image
                                src="/site/home/Vector-green.svg"
                                alt=""
                                width={280}
                                height={400}
                                className="h-[160px] w-fit opacity-15 object-cover rotate-100 mt-2"
                            />
                        </div>
                    </div>
                    <div className='z-10 absolute right-0 top-[40%] -translate-y-1/2'>
                        <Image
                            src="/site/home/sitaphal.png"
                            alt=""
                            width={200}
                            height={200}
                            className="h-[250px] w-[100%] object-cover "
                        />
                    </div>
                    <div className='z-11 h-fit w-[60%] absolute left-10 top-[50%] -translate-y-1/2 space-y-3  '>
                        <h1 className='text-[#1D2F33] text-[28px] font-semibold'>Monsoon Special Green</h1>
                        <p className='text-[#1D2F33] text-[20px] font-semibold'>Fresh, lush plants perfect for the summer season.</p>
                        <button className='bg-[#F37521] hover:bg-[#DA5700] lg:h-[60px] lg:w-[191px] md:h-[35px] md:w-[110px] w-[90px] h-[30px] flex justify-center items-center lg:rounded-xl md:rounded-xl rounded-[5px] text-[#FFFFFF] lg:text-[20px]'>View Collection</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
