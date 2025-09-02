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
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

type FormFields = z.infer<typeof homeCardSchema>;
interface CardFormProps {
  defaultData: DefultHomeCardType;
  field: string;
  data?: HomeCardType;
}

export default function CardsForm({ defaultData, field, data }: CardFormProps) {
  console.log("data", defaultData);
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
      const updatedCardrData = {
        ...values,
        field,
      };
      const response = await updateHomeCard(updatedCardrData);
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

  console.log(
    "typeof form.getValues",
    typeof form.getValues("picture"),
    form.getValues("picture")
  );

  const imageSrc = form.getValues("picture")
    ? typeof form.getValues("picture") === "string"
      ? getPicURL(form.getValues("picture") as string)
      : URL.createObjectURL(form.getValues("picture") as File)
    : defaultData.picture;

  return (
    <>
      <Link href="javascript:;" onClick={() => setOpenConfirm(true)}>
        <div className="relative w-120 h-80">
          <Image
            src={imageSrc}
            alt="Plant picture"
            fill
            className="rounded-md object-cover"
          />
          <div className="absolute content bl_content">
            <h3 style={{ color: form.getValues("smallColor") || "inherit" }}>
              {form.getValues("small") || defaultData.small}
            </h3>
            <h2 style={{ color: form.getValues("largeColor") || "inherit" }}>
              {form.getValues("large") || defaultData.big}
            </h2>
            <span style={{ color: form.getValues("link.color") || "inherit" }}>
              {form.getValues("link.label") || defaultData.linkLabel}
            </span>
          </div>
        </div>
      </Link>

      <CustomDialog
        title={`Update ${field}`}
        open={openEditForm}
        onclose={(open: boolean) => {
          form.reset();
          setOpenConfirm(open);
        }}
        className="max-w-[400px]"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 mb-4">
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
                name="link.label"
                label="Link label"
                placeholder="Shop now"
                formControl={form.control}
              />
              <TextField
                name="link.address"
                label="Link address"
                placeholder="https://yourlink.com/"
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
              <InputImageField
                name="picture"
                label="Picture"
                placeholder="Picture.jpg"
                formControl={form.control}
                description="Valid image extensions: .jpg, .jpeg, .png, .webp"
              />
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </CustomDialog>
    </>
  );
}
