"use client";

import TextField from "@/components/form-fields/text-field";
import CustomDialog from "@/components/layout/Dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { updateHomeVideos } from "@/lib/api-routes/api-admin";
import { YT_VIDEOS_LENGTH } from "@/lib/constants";
import { showErrorToast, showSuccessToast } from "@/lib/helper";
import { videoSchema } from "@/lib/schemas/admin";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { Edit } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

type VideoFormFields = z.infer<typeof videoSchema>;
interface VideoSectionProps {
  videos: string[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
  const dispatch = useDispatch();
  const [videoUrls, setVideoUrls] = useState<string[]>(videos);
  const [openEditForm, setOpenEditForm] = useState(false);

  const form = useForm<VideoFormFields>({
    defaultValues: {
      videos,
    },
  });

  const onSubmit: SubmitHandler<VideoFormFields> = async (values) => {
    try {
      if (values.videos.some((v) => !v || String(v).trim() === "")) {
        showErrorToast("valid videos are required.");
        return;
      }
      dispatch(showLoader());
      const data = structuredClone(values);
      await updateHomeVideos(data);
      showSuccessToast("Youtube videos updated successfully");
      setOpenEditForm(false);
      setVideoUrls(values.videos);
    } catch (err) {
      showErrorToast("Error updating videos");
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="w-full max-w-[1486px] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold">
          <span className="text-[rgba(0,97,31,1)]">Our</span> Nursery Videos
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {videoUrls.map((url, idx) => (
          <div
            key={idx}
            className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              src={url.replace("watch?v=", "embed/")}
              title={`YouTube Video ${idx + 1}`}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Button
          onClick={() => setOpenEditForm(true)}
          className="flex items-center gap-4 bg-[#F37521] hover:bg-[#e0661c] text-white rounded-lg p-4 py-4 cursor-pointer"
        >
          <Edit className="w-4 h-4" /> Edit Videos
        </Button>
      </div>

      <CustomDialog
        title="Edit YouTube Videos"
        open={openEditForm}
        onclose={(open: boolean) => {
          if (!open) form.reset({ videos: videoUrls });
          setOpenEditForm(open);
        }}
        className="w-full max-w-lg"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {Array.from({ length: YT_VIDEOS_LENGTH }).map((_, idx) => (
              <TextField
                key={idx}
                name={`videos.${idx}`}
                label={`Video ${idx + 1} URL`}
                placeholder="https://www.youtube.com/watch?v=..."
                formControl={form.control}
              />
            ))}

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                className="bg-[#00611F] hover:bg-[#004d18] text-white rounded-lg px-4 py-2"
              >
                Save Videos
              </Button>
            </div>
          </form>
        </Form>
      </CustomDialog>
    </div>
  );
}
