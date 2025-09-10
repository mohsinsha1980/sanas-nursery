"use client";

import CustomDialog from "@/components/layout/Dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ProductAccordion } from "@/components/common/accordion";
import InputImageField from "@/components/form-fields/input-image";
import MultipleSelectField from "@/components/form-fields/multi-select-field";
import RichTextField from "@/components/form-fields/rich-text-editor";
import SmartBox from "@/components/form-fields/smart-box";
import SwitchField from "@/components/form-fields/switch-field";
import TextArea from "@/components/form-fields/text-area";
import TextField from "@/components/form-fields/text-field";
import {
  getMasterData,
  getPlantById,
  updatePlant,
} from "@/lib/api-routes/api-admin";
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
  getPicURL,
  showErrorToast,
  showSuccessToast,
  STATUS,
} from "@/lib/helper";
import { editPlantSchema } from "@/lib/schemas/admin";
import { EditPlantFields, MasterData } from "@/lib/types/admin-types";
import { PlantTypes } from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import AddFAQ from "./add-faq";
import AddSpecificatin from "./add-specification";

const defaultValues: EditPlantFields = {
  plantId: "",
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
  pictures: [],
  status: true,
};

const defaultMasterData: MasterData = {
  tags: [],
};

type EditPlantProps = {
  plantId: string | undefined;
};

export default function EditPlantForm({ plantId }: EditPlantProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openKeySpec, setOpenKeySpec] = useState<boolean>(false);
  const [openAddFAQ, setOpenAddFAQ] = useState<boolean>(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [, setMasterData] = useState<MasterData>(defaultMasterData);

  const form = useForm<EditPlantFields>({
    resolver: zodResolver(editPlantSchema),
    defaultValues,
  });

  useEffect(() => {
    const controller = new AbortController();
    const fetchPlant = async () => {
      try {
        dispatch(showLoader());
        const plantResponse = await getPlantById(plantId as string, controller);
        const plantData: PlantTypes = plantResponse.data.data;
        if (plantData) {
          form.reset({
            plantId: plantData.plantId,
            title: plantData.title,
            slug: plantData.slug,
            details: plantData.details || "",
            pictures: plantData.pictures || [],
            category: plantData.category || "",
            size: plantData.size || "",
            careLevel: plantData.careLevel || "",
            tags: plantData.tags || [],
            specifications: plantData.specifications || [],
            faqs: plantData.faqs || [],
            metaDescription: plantData.metaDescription || "",
            summary: plantData.summary || "",
            description: plantData.description || "",
            status: plantData.status === STATUS.ACTIVE ? true : false,
          });
        }

        setPreviews(plantData.pictures.map((pic: string) => getPicURL(pic)));
      } catch (error) {
        showErrorToast(getErrorMessage(error as AxiosError));
      } finally {
        dispatch(hideLoader());
      }
    };

    if (plantId) {
      fetchPlant();
    }

    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [plantId, dispatch, form]);

  const onSubmit: SubmitHandler<EditPlantFields> = async (
    values: EditPlantFields
  ) => {
    try {
      dispatch(showLoader());
      const newPlant = structuredClone(values);
      await updatePlant(newPlant);
      showSuccessToast("Plant Updated successfully");
      form.reset();
      router.back();
    } catch (error: unknown) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  const processPictures = (pictures: FileList) => {
    const objects = [];
    if (pictures?.length) {
      for (let i = 0; i < pictures.length; i++) {
        objects.push(URL.createObjectURL(pictures[i]));
      }
    }
    setPreviews(objects);
  };

  const { remove, append } = useFieldArray({
    control: form.control,
    name: "specifications",
  });

  const { append: appendFaq, remove: removeFaq } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-4 gap-4 mb-4 mt-5">
            <div className="col-span-2">
              <TextField
                name="title"
                label="Title"
                placeholder="Title"
                inputType="text"
                className="rounded-md"
                labelClassName="text-[20px] font-semibold"
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
                labelClassName="text-[20px] font-semibold"
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

            <div
              className="col-span-4"
              key={form.getValues("details").slice(0, 5) + "_details"}
            >
              <RichTextField
                name="details"
                label="Plant Details"
                labelClassName="text-[20px] font-semibold"
                placeholder="Details"
                formControl={form.control}
              />
            </div>

            <div
              className="col-span-4"
              key={form.getValues("description").slice(0, 5) + "_description"}
            >
              <RichTextField
                name="description"
                label="Plant Description"
                labelClassName="text-[20px] font-semibold"
                placeholder="Add description about the plant"
                formControl={form.control}
              />
            </div>

            <div className="col-span-4">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-3">
                  <p className="mb-0 text-[20px] font-semibold pt-5">
                    Key Specifications
                    {form?.formState?.errors?.specifications?.message ? (
                      <div className="text-[0.8rem] font-medium text-destructive">
                        {form?.formState?.errors?.specifications?.message}
                      </div>
                    ) : null}
                  </p>
                </div>
                <div className="text-right">
                  <Button
                    variant="orange"
                    type="button"
                    size="md"
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
                    <TableRow>
                      <TableHead className="w-1/3 text-[16px] font-semibold">
                        Key
                      </TableHead>
                      <TableHead className="w-1/3 text-[16px] font-semibold">
                        Value
                      </TableHead>
                      <TableHead className="w-1/3 text-end text-[16px] font-semibold">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {form.getValues("specifications")?.length ? (
                      form.getValues("specifications").map((obj, index) => (
                        <TableRow key={`specification-${index}`}>
                          <TableCell className="w-1/3 text-[15px]">
                            {obj.label}
                          </TableCell>
                          <TableCell className="w-1/3 text-[15px]">
                            {obj.value}
                          </TableCell>
                          <TableCell className="w-1/3">
                            <div className="flex justify-end">
                              <Trash2Icon
                                size="20"
                                color="red"
                                onClick={() => remove(index)}
                                className="cursor-pointer"
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-center text-gray-500"
                        >
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
              <MultipleSelectField
                name="tags"
                label="Tags"
                labelClassName="text-[17px] font-semibold"
                placeholder="Select"
                formControl={form.control}
                options={CARE_LEVEL_ARR}
              />
            </div>

            <div className="col-span-4 mt-4 ">
              <div className="grid grid-cols-4  ">
                <div className="col-span-3  ">
                  <h4 className="mb-0 text-[20px] font-semibold">
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
                    size="md"
                    onClick={() => setOpenAddFAQ(true)}
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
                  className=""
                />
              </div>
            ) : (
              <div className="col-span-4 text-gray-500 mb-5">
                <p>
                  No FAQ added yet. Click on &quot;Add New FAQ &quot; to add.
                </p>
              </div>
            )}

            <div className="pt-5 ">
              <InputImageField
                name="pictures"
                label="Plants Pictures"
                labelClassName="text-[20px] font-semibold "
                multiple={true}
                accept="image/jpeg, image/jpg, image/png, image/webp"
                placeholder="Pictures"
                className="rounded-md"
                formControl={form.control}
                description={`Pictures with ${
                  ALLOWED_MAX_FILE_SIZE / 1000
                } Kb file size and .jpg, .jpeg, .png and .webp formats are allowed`}
                descriptionClassName="text-md font-lg"
                onchange={(data) => processPictures(data)}
              />
            </div>
            <div className="col-span-3 flex column pt-10">
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
            <div className="mt-3">
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
