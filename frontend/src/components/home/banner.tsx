import React from 'react'
import Image from "next/image";

const Banner = () => {
    return (
        <div className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center bg-[#E4FFF0]">
            <div className=" h-full lg:w-[60%] md:w-[90%] w-[95%] flex lg:flex-row flex-col justify-between items-center lg:space-y-0 space-y-5">
                <div className='relative lg:h-[410px] h-[370px] lg:w-[49%] w-full bg-[#4CBA9B] flex rounded-xl '>
                    <div className='absolute lg:top-8 top-18 lg:left-10 left-5'>
                        <div className='flex space-x-5'>
                            <Image
                                src="/site/home/Vector.svg"
                                alt=""
                                width={10}
                                height={100}
                                className="lg:h-[160px] h-[130px] w-fit opacity-15 object-cover"
                            />
                            <Image
                                src="/site/home/Vector.svg"
                                alt=""
                                width={280}
                                height={400}
                                className="lg:h-[160px] h-[130px] w-fit opacity-15 object-cover rotate-100 mt-2"
                            />
                        </div>
                        <div className='flex space-x-5'>
                            <Image
                                src="/site/home/Vector.svg"
                                alt=""
                                width={280}
                                height={400}
                                className="lg:h-[160px] h-[130px] w-fit opacity-15 object-cover"
                            />
                            <Image
                                src="/site/home/Vector.svg"
                                alt=""
                                width={280}
                                height={400}
                                className="lg:h-[160px] h-[130px] w-fit opacity-15 object-cover rotate-100 mt-2"
                            />
                        </div>
                    </div>
                    <div className='z-10 absolute top-0 lg:right-5 right-0'>
                        <Image
                            src="/site/home/m.png"
                            alt=""
                            width={200}
                            height={200}
                            className="lg:h-[300px] h-[250px] w-[100%] object-cover "
                        />
                    </div>
                    <div className='z-11 h-fit w-[60%] absolute left-10 top-[50%] -translate-y-1/2 space-y-5  '>
                        <h1 className='text-white text-[28px] font-medium'>Monsoon Special Green</h1>
                        <p className='text-white text-[20px] font-medium'>Fresh, lush plants perfect for the summer season.</p>
                        <button className='hover:bg-white hover:text-black transition-all duration-300 border-2 border-white lg:h-[60px] lg:w-[191px] md:h-[35px] md:w-[110px] w-[120px] h-[50px] flex justify-center items-center lg:rounded-xl md:rounded-xl rounded-[5px] text-[#FFFFFF] lg:text-[20px]'>View Collection</button>
                    </div>
                </div>
                <div className='relative lg:h-[410px] h-[370px] lg:w-[49%] w-full bg-white flex rounded-xl '>
                    <div className='absolute lg:top-8 top-18 lg:left-10 left-5'>
                        <div className='flex space-x-5 '>
                            <Image
                                src="/site/home/Vector-green.svg"
                                alt=""
                                width={10}
                                height={100}
                                className="lg:h-[160px] h-[130px] w-fit opacity-15 object-cover"
                            />
                            <Image
                                src="/site/home/Vector-green.svg"
                                alt=""
                                width={280}
                                height={400}
                                className="lg:h-[160px] h-[130px] w-fit opacity-15 object-cover rotate-100 mt-2"
                            />
                        </div>
                        <div className='flex space-x-5'>
                            <Image
                                src="/site/home/Vector-green.svg"
                                alt=""
                                width={280}
                                height={400}
                                className="lg:h-[160px] h-[130px] w-fit opacity-15 object-cover"
                            />
                            <Image
                                src="/site/home/Vector-green.svg"
                                alt=""
                                width={280}
                                height={400}
                                className="lg:h-[160px] h-[130px] w-fit opacity-15 object-cover rotate-100 mt-2"
                            />
                        </div>
                    </div>
                    <div className='z-10 absolute right-0 top-[40%] -translate-y-1/2'>
                        <Image
                            src="/site/home/sitaphal.png"
                            alt=""
                            width={200}
                            height={200}
                            className="lg:h-[250px] h-[200px] w-[100%] object-cover "
                        />
                    </div>
                    <div className='z-11 h-fit w-[60%] absolute left-10 top-[50%] -translate-y-1/2 space-y-5  '>
                        <h1 className='text-[#1D2F33] text-[28px] font-semibold'>Monsoon Special Green</h1>
                        <p className='text-[#1D2F33] text-[20px] font-semibold'>Fresh, lush plants perfect for the summer season.</p>
                        <button className='bg-[#F37521] hover:bg-[#DA5700] lg:h-[60px] lg:w-[191px] md:h-[35px] md:w-[110px] w-[120px] h-[50px] flex justify-center items-center lg:rounded-xl md:rounded-xl rounded-[5px] text-[#FFFFFF] lg:text-[20px]'>View Collection</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
