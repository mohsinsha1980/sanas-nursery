"use client";
import { Button } from "@/components/ui/button";
import { addContactUs } from "@/lib/api-routes/api-public";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import schema, { ContactFormData } from "./schema";

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
  const [, setError] = React.useState("");
  const [, setSuccess] = React.useState("");

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await addContactUs(data);
      toast.success("Message sent successfully!");
      reset();
      console.log(response);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="lg:w-[100%] lg:h-[870px] md:w-[100%] md:h-[1100px] w-[100%] h-[920px] flex justify-center items-center bg-[#E4FFF0]   ">
          <div className="contact-form lg:w-[61%] flex justify-center items-center bg-white rounded-xl">
            <div className="contact-form-innerdiv lg:w-[60%] lg:h-auto md:w-[80%] w-[95%]  lg:gap-y-0 gap-y-10 flex lg:flex-row flex-col justify-between items-center absolute z-10 bg-white p-2 md:p-3 lg:px-3 rounded-xl     ">
              {/* Left Section */}
              <div className="contact-form-left-div lg:w-[45%] lg:h-[600px] md:w-full w-full flex lg:justify-center lg:items-center md:justify-center justify-start items-start bg-[#4CBA9B] px-4 lg:px-0 py-4 lg:py-0 rounded-xl   ">
                <div className="lg:w-[80%] lg:h-[85%] w-full lg:gap-y-10 gap-y-10 flex flex-col justify-between items-start ">
                  <div className="lg:w-[100%] lg:h-auto lg:gap-y-3 gap-y-3 flex flex-col justify-between   ">
                    <p className="lg:text-[42px] md:text-[36px] text-[24px] text-white font-semibold lg:leading-13 ">
                      Connect with <span className="text-[#00611F]">Sanas</span>{" "}
                      Nursery
                    </p>
                    <p className="lg:text-[20px] md:text-[22px] text-[16px] text-white lg:font-semibold">
                      Watch how our plants are spreading smiles and freshness.
                    </p>
                  </div>
                  <div className="lg:w-[100%] lg:h-[45%] lg:gap-y-3 gap-y-3 flex flex-col justify-evenly text-[20px] text-white   ">
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
                  <div
                    key="3-icons"
                    className=" flex flex-row justify-between items-center text-white lg:space-x-4 md:space-x-3 space-x-5  "
                  >
                    <div className="h-[40px] w-[40px] flex justify-center items-center">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <div className="h-[40px] w-[40px] flex justify-center items-center">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div className="h-[40px] w-[40px] flex justify-center items-center">
                      <svg
                        className="w-7 h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="lg:w-[50%] lg:h-[550px] md:w-[100%] h-fit w-[100%] lg:gap-y-9 md:gap-y-8 gap-y-5 flex flex-col justify-evenly  text-[#8D8D8D] lg:px-0 md:px-3 px-4  ">
                <div className=" lg:w-[95%] w-[100%] flex lg:flex-row flex-col justify-between lg:space-y-0 md:space-y-8 space-y-5 ">
                  <div className="lg:w-[45%] md:w-[70%] w-[90%] flex flex-col lg:gap-y-4 gap-y-2 ">
                    <p className="lg:text-[20px] md:text-[24px] text-[20px] font-semibold">
                      Name
                    </p>
                    <input
                      type="text"
                      {...register("name")}
                      style={{
                        WebkitBoxShadow: "0 0 0 1000px white inset",
                        WebkitTextFillColor: "black",
                      }}
                      className=" lg:border-b-2 border-b-1  border-[#8D8D8D] lg:h-[35px] lg:text-[18px]  text-[16px] bg-transparent focus:outline-none focus:bg-transparent autofill:bg-transparent autofill:text-[#1d2f33]"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="lg:w-[45%] md:w-[70%] w-[90%] flex flex-col justify-between lg:gap-y-4 gap-y-2 ">
                    <p className="ftheight lg:text-[20px] text-[20px] font-semibold">
                      Phone Number
                    </p>
                    <input
                      type="text"
                      {...register("phonenumber")}
                      style={{
                        WebkitBoxShadow: "0 0 0 1000px white inset",
                        WebkitTextFillColor: "black",
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

                <div className="lg:w-[95%] w-[100%] flex lg:flex-row flex-col justify-between lg:space-y-0 md:space-y-8 space-y-5 ">
                  <div className="lg:w-[100%] md:w-[70%] w-[90%] flex flex-col lg:gap-y-4 gap-y-2 ">
                    <p className="lg:text-[20px] text-[20px] font-semibold">
                      Email
                    </p>
                    <input
                      type="text"
                      {...register("email")}
                      style={{
                        WebkitBoxShadow: "0 0 0 1000px white inset",
                        WebkitTextFillColor: "black",
                      }}
                      className="lg:border-b-2 border-b-1 border-[#8D8D8D] lg:h-[35px] lg:text-[18px] text-[16px] bg-transparent focus:outline-none focus:bg-transparent autofill:bg-transparent autofill:text-[#1d2f33]"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="lg:w-[95%] md:w-[70%] w-[90%] flex flex-col justify-between lg:space-y-4 space-y-0">
                  <p className="lg:text-[20px] text-[20px] font-semibold">
                    Message
                  </p>
                  <textarea
                    {...register("message")}
                    style={{
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "black",
                    }}
                    className="lg:border-b-2 border-b-1 border-[#8D8D8D] lg:h-[80px] h-[60px] lg:text-[18px] text-[16px] bg-transparent focus:outline-none resize-none overflow-y-auto"
                  />

                  {errors.message && (
                    <p className="text-red-500 text-sm">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <Button
                    type="submit"
                    disabled={loading}
                    variant="orange"
                    size="lg"
                  >
                    {loading ? "Sending..." : "Subscribe"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Contact;
