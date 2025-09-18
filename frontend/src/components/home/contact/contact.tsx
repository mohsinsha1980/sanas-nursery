"use client";
import SocialMedia from "@/components/common/footer/SocialMedia";
import { Button } from "@/components/ui/button";
import { createContactEnquiry } from "@/lib/api-routes/api-public";
import { SITE_DATA } from "@/lib/constants";
import {
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { contactEnquirySchema } from "@/lib/schemas/common";
import { ContactEnquiryFields } from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Mail, MapPin, Phone } from "lucide-react";
import { useReCaptcha } from "next-recaptcha-v3";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const Contact = () => {
  const dispatch = useDispatch();
  const { executeRecaptcha } = useReCaptcha();
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactEnquirySchema),
  });

  const onSubmit = async (values: ContactEnquiryFields) => {
    try {
      setLoading(true);
      dispatch(showLoader());
      const token = await executeRecaptcha("form_submit");
      const updatedData = { ...values, token };
      await createContactEnquiry(updatedData);
      showSuccessToast(
        "Thank you for your message! We will get back to you within 24 hours."
      );
      reset(defaultValues);
    } catch (error) {
      console.log(error);
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      setLoading(false);
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="lg:w-[100%] lg:h-[870px] md:w-[100%] md:h-[1100px] w-[100%] h-[920px] flex justify-center items-center bg-[#E4FFF0]   ">
          <div className="contact-form lg:max-w-[1200px] flex justify-center items-center bg-white rounded-xl  ">
            <div className="contact-form-innerdiv lg:w-[1200px] lg:h-auto md:w-[80%] w-[95%]  lg:gap-y-0 gap-y-10 flex lg:flex-row flex-col justify-between items-center absolute z-10 bg-white p-2 md:p-3 lg:px-3 rounded-xl       ">
              <div className="contact-form-left-div lg:w-[45%] lg:h-[600px] md:w-full w-full flex lg:justify-center lg:items-center md:justify-center justify-start items-start bg-[#4CBA9B] px-4 lg:px-0 py-4 lg:py-0 rounded-xl   ">
                <div className="lg:w-[80%] lg:h-[85%] w-full lg:gap-y-10 gap-y-10 flex flex-col justify-between items-start ">
                  <div className="lg:w-[100%] lg:h-auto lg:gap-y-2 gap-y-2 flex flex-col justify-between   ">
                    <p className="lg:text-[42px] md:text-[36px] text-[24px] text-white font-semibold lg:leading-13 ">
                      Connect with{" "}
                      <span className="text-[#00611F]">Sanas </span>
                      Nursery
                    </p>
                    <p className="lg:text-[20px] md:text-[22px] text-[16px] text-white lg:font-semibold">
                      Watch how our plants are spreading smiles and freshness.
                    </p>
                  </div>
                  <div className="lg:w-[100%] lg:h-[45%] lg:gap-y-3 gap-y-3 flex flex-col justify-evenly text-[20px] text-white   ">
                    <div className="p-2  flex items-center lg:gap-x-5 gap-3 group hover:bg-gray-500/20 hover:rounded-lg transition-all duration-300 cursor-pointer">
                      <Phone className="lg:text-[22px] md:h-6 md:w-6 h-4 w-4 group-hover:text-[#0d6536]" />
                      <p className="lg:text-[20px] md:text-[20px] text-[16px] lg:font-semibold group-hover:text-[#0d6536]">
                        <Link href={`tel:${SITE_DATA.phone}`}>
                          {SITE_DATA.phone}{" "}
                        </Link>
                      </p>
                    </div>
                    <div className=" hover:rounded-lg p-2 flex items-center lg:gap-x-5 gap-3 group hover:bg-gray-500/20 transition-all duration-300 cursor-pointer">
                      <Mail className="lg:text-[22px] md:h-6 md:w-6 h-4 w-4 group-hover:text-[#0d6536]" />
                      <p className="theight lg:text-[20px] md:text-[20px] text-[16px] lg:font-semibold group-hover:text-[#0d6536]">
                        <Link href={`mailto:${SITE_DATA.EMAIL}`}>
                          {SITE_DATA.EMAIL}
                        </Link>
                      </p>
                    </div>

                    <div className="hover:rounded-lg p-2 flex items-start lg:gap-x-5 gap-3 group hover:bg-gray-500/20 transition-all duration-300 ">
                      <MapPin className="lg:text-[22px] md:h-14 md:w-14 h-12 w-12 group-hover:text-[#0d6536]" />
                      <p className="lg:text-[20px] md:text-[20px] text-[16px] lg:font-semibold group-hover:text-[#0d6536]">
                        {SITE_DATA.LOCATION}
                      </p>
                    </div>
                  </div>

                  <div className="pl-11">
                    <SocialMedia color="text-gray-200" />
                  </div>
                </div>
              </div>

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
                      {...register("phone")}
                      style={{
                        WebkitBoxShadow: "0 0 0 1000px white inset",
                        WebkitTextFillColor: "black",
                      }}
                      className="lg:border-b-2 border-b-1 border-[#8D8D8D] lg:h-[35px] lg:text-[18px] text-[16px] bg-transparent focus:outline-none focus:bg-transparent autofill:bg-transparent autofill:text-[#1d2f33]"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message}
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
                    className="lg:border-b-2 border-b-1 border-[#8D8D8D] lg:h-[80px] h-[60px] lg:text-[18px] text-[16px] bg-transparent focus:outline-none resize-none overflow-y-auto flex items-end"
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
                    {loading ? "Sending..." : "Submit"}
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
