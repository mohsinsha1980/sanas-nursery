"use client";
import TagsField from "@/components/admin/settings/tags/tag-field";
import BlogTagsField from "@/components/admin/settings/blog-tags/blog-tags-field";
import { Card } from "@/components/ui/card";
import { getMasterData } from "@/lib/api-routes/api-admin";
import { getErrorMessage, showErrorToast } from "@/lib/helper";
import { MasterData } from "@/lib/types/admin-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const defaultMasterData = {
  tags: [],
  blogTags: [],
};

const SettingsPage = () => {
  const dispatch = useDispatch();
  const [masterData, setMasterData] = useState<MasterData>(defaultMasterData);

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
        <h1 className="text-3xl font-bold text-gray-900 !px-0">Settings</h1>
      </div>
      <div className="flex gap-4">
        <Card className="w-1/2 px-4 bg-white">
          <div>
            <TagsField data={masterData.tags} />
          </div>
        </Card>
        <Card className="w-1/2 px-4 bg-white">
          <div>
            <BlogTagsField data={masterData.blogTags} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default SettingsPage;
