"use client";
import schema, { ContactFormData } from "@/components/contact/schema";
import { Button } from "@/components/ui/button";
import { addContactUs } from "@/lib/api-routes/api-public";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
        <div className="lg:w-[100%] lg:h-[870px] md:w-[100%] md:h-[1100px] w-[100%] h-[1020px] flex justify-center items-center bg-[#E4FFF0]   ">
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
                    <div className="h-[40px] w-[40px] bg-[#DA5700] shadow-md  rounded-lg flex justify-center items-center">
                      <Facebook className="z-10 hover:text-blue-600" />
                    </div>
                    <div className="h-[40px] w-[40px] bg-[#DA5700] shadow-md  rounded-lg flex justify-center items-center">
                      <Instagram className=" hover:text-pink-700" />
                    </div>
                    <div className="h-[40px] w-[40px] bg-[#DA5700] shadow-md  rounded-lg flex justify-center items-center">
                      <Youtube className=" h-7 w-7 hover:text-red-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="lg:w-[50%] lg:h-[550px] md:w-[100%] h-fit w-[100%] lg:gap-y-9 md:gap-y-8 gap-y-5 flex flex-col justify-evenly  text-[#8D8D8D] lg:px-0 md:px-3 px-4  ">
                {/* <div>
                  {error && <p className="text-red-600 mb-5">{error}</p>}
                </div>
                <div>
                  {success && <p className="text-green-600 mb-5">{success}</p>}
                </div> */}

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
