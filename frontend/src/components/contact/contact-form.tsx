"use client";

import WhatsAppIcon from "@/components/common/icons/whatapp";
import TextArea from "@/components/form-fields/text-area";
import TextField from "@/components/form-fields/text-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createContactEnquiry } from "@/lib/api-routes/api-public";
import { showErrorToast, showSuccessToast } from "@/lib/helper";
import { contactEnquirySchema } from "@/lib/schemas/common";
import { ContactEnquiryFields } from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReCaptcha } from "next-recaptcha-v3";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Mail, MapPin } from "lucide-react";
import { SITE_DATA } from "@/lib/constants";
import Link from "next/link";

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactPage() {
  const dispatch = useDispatch();
  const { executeRecaptcha } = useReCaptcha();
  const form = useForm<ContactEnquiryFields>({
    defaultValues: defaultValues,
    resolver: zodResolver(contactEnquirySchema),
  });

  const onSubmit = async (values: ContactEnquiryFields) => {
    try {
      dispatch(showLoader());
      const token = await executeRecaptcha("form_submit");
      const updatedData = { ...values, token };
      await createContactEnquiry(updatedData);
      showSuccessToast(
        "Thank you for your message! We will get back to you within 24 hours."
      );
      form.reset(defaultValues);
    } catch (error) {
      console.log(error);
      showErrorToast("Failed to submit enquiry. Please try again.");
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="">
      <section className="py-20  ">
        <div className="container-custom  space-y-10 ">
          <div className="">
            <h1 className="lg:text-[42px] md:text-[36px] text-[28px] font-semibold text-center">
              <span className="text-[#00611F]">Contact Us</span> – We’re Just a
              Message Away!
            </h1>
            <p className="text-[#505050] lg:text-[20px] md:text-[20px] text-[20px] font-medium text-center">
              Have questions or want to stay updated? We&apos;d love to hear
              from you!
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
            <div className="bg-orange-50 shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6">
                Send us a Message
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-7"
                >
                  <TextField
                    name="name"
                    label="Full Name *"
                    labelClassName="text-[16px] font-semibold "
                    placeholder="Enter your full name"
                    formControl={form.control}
                    className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 mt-3"
                  />

                  <TextField
                    name="email"
                    label="Email Address *"
                    labelClassName="text-[16px] font-semibold "
                    placeholder="Enter your email address"
                    inputType="email"
                    formControl={form.control}
                    className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 mt-3"
                  />

                  <TextField
                    name="phone"
                    label="Phone/WhatsApp Number *"
                    labelClassName="text-[16px] font-semibold "
                    placeholder="Enter 10-digit number (e.g. 9876543210)"
                    inputType="tel"
                    formControl={form.control}
                    className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 mt-3"
                  />

                  <TextArea
                    name="message"
                    label="Message *"
                    labelClassName="text-[16px] font-semibold "
                    placeholder="Tell us more about your inquiry..."
                    formControl={form.control}
                    className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 mt-3"
                  />

                  <div className="flex justify-start mt-4">
                    <Button
                      type="submit"
                      variant="orange"
                      className=""
                      size={"lg"}
                    >
                      Submit Enquiry
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            {/* Contact Info Card */}
            <div className="bg-green-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6">
                Get in Touch
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black  mb-1">
                      Email
                    </h3>
                    <p className="text-green-700 font-medium">
                     <Link href={`mailto:${SITE_DATA.EMAIL}`}> {SITE_DATA.EMAIL}</Link>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black  mb-1">
                      WhatsApp
                    </h3>
                    <p className="text-green-700 font-medium">
                      <Link href={`tel:${SITE_DATA.phone}`}> {SITE_DATA.phone}</Link>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black  mb-1">
                      Location
                    </h3>
                    <p className="text-green-700 font-medium">
                      {SITE_DATA.LOCATION}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-inner">
                  <h3 className="text-lg font-semibold text-black  mb-2">
                    Response Time
                  </h3>
                  <p className="text-[#505050] font-medium">
                    We typically respond to all inquiries within 24 hours. Your
                    message is important to us!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
