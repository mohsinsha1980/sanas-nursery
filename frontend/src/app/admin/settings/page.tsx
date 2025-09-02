"use client";
import TagsField from "@/components/admin/settings/tags/tag-field";
import { getMasterData } from "@/lib/api-routes/api-admin";
import { getErrorMessage, showErrorToast } from "@/lib/helper";
import { MasterData } from "@/lib/types/admin-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const defaultMasterData = {
  tags: [],
};

const settingsPage = () => {
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
      <div className="flex flex-row">
        <div className="basis-3/4">
          <h1>Settings</h1>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <TagsField data={masterData.tags} />
        </div>
      </div>
    </>
  );
};

export default settingsPage;
