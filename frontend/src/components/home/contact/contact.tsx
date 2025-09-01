"use client";
import React from 'react'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import schema, { ContactFormData } from "@/components/contact/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addContactUs } from '@/lib/api-routes/api-public';


const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");

    const onSubmit = async (data: ContactFormData) => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const response = await addContactUs(data);
            setSuccess("Message sent successfully!");
            reset();
            console.log(response)
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
       <>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="lg:w-[100%] lg:h-[889px] md:w-[100%] md:h-[900px] w-[100%] h-[950px] flex justify-center items-center bg-[#E4FFF0]   ">
                <div className='contact-form lg:w-[61%] lg:h-[667px]  flex justify-center items-center bg-white rounded-xl'>
                    <div className="contact-form-innerdiv lg:w-[60%] lg:h-auto md:w-[80%] w-[95%]  lg:gap-y-0 gap-y-10 flex lg:flex-row flex-col justify-between items-center absolute z-10 bg-white p-2 md:p-3 lg:px-0 rounded-xl  ">
                        {/* Left Section */}
                        <div className="contact-form-left-div lg:w-[40%] lg:h-[647px] md:w-full w-full flex lg:justify-center lg:items-center md:justify-center justify-start items-start bg-[#4CBA9B] px-4 lg:px-0 py-4 lg:py-0 rounded-xl">
                            <div className="lg:w-[80%] lg:h-auto w-full lg:gap-y-15 gap-y-10 flex flex-col justify-between items-start ">
                                <div className="lg:w-[100%] lg:h-auto lg:gap-y-3 gap-y-3 flex flex-col justify-between   ">
                                    <p className="lg:text-[42px] md:text-[36px] text-[24px] text-white font-semibold lg:leading-13 ">
                                        Connect with <span className='text-[#00611F]'>Sanas</span> Nursery
                                    </p>
                                    <p className="lg:text-[20px] md:text-[22px] text-[16px] text-white lg:font-semibold">
                                        Watch how our plants are spreading smiles and freshness.
                                    </p>
                                </div>
                                <div className="lg:w-[100%] lg:h-[45%] lg:gap-y-3 gap-y-3 flex flex-col justify-between text-[20px] text-white    ">
                                    <div className="flex items-center lg:gap-x-5 gap-3">
                                        <Phone className="lg:text-[22px] md:h-6 md:w-6 h-4 w-4" />
                                        <p className="lg:text-[20px] md:text-[20px] text-[16px] lg:font-semibold">
                                            +1012 3456 789
                                        </p>
                                    </div>
                                    <div className="flex items-center lg:gap-x-5 gap-3">
                                        <Mail className="lg:text-[22px] md:h-6 md:w-6 h-4 w-4" />
                                        <p className="theight lg:text-[20px] md:text-[20px] text-[16px] lg:font-semibold">
                                            demo@gmail.com
                                        </p>
                                    </div>
                                    <div className="flex items-start lg:gap-x-5 gap-3 ">
                                        <MapPin className="lg:h-10 lg:w-10" />
                                        <p className="lg:text-[20px] md:text-[20px] text-[16px] lg:font-semibold">
                                            Lorem ipsum dolor sit amet consectetur. Vel quam amet
                                        </p>
                                    </div>
                                </div>
                                <div key="3-icons" className=" flex flex-row justify-between items-center text-white lg:space-x-4 md:space-x-3 space-x-5  ">
                                    <Facebook className=" hover:text-blue-600" />
                                    <Instagram className=" hover:text-pink-500" />
                                    <Youtube className=" h-7.5 w-7.5  hover:text-red-600" />
                                </div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="lg:mr-10  lg:w-[50%] lg:h-[500px] md:w-[100%] w-[100%] lg:gap-y-9 gap-y-8 flex flex-col justify-between text-[#8D8D8D]    ">
                            <div>{error && <p className="text-red-600 mb-5">{error}</p>}</div>
                            <div>{success && <p className="text-green-600 mb-5">{success}</p>}</div>


                            <div className=" lg:w-[95%] w-[100%] flex justify-between ">
                                <div className="lg:w-[45%] w-[48%] flex flex-col lg:gap-y-2 gap-y-2 ">
                                    <p className="lg:text-[20px] md:text-[24px] text-[20px] font-semibold">
                                        First Name
                                    </p>
                                    <input
                                        type="text"
                                        {...register("firstname")}
                                                style={{
                                        WebkitBoxShadow: "0 0 0 1000px white inset", // overrides autofill background
                                        WebkitTextFillColor: "black", // ensures text color stays correct
                                    }}
                                        className=" lg:border-b-2 border-b-1  border-[#8D8D8D] lg:h-[35px] lg:text-[18px]  text-[16px] bg-transparent focus:outline-none focus:bg-transparent autofill:bg-transparent autofill:text-[#1d2f33]"
                                    />
                                    {errors.firstname && (
                                        <p className="text-red-500 text-sm">
                                            {errors.firstname.message}
                                        </p>
                                    )}
                                </div>

                                <div className="lg:w-[45%] w-[48%] flex flex-col lg:gap-y-2 gap-y-2  ">
                                    <p className="lg:text-[20px] text-[20px] font-semibold">
                                        Last Name
                                    </p>
                                    <input
                                        type="text"
                                        {...register("lastname")}
                                                style={{
                                        WebkitBoxShadow: "0 0 0 1000px white inset", // overrides autofill background
                                        WebkitTextFillColor: "black", // ensures text color stays correct
                                    }}
                                        className="lg:border-b-2 border-b-1 border-[#8D8D8D] lg:h-[35px] lg:text-[18px] text-[16px] bg-transparent focus:outline-none focus:bg-transparent autofill:bg-transparent autofill:text-[#1d2f33]"
                                    />
                                    {errors.lastname && (
                                        <p className="text-red-500 text-sm">
                                            {errors.lastname.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="lg:w-[95%] flex justify-between ">
                                <div className="lg:w-[45%] w-[48%] flex flex-col lg:gap-y-2 gap-y-2 ">
                                    <p className="lg:text-[20px] text-[20px] font-semibold">
                                        Email
                                    </p>
                                    <input
                                        type="text"
                                        {...register("email")}
                                         style={{
                                        WebkitBoxShadow: "0 0 0 1000px white inset", // overrides autofill background
                                        WebkitTextFillColor: "black", // ensures text color stays correct
                                    }}
                                        className="lg:border-b-2 border-b-1 border-[#8D8D8D] lg:h-[35px] lg:text-[18px] text-[16px] bg-transparent focus:outline-none focus:bg-transparent autofill:bg-transparent autofill:text-[#1d2f33]"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div className="lg:w-[45%] w-[48%] flex flex-col justify-between lg:gap-y-2 gap-y-2 ">
                                    <p className="ftheight lg:text-[20px] text-[20px] font-semibold">
                                        Phone Number
                                    </p>
                                    <input
                                        type="text"
                                        {...register("phonenumber")}
                                         style={{
                                        WebkitBoxShadow: "0 0 0 1000px white inset", // overrides autofill background
                                        WebkitTextFillColor: "black", // ensures text color stays correct
                                    }}
                                        className="lg:border-b-2 border-b-1 border-[#8D8D8D] lg:h-[35px] lg:text-[18px] text-[16px] bg-transparent focus:outline-none focus:bg-transparent autofill:bg-transparent autofill:text-[#1d2f33]"
                                    />
                                    {errors.phonenumber && (
                                        <p className="text-red-500 text-sm">
                                            {errors.phonenumber.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="lg:w-[90%] flex flex-col lg:gap-y-2 gap-y-2 ">
                                <p className="lg:text-[20px] text-[20px] font-semibold">
                                    Message
                                </p>
                                <input
                                    type="text"
                                    {...register("message")}
                                    style={{
                                        WebkitBoxShadow: "0 0 0 1000px white inset", // overrides autofill background
                                        WebkitTextFillColor: "black", // ensures text color stays correct
                                    }}
                                    className="lg:border-b-2 border-b-1 border-[#8D8D8D] lg:h-[35px] lg:text-[18px] text-[16px] bg-transparent focus:outline-none "
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-sm">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            <div className="">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="p lg:h-[60px] lg:w-[191px] md:h-[35px] md:w-[110px] w-[90px] h-[30px] flex justify-center items-center hover:bg-[#DA5700]  bg-[#F37521] lg:rounded-xl md:rounded-xl rounded-[5px] text-[#FFFFFF] lg:text-[20px] ">  {loading ? "Sending..." : "Subscribe"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div className="w-[100%] h-full bg-black flex justify-center items-center pb-35">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d121092.74028953009!2d73.82044506459074!3d18.47694808895882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bc2eba952eb29fd%3A0x1fd1cfdcdf9f0974!2sSurvey%20No.22%2C%20Sunshree%20Woods%2C%20Office%20number%2C%20F28%20to%2032%2C%20NIBM%20Rd%2C%20Kondhwa%2C%20Pune%2C%20Maharashtra%20411048!3m2!1d18.4769659!2d73.90284679999999!5e0!3m2!1sen!2sin!4v1754376613048!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-[70%] h-[600px]"
        />
      </div>
       </>
    )
}

export default Contact