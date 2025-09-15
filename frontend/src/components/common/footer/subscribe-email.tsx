"use client";
import { subscribeEmail } from "@/lib/api-routes/api-public";
import {
  emailRegEx,
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { useReCaptcha } from "next-recaptcha-v3";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SubscribeEmail = () => {
  const dispatch = useDispatch();
  const { executeRecaptcha } = useReCaptcha();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return showErrorToast("Email is required");
    }
    if (!emailRegEx.test(trimmedEmail)) {
      return showErrorToast("Please enter a valid email address");
    }

    try {
      dispatch(showLoader());
      const token = await executeRecaptcha("footer_subscribe");
      await subscribeEmail({ email: trimmedEmail, token });
      showSuccessToast(
        "Thank you for subscribing! You'll now receive the latest updates and exclusive offers."
      );
      setEmail("");
      setIsSubscribed(true);
    } catch (error) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="mt-2 input-div h-fit w-fit  p-0.5 bg-white  flex flex-row justify-between lg:rounded-xl md:rounded-xl rounded-[5px] ">
      <input
        type="email"
        placeholder="Enter Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="lg:w-[260px] md:w-[180px] w-[160px] lg:pl-5 md:pl-2 px-2 outline-none text-black rounded-lg"
      />
      <button
        type="button"
        onClick={handleSubscribe}
        className={`cursor-pointer lg:h-[45px] px-6 md:h-[35px] h-[30px] flex justify-center items-center lg:rounded-xl md:rounded-xl rounded-[5px] text-[#FFFFFF] lg:text-[20px] transition-colors duration-300 ${
          isSubscribed ? "bg-green-600" : "bg-[#F37521] hover:bg-[#d4631c]"
        }`}
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
};

export default SubscribeEmail;
