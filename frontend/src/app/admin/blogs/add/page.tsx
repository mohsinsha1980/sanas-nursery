"use client";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BLOG_CATEGORIES } from "@/lib/constants";

import {
  generateSlug,
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
  STATUS_OPTIONS,
} from "@/lib/helper";

import InputImageField from "@/components/form-fields/input-image";
import MultipleSelectField from "@/components/form-fields/multi-select-field";
import RichTextField from "@/components/form-fields/rich-text-editor";
import SmartBox from "@/components/form-fields/smart-box";
import SwitchField from "@/components/form-fields/switch-field";
import TextArea from "@/components/form-fields/text-area";
import TextField from "@/components/form-fields/text-field";
import { createBlog } from "@/lib/api-routes/api-admin";
import { addBlogSchema } from "@/lib/schemas/admin";
import { AddBlogType } from "@/lib/types/admin-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const defaultFormData: AddBlogType = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: undefined,
  author: "",
  category: "",
  tags: [],
  metaTitle: "",
  metaDescription: "",
  readingTime: 1,
  featured: false,
  status: "0",
};

export default function AddBlog() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [preview, setPreview] = useState<string>("");

  const form = useForm<AddBlogType>({
    defaultValues: defaultFormData,
    resolver: zodResolver(addBlogSchema),
  });

  const onSubmit: SubmitHandler<AddBlogType> = async (values: AddBlogType) => {
    try {
      dispatch(showLoader());
      const newBlog = structuredClone(values);
      const response = await createBlog(newBlog);
      form.reset();
      showSuccessToast(response.data.message);
      router.back();
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  const processCoverImage = (pictures: FileList) => {
    if (pictures) {
      setPreview(URL.createObjectURL(pictures[0]));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center pb-5">
        <h1 className="text-2xl font-bold text-gray-900">Add New Blog</h1>
        <Button variant="orange" type="button" size="md" className="h-fit ">
          <Link href="/admin/blogs">Back</Link>
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <TextField
                    name="title"
                    label="Blog Title"
                    placeholder="Enter blog title"
                    className="rounded-md"
                    labelClassName="text-base font-medium"
                    formControl={form.control}
                    onchange={(val) => {
                      form.setValue("slug", generateSlug(val));
                    }}
                  />

                  <TextArea
                    name="excerpt"
                    label="Excerpt"
                    labelClassName="text-base font-medium"
                    placeholder="Brief description of the blog post"
                    formControl={form.control}
                    description="Short description that appears in blog listings (max 300 characters)"
                    descriptionClassName="text-sm text-gray-500"
                  />

                  <RichTextField
                    name="content"
                    label="Blog Content"
                    labelClassName="text-base font-medium"
                    placeholder="Write your blog content here..."
                    formControl={form.control}
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  SEO Settings
                </h2>
                <div className="space-y-4">
                  <TextField
                    name="metaTitle"
                    label="Meta Title"
                    placeholder="SEO title for search engines"
                    formControl={form.control}
                    className="rounded-md"
                    labelClassName="text-base font-medium"
                    description="Title for search engines (max 60 characters)"
                    descriptionClassName="text-sm text-gray-500"
                  />

                  <TextArea
                    name="metaDescription"
                    label="Meta Description"
                    labelClassName="text-base font-medium"
                    placeholder="Description for search engines"
                    formControl={form.control}
                    description="Description for search engines (max 160 characters)"
                    descriptionClassName="text-sm text-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Cover Image
                </h2>
                <InputImageField
                  name="coverImage"
                  label="Upload Cover Image"
                  labelClassName="text-base font-medium"
                  multiple={false}
                  accept="image/jpeg, image/jpg, image/png, image/webp"
                  placeholder="Choose cover image"
                  className="rounded-md"
                  formControl={form.control}
                  description="Recommended size: 800x450px"
                  descriptionClassName="text-sm text-gray-500"
                  onchange={(data) => processCoverImage(data)}
                />
                {preview && (
                  <div className="mt-4">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={preview}
                        alt="Cover preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Blog Settings
                </h2>
                <div className="space-y-4">
                  <SmartBox
                    name="category"
                    label="Category"
                    labelClassName="text-base font-medium"
                    placeholder="Select category"
                    formControl={form.control}
                    allowCustomValue={false}
                    options={Object.values(BLOG_CATEGORIES)}
                  />

                  <TextField
                    name="author"
                    label="Author"
                    placeholder="Enter author name"
                    inputType="text"
                    className="rounded-md"
                    labelClassName="text-base font-medium"
                    formControl={form.control}
                  />

                  <TextField
                    name="readingTime"
                    label="Reading Time (minutes)"
                    placeholder="5"
                    inputType="number"
                    className="rounded-md"
                    labelClassName="text-base font-medium"
                    formControl={form.control}
                    suffix="Minutes"
                  />

                  <MultipleSelectField
                    name="tags"
                    label="Tags"
                    placeholder="Select or add tags"
                    formControl={form.control}
                    options={[]}
                  />

                  <div className="space-y-3">
                    <SwitchField
                      name="featured"
                      label="Featured Blog"
                      formControl={form.control}
                      className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-gray-300"
                    />

                    <SmartBox
                      name="status"
                      label="Status"
                      labelClassName="text-base font-medium"
                      placeholder="Select status"
                      formControl={form.control}
                      allowCustomValue={false}
                      options={STATUS_OPTIONS}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              Create Blog
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
