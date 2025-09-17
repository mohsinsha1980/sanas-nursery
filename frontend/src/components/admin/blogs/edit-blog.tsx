"use client";

import { Form } from "@/components/ui/form";

import InputImageField from "@/components/form-fields/input-image";
import MultipleSelectField from "@/components/form-fields/multi-select-field";
import RichTextField from "@/components/form-fields/rich-text-editor";
import SmartBox from "@/components/form-fields/smart-box";
import SwitchField from "@/components/form-fields/switch-field";
import TextArea from "@/components/form-fields/text-area";
import TextField from "@/components/form-fields/text-field";
import {
  getBlogById,
  getMasterData,
  updateBlog,
} from "@/lib/api-routes/api-admin";
import { BLOG_CATEGORIES } from "@/lib/constants";
import {
  generateSlug,
  getErrorMessage,
  getPicURL,
  showErrorToast,
  showSuccessToast,
  STATUS_OPTIONS,
} from "@/lib/helper";
import { editBlogSchema } from "@/lib/schemas/admin";
import { EditBlogFields, MasterData } from "@/lib/types/admin-types";
import { BlogDataType } from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import BackButton from "../action-buttons/back";
import CancelButton from "../action-buttons/cancel";
import UpdateButton from "../action-buttons/update";

const defaultValues: EditBlogFields = {
  blogId: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: null,
  author: "",
  category: "",
  tags: [],
  metaTitle: "",
  metaDescription: "",
  readingTime: 1,
  featured: false,
  status: "0",
};

const defaultMasterData: MasterData = {
  tags: [],
  blogTags: [],
};

type EditBlogProps = {
  blogId: string | undefined;
};

export default function EditBlogForm({ blogId }: EditBlogProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [preview, setPreview] = useState<string>("");
  const [masterData, setMasterData] = useState<MasterData>(defaultMasterData);

  const form = useForm<EditBlogFields>({
    resolver: zodResolver(editBlogSchema),
    defaultValues,
  });

  console.log(form.formState.errors);

  useEffect(() => {
    const controller = new AbortController();
    const fetchBlog = async () => {
      if (!blogId) return;
      try {
        dispatch(showLoader());
        const response = await getBlogById(blogId, controller);
        const blogData: BlogDataType = response.data.data;

        form.reset({
          blogId: blogData._id,
          title: blogData.title,
          slug: blogData.slug,
          excerpt: blogData.excerpt,
          content: blogData.content,
          author: blogData.author || "",
          category: blogData.category,
          tags: blogData.tags || [],
          metaTitle: blogData.metaTitle || "",
          metaDescription: blogData.metaDescription || "",
          readingTime: blogData.readingTime || 1,
          featured: blogData.featured || false,
          status: blogData.status as "0" | "1",
        });

        if (blogData.coverImage) {
          setPreview(getPicURL(blogData.coverImage));
        }
      } catch (e: unknown) {
        showErrorToast(getErrorMessage(e as AxiosError));
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchBlog();
    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [blogId, dispatch, form]);

  const onSubmit: SubmitHandler<EditBlogFields> = async (
    values: EditBlogFields
  ) => {
    try {
      dispatch(showLoader());
      const updatedBlog = structuredClone(values);
      const response = await updateBlog(blogId!, updatedBlog);
      showSuccessToast(response.data.message);
      router.back();
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  const processCoverImage = (pictures: FileList) => {
    if (pictures?.length) {
      setPreview(URL.createObjectURL(pictures[0]));
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const getMasterDataHandler = async () => {
      try {
        dispatch(showLoader());
        const response = await getMasterData(controller);
        const masterData: MasterData = response.data.data;
        setMasterData(masterData);
        dispatch(hideLoader());
      } catch (e: unknown) {
        showErrorToast(getErrorMessage(e as AxiosError));
        dispatch(hideLoader());
      }
    };

    getMasterDataHandler();
    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-3">
        <h1 className="text-3xl font-bold text-gray-900 !px-0">Edit Blog</h1>

        <BackButton onClick={() => router.back()} />
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
                    inputType="text"
                    className="rounded-md border-black/10"
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
                    className="rounded-md border-black/10"
                  />

                  <div key={form.getValues("content").slice(0, 5) + "_content"}>
                    <RichTextField
                      name="content"
                      label="Blog Content"
                      labelClassName="text-base font-medium"
                      placeholder="Write your blog content here..."
                      formControl={form.control}
                      className="rounded-md border-black/10"
                    />
                  </div>
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
                    className="rounded-md border-black/10"
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
                    className="rounded-md border-black/10"
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
                  className="rounded-md border-black/10"
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
                    className="rounded-md border-black/10"
                  />

                  <TextField
                    name="author"
                    label="Author"
                    placeholder="Enter author name"
                    inputType="text"
                    className="rounded-md border-black/10"
                    labelClassName="text-base font-medium"
                    formControl={form.control}
                  />

                  <TextField
                    name="readingTime"
                    label="Reading Time (minutes)"
                    placeholder="5"
                    inputType="number"
                    className="rounded-md border-black/10"
                    labelClassName="text-base font-medium"
                    formControl={form.control}
                    suffix="Mins"
                  />

                  {masterData?.blogTags?.length ? (
                    <MultipleSelectField
                      name="tags"
                      label="Tags"
                      placeholder="Select or add tags"
                      formControl={form.control}
                      options={masterData.blogTags.map(({ _id, ...rest }) => {
                        console.log(_id);
                        return rest;
                      })}
                      className="rounded-md border-black/10"
                    />
                  ) : null}

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
                      className="rounded-md border-black/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <CancelButton onClick={() => router.back()} />

            <UpdateButton type="submit" />
          </div>
        </form>
      </Form>
    </>
  );
}
