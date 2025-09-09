"use client";
import { useEffect, useState } from "react";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  ALLOWED_MAX_FILE_SIZE,
  CARE_LEVEL_ARR,
  CATEGORY_ARR,
  PLANT_SIZES_ARR,
} from "@/lib/constants";

import {
  generateSlug,
  getErrorMessage,
  getFaqAccrItems,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";

import AddFAQ from "@/components/admin/plants/add-faq";
import AddSpecificatin from "@/components/admin/plants/add-specification";
import { ProductAccordion } from "@/components/common/accordion";
import InputImageField from "@/components/form-fields/input-image";
import MultipleSelectField from "@/components/form-fields/multi-select-field";
import RichTextField from "@/components/form-fields/rich-text-editor";
import SmartBox from "@/components/form-fields/smart-box";
import SwitchField from "@/components/form-fields/switch-field";
import TextArea from "@/components/form-fields/text-area";
import TextField from "@/components/form-fields/text-field";
import CustomDialog from "@/components/layout/Dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createPlant, getMasterData } from "@/lib/api-routes/api-admin";
import { addPlantSchema } from "@/lib/schemas/admin";
import { AddPlantFields, MasterData } from "@/lib/types/admin-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";

const defaultMasterData: MasterData = {
  tags: [],
};

const defaultFormData = {
  title: "",
  slug: "",
  category: "",
  size: "",
  summary: "",
  metaDescription: "",
  details: "",
  specifications: [],
  faqs: [],
  description: "",
  pictures: "",
  status: true,
};

export default function AddPlant() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [previews, setPreviews] = useState<string[]>([]);
  const [masterData, setMasterData] = useState<MasterData>(defaultMasterData);
  const [openKeySpec, setOpenKeySpec] = useState<boolean>(false);
  const [openAddFAQ, setOpenAddFAQ] = useState<boolean>(false);

  const form = useForm<AddPlantFields>({
    defaultValues: defaultFormData,
    resolver: zodResolver(addPlantSchema),
  });

  const onSubmit: SubmitHandler<AddPlantFields> = async (
    values: AddPlantFields
  ) => {
    try {
      dispatch(showLoader());
      const newPlant = structuredClone(values);
      const response = await createPlant(newPlant);
      form.reset();
      showSuccessToast(response.data.message);
      router.back();
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  const { remove, append } = useFieldArray({
    control: form.control,
    name: "specifications",
  });

  const { append: appendFaq, remove: removeFaq } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  const processPictures = (pictures: FileList) => {
    const objects = [];
    if (pictures?.length) {
      for (let i = 0; i < pictures.length; i++) {
        objects.push(URL.createObjectURL(pictures[i]));
      }
    }
    setPreviews(objects);
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
      <div className="flex justify-between items-center pb-5">
        <h1 className="">Add a plant</h1>
        <Button variant="orange" type="button" size="md" className="h-fit ">
          <Link href="/admin/plants">Back</Link>
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-2">
              <TextField
                name="title"
                label="Title"
                placeholder="Title"
                inputType="text"
                className="rounded-md"
                labelClassName="text-[20px] font-semibold "
                formControl={form.control}
                onchange={(val) => {
                  form.setValue("slug", generateSlug(val));
                }}
              />
            </div>
            <div className="col-span-2">
              <TextField
                name="metaDescription"
                label="Meta Description"
                placeholder="Meta Description"
                formControl={form.control}
                className="rounded-md"
                labelClassName="text-[20px] font-semibold "
                description="Description to show in global search and for meta tag."
                descriptionClassName="text-md font-lg"
              />
            </div>
            <div className="col-span-4">
              <TextArea
                name="summary"
                label="Plant Summary"
                labelClassName="text-[20px] font-semibold "
                placeholder="Add summary about the plant"
                formControl={form.control}
                description="Summary to display on plant card"
                descriptionClassName="text-md font-lg"
              />
            </div>
            <div className="col-span-4">
              <RichTextField
                name="details"
                label="Plant Details"
                labelClassName="text-[20px] font-semibold "
                placeholder="Details"
                formControl={form.control}
              />
            </div>

            <div className="col-span-4">
              <RichTextField
                name="description"
                label="Plant Description"
                labelClassName="text-[20px] font-semibold "
                placeholder="Add description about the plant"
                formControl={form.control}
              />
            </div>

            <div className="col-span-4">
              <div className="grid grid-cols-4 gap-4 ">
                <div className="col-span-3">
                  <h2 className="">
                    <h3 className="text-[20px] font-semibold pt-5">
                      Key Specifications
                    </h3>
                    {form?.formState?.errors?.specifications?.message ? (
                      <div className="text-[0.8rem] font-medium text-destructive">
                        {form?.formState?.errors?.specifications?.message}
                      </div>
                    ) : null}
                  </h2>
                </div>
                <div className="text-right">
                  <Button
                    variant="orange"
                    type="button"
                    size="sm"
                    onClick={() => setOpenKeySpec(true)}
                    className="mt-5"
                  >
                    Add New
                  </Button>
                </div>
              </div>
              <div className="rounded-md border mb-4">
                <Table>
                  <TableHeader>
                    <TableRow className="flex ">
                      <TableHead className="w-1/3 ">Key</TableHead>
                      <TableHead className="w-1/3 ">Value</TableHead>
                      <TableHead className="w-1/3 text-end">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {form.getValues("specifications") &&
                    form.getValues("specifications")?.length ? (
                      form.getValues("specifications")?.map((obj, index) => (
                        <TableRow
                          key={`specification ${index}`}
                          className="flex justify-center"
                        >
                          <TableCell className="w-1/3 ">{obj.label}</TableCell>
                          <TableCell className="w-1/3 ">{obj.value}</TableCell>
                          <TableCell className="w-1/3 ">
                            <div className="flex justify-end">
                              <Trash2Icon
                                size="20"
                                color="red"
                                onClick={() => remove(index)}
                                className="icon_action"
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center">
                          No records added
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div>
              <SmartBox
                name="category"
                label="Category"
                labelClassName="text-[17px] font-semibold"
                placeholder="Select"
                formControl={form.control}
                allowCustomValue={false}
                options={CATEGORY_ARR}
              />
            </div>
            <div>
              <SmartBox
                name="size"
                label="Size"
                labelClassName="text-[17px] font-semibold"
                placeholder="Select"
                formControl={form.control}
                allowCustomValue={false}
                options={PLANT_SIZES_ARR}
              />
            </div>
            <div>
              <SmartBox
                name="careLevel"
                label="Care Level"
                labelClassName="text-[17px] font-semibold"
                placeholder="Select"
                formControl={form.control}
                allowCustomValue={false}
                options={CARE_LEVEL_ARR}
              />
            </div>

            <div className="col-span-3">
              {masterData?.tags?.length && (
                <MultipleSelectField
                  name="tags"
                  label="Tags"
                  placeholder="Select"
                  formControl={form.control}
                  options={masterData.tags.map(({ _id, ...rest }) => {
                    console.log(_id);
                    return rest;
                  })}
                />
              )}
            </div>

            <div className="col-span-4">
              <div className="grid grid-cols-4 ">
                <div className="col-span-3">
                  <h4 className="mb-0">
                    Frequently Asked Questions
                    {form?.formState?.errors?.faqs?.message ? (
                      <div className="text-[0.8rem] font-medium text-destructive">
                        {form?.formState?.errors?.faqs?.message}
                      </div>
                    ) : null}
                  </h4>
                </div>
                <div className="text-right">
                  <Button
                    variant="orange"
                    type="button"
                    size="sm"
                    onClick={() => setOpenAddFAQ(true)}
                    className=""
                  >
                    Add New FAQ
                  </Button>
                </div>
              </div>
            </div>
            {getFaqAccrItems(form.getValues("faqs"))?.length ? (
              <div className="col-span-4">
                <ProductAccordion
                  items={getFaqAccrItems(form.getValues("faqs"))}
                  onDelete={(index) => removeFaq(index)}
                  className="mt-4"
                />
              </div>
            ) : (
              <div className="col-span-4 text-gray-500 mb-5">
                <p>
                  No FAQ added yet. Click on &ldquo;Add New FAQ &ldquo; to add.
                </p>
              </div>
            )}

            <div>
              <InputImageField
                name="pictures"
                label="Plants Pictures"
                labelClassName="text-[20px] font-semibold"
                multiple={true}
                accept="image/jpeg, image/jpg, image/png, image/webp"
                placeholder="Pictures"
                className="rounded-md"
                formControl={form.control}
                // description="Insert images of the plant"
                description={`Pictures with ${
                  ALLOWED_MAX_FILE_SIZE / 1000
                } Kb file size and .jpg, .jpeg, .png and .webp formats are allowed`}
                descriptionClassName="text-md font-lg"
                onchange={(data) => processPictures(data)}
              />
            </div>
            <div className="col-span-3 flex column">
              {previews.map((item, index) => {
                return (
                  <div
                    className="relative w-28 h-28 mr-2"
                    key={`preview_${index}`}
                  >
                    <Image src={item} alt="" fill objectFit="contain" />
                  </div>
                );
              })}
            </div>
            <div className="mt-3 ">
              <SwitchField
                name="status"
                label="Status"
                formControl={form.control}
                className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-gray-300"
              />
            </div>
            <div className="col-span-4">
              <Button variant="orange" size="md" type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <CustomDialog
        title="Add a key specification"
        open={openKeySpec}
        onclose={(open: boolean) => setOpenKeySpec(open)}
      >
        <AddSpecificatin
          onAdd={(data) => append(data)}
          onClose={() => setOpenKeySpec(false)}
        />
      </CustomDialog>
      <CustomDialog
        title="Add new FAQ"
        open={openAddFAQ}
        onclose={(open: boolean) => setOpenAddFAQ(open)}
      >
        <AddFAQ
          onAdd={(data) => appendFaq(data)}
          onClose={() => setOpenAddFAQ(false)}
        />
      </CustomDialog>
    </>
  );
}
