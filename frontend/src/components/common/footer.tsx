"use client"
import Image from "next/image";
import { Facebook, Youtube, Instagram } from 'lucide-react';
import Link from "next/link";
import { FloatingWhatsApp } from "react-floating-whatsapp";



export default function Footer() {
  return (
    <>
      <div key="outer-div" className="h-full w-full lg:pt-30 lg:pb-30 md:pt-20 md:pb-20 pt-10 pb-10 flex flex-row justify-center bg-[#1D2F33] ">
        <div key="inner-div" className="inner-div h-full lg:w-[60%] md:w-[90%] w-[95%] flex lg:flex-row md:flex-row flex-col lg:justify-between md:justify-between lg:items-start md:items-start items-center lg:space-y-0 md:space-y-0 space-y-10 ">
          <div key="1-div" className="h-fit w-fit lg:space-y-3 md:space-y-3 space-y-3 ">
            <div>
              <Image
                src="/site/sanas-nursery-logo.webp"
                alt="Sana-Nursery-Logo"
                width={100}
                height={100}
                className="logo lg:h-25 lg:w-25 md:h-20 md:w-20 lg:ml-0 ml-2"
              />
            </div>
            <div key="3-icons" className=" flex flex-row justify-between items-center text-white lg:space-x-4 md:space-x-3 space-x-5">
              <Facebook className=" hover:text-blue-600" />
              <Instagram className=" hover:text-pink-700" />
              <Youtube className=" h-7 w-7 hover:text-red-600" />
            </div>
          </div>
          <div className="two-div h-[100%] lg:w-[360px] lg:space-x-0 md:space-x-3 space-x-20 flex flex-row justify-between items-start ">
            <div key="2-div" className="h-fit w-fit flex flex-col lg:items-start md:items-start items-center space-y-5 ">
              <Link href="" className="p text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold">Information</Link>
              <Link href="" className="p text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold">About</Link>
              <Link href="" className="p text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold">Product</Link>
              <Link href="" className="p text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold">Blog</Link>
            </div>
            <div key="3-div" className="h-fit w-fit flex flex-col lg:items-start md:items-start items-center space-y-5 ">
              <Link href="" className="p text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold">Company</Link>
              <Link href="" className="p text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold">Privacy Policy</Link>
              <Link href="" className="p text-[#FFFFFF] lg:text-[20px] md:text-[16px] lg:font-semibold">Terms and Conditions</Link>
            </div>
          </div>
          <div key="4-div" className="fourthdiv h-fit lg:w-fit md:w-[300px] flex flex-col lg:items-start md:items-start items-center space-y-5 ">
            <h1 className=" text-[#FFFFFF] lg:text-[32px] md:text-[26px] text-[26px] lg:font-semibold">
              Stay Rooted with Us
            </h1>
            <p className="p text-[#FFFFFF] lg:text-[20px] lg:font-semibold">
              Get plant tips, offers, and fresh arrivals in your inbox.
            </p>
            <div className="input-div h-fit w-fit  p-0.5 bg-white flex flex-row justify-between lg:rounded-xl md:rounded-xl rounded-[5px] ">
              <input type="text" placeholder="Enter Email Address" className="lg:w-[260px] md:w-[180px] w-[160px] lg:pl-5 md:pl-2 pl-1 outline-none" />
              <button className="p lg:h-[45px] lg:w-[170px] md:h-[35px] md:w-[110px] w-[90px] h-[30px] flex justify-center items-center bg-[#F37521] lg:rounded-xl md:rounded-xl rounded-[5px] text-[#FFFFFF] lg:text-[20px] ">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-fit">
        <div className="floating-bg-animate"></div>
        <FloatingWhatsApp
          phoneNumber="+91-96574 80645"
          accountName="Maxima Business Solution"
          darkMode={true}
          placeholder="Type Something...."
          avatar="./maxima-wapp.webp"
        />
      </div>


    </>
  );
}

