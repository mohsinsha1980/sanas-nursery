"use client";

import ColorPickerField from "@/components/form-fields/color-picker-field";
import InputImageField from "@/components/form-fields/input-image";
import TextField from "@/components/form-fields/text-field";
import CustomDialog from "@/components/layout/Dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { updateHomeCard } from "@/lib/api-routes/api-admin";
import {
  getErrorMessage,
  getPicURL,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { homeCardSchema } from "@/lib/schemas/admin";
import { DefultHomeCardType, HomeCardType } from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

type FormFields = z.infer<typeof homeCardSchema>;

interface CardFormProps {
  defaultData: DefultHomeCardType;
  field: string;
  data?: HomeCardType;
  className?: string;
}

export default function CardsForm({ defaultData, field, data }: CardFormProps) {
  const dispatch = useDispatch();
  const [openEditForm, setOpenConfirm] = useState<boolean>(false);

  const form = useForm<FormFields>({
    defaultValues: {
      small: "",
      smallColor: "#000000",
      large: "",
      largeColor: "#000000",
      link: {
        label: "",
        address: "",
        color: "#d6001c",
      },
      picture: data?.picture,
    },
    resolver: zodResolver(homeCardSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    try {
      dispatch(showLoader());
      const updatedCardData = {
        ...values,
        field,
      };
      const response = await updateHomeCard(updatedCardData);
      showSuccessToast(response.data.message);
      dispatch(hideLoader());
      setOpenConfirm(false);
    } catch (error: unknown) {
      dispatch(hideLoader());
      showErrorToast(getErrorMessage(error as AxiosError));
    }
  };

  useEffect(() => {
    if (data) {
      form.reset({
        small: data?.small || "",
        smallColor: data?.smallColor || "#000000",
        large: data?.large || "",
        largeColor: data?.largeColor || "#000000",
        link: {
          label: data?.link?.label || "",
          address: data?.link?.address || "",
          color: data?.link?.color || "#d6001c",
        },
        picture: data?.picture || null,
      });
    }
  }, [data, form]);

  const imageSrc = form.getValues("picture")
    ? typeof form.getValues("picture") === "string"
      ? getPicURL(form.getValues("picture") as string)
      : URL.createObjectURL(form.getValues("picture") as File)
    : defaultData.picture;

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setOpenConfirm(true)}
        className="relative w-full md:w-1/2 h-[350px] sm:h-[420px] md:h-[472px] lg:h-[350px] rounded-2xl overflow-hidden cursor-pointer group"
      >
        {/* Card Image */}
        <Image
          src={imageSrc}
          alt="Card background"
          fill
          priority
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {/* Overlay with hover effect */}
        <div
          className="absolute bottom-0 left-0 w-full pl-5 group-hover:bg-[rgba(255,255,255,0.5)] flex flex-col items-start justify-center text-left transition-all duration-400 ease-in-out"
          style={{ height: "200px" }}
        >
          <h2
            style={{ color: form.getValues("largeColor") || "white" }}
            className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold mb-3 sm:mb-4"
          >
            {form.getValues("large") || defaultData.big}
          </h2>
          <p
            style={{ color: form.getValues("smallColor") || "white" }}
            className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed mb-4 sm:mb-6"
          >
            {form.getValues("small") || defaultData.small}
          </p>
          <button
            className="w-[140px] h-[46px] rounded-lg bg-white text-[#F37521] font-semibold shadow-md transition-all duration-300 hover:bg-[#F37521] hover:text-white hover:shadow-lg"
          >
            {form.getValues("link.label") || defaultData.linkLabel}
          </button>
        </div>
      </div>

      {/* Edit Dialog */}
      <CustomDialog
        title={`Update Card ${field}`}
        open={openEditForm}
        onclose={(open: boolean) => {
          form.reset();
          setOpenConfirm(open);
        }}
        className="w-full max-w-lg"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                name="large"
                label="Big heading"
                placeholder="Big heading"
                formControl={form.control}
              />
              <ColorPickerField
                name="largeColor"
                label="Big heading color"
                formControl={form.control}
                description="Select a color"
                onchange={(color) =>
                  form.setValue("largeColor", color as string)
                }
              />

              <TextField
                name="small"
                label="Small heading"
                placeholder="Small heading"
                formControl={form.control}
              />
              <ColorPickerField
                name="smallColor"
                label="Small heading color"
                formControl={form.control}
                description="Select a color"
                onchange={(color) =>
                  form.setValue("smallColor", color as string)
                }
              />

              <TextField
                name="link.label"
                label="Link label"
                placeholder="Shop now"
                formControl={form.control}
              />
              <ColorPickerField
                name="link.color"
                label="Link label color"
                formControl={form.control}
                description="Select a color"
                onchange={(color) =>
                  form.setValue("link.color", color as string)
                }
              />

              <div className="col-span-2">
                <TextField
                  name="link.address"
                  label="Link address"
                  placeholder="https://yourlink.com/"
                  formControl={form.control}
                />
              </div>

              <InputImageField
                name="picture"
                label="Picture"
                placeholder="Picture.jpg"
                formControl={form.control}
                description="Valid image extensions: .jpg, .jpeg, .png, .webp"
              />

              {form.getValues("picture") && imageSrc && (
                <Image
                  src={imageSrc}
                  alt="Selected Category"
                  height={200}
                  width={200}
                  className="object-contain"
                />
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                className="bg-[#F37521] hover:bg-[#e0661c] text-white rounded-lg px-4 py-2"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CustomDialog>
    </>
  );
}
