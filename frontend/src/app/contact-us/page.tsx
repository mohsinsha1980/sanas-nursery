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
      const clonedData = structuredClone(values);
      const updatedData = { ...clonedData, token: token };
      createContactEnquiry(updatedData);
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
    <div className="bg-white">
      <section
        className="py-16 bg-center bg-cover "
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-accent-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-accent-600 max-w-2xl mx-auto">
            Have questions or want to stay updated? We&apos;d love to hear from
            you!
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-accent-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-accent-900 mb-6">
                Send us a Message
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 px-2 py-1"
                >
                  <TextField
                    name="name"
                    label="Full Name *"
                    placeholder="Enter your full name"
                    formControl={form.control}
                    className="rounded-lg"
                  />

                  <TextField
                    name="email"
                    label="Email Address *"
                    placeholder="Enter your email address"
                    inputType="email"
                    formControl={form.control}
                    className="rounded-lg"
                  />

                  <TextField
                    name="phone"
                    label="Phone/WhatsApp Number *"
                    placeholder="Enter 10-digit number (e.g. 9876543210)"
                    inputType="tel"
                    formControl={form.control}
                    className="rounded-lg"
                  />

                  <TextArea
                    name="message"
                    label="Message *"
                    placeholder="Tell us more about your inquiry..."
                    formControl={form.control}
                  />

                  <div className="flex justify-end gap-3 mt-4">
                    <Button type="submit" variant="orange" className="py-2">
                      Submit Enquiry
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-accent-900 mb-6">
                Get in Touch
              </h2>
              <div className="space-y-8">
                {/* General Inquiries */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent-900 mb-2">
                      General Inquiries
                    </h3>
                    <p className="text-accent-600 mb-2">
                      Have questions about our products or services?
                    </p>
                    <p className="text-primary-600 font-medium">
                      We&apos;re here to help!
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <WhatsAppIcon />
                  <div>
                    <h3 className="text-lg font-semibold text-accent-900 mb-2">
                      WhatsApp Contact
                    </h3>
                    <p className="text-accent-600 mb-2">
                      For immediate assistance, contact us on WhatsApp
                    </p>
                    <p className="text-green-600 font-medium">
                      +91 8999481616 / +91 9090401616
                    </p>
                  </div>
                </div>

                {/* Stay Updated */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-secondary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h6v-2H4v2zM4 11h6V9H4v2zM4 7h6V5H4v2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent-900 mb-2">
                      Stay Updated
                    </h3>
                    <p className="text-accent-600 mb-2">
                      Want to be notified when our main website launches?
                    </p>
                    <p className="text-secondary-600 font-medium">
                      Send us a message to join our list!
                    </p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-accent-900 mb-2">
                      Response Time
                    </h3>
                    <p className="text-accent-600 mb-2">
                      We typically respond to all inquiries within 24 hours.
                    </p>
                    <p className="text-primary-600 font-medium">
                      Your message is important to us!
                    </p>
                  </div>
                </div>

                {/* Company Details */}
                <div className="bg-accent-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-accent-900 mb-4">
                    Company Information
                  </h3>
                  <div className="space-y-2 text-sm text-accent-700">
                    <p>
                      <strong>Email:</strong> sanasnursery@gmail.com
                    </p>
                    <p>
                      <strong>Phone/WhatsApp:</strong> +91 8999481616 / +91
                      9090401616
                    </p>
                    <p>
                      <strong>Location:</strong> Sanas Wholesale Nursery, Bori
                      Fata, near ITI collage, Uruli Kanchan, Maharashtra, 412201
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom pb-20">
        <h2 className="text-2xl font-bold text-accent-900 mb-8 text-center">
          Find Us on the Google Map
        </h2>
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <div className="relative w-full pb-[56.25%] md:pb-[50%] lg:pb-[40%]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.0491842958786!2d74.1666438!3d18.4814312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2e1579a8e3dc1%3A0xd82516d259aa5ea!2zU2FuYXMgV2hvbGVzYWxlIE51cnNlcnkg4KS24KS-4KSW4KS-IChVcnVsaS1LYW5jaGFuKSBVbml0IDI!5e0!3m2!1sen!2sin!4v1756447903300!5m2!1sen!2sin"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
