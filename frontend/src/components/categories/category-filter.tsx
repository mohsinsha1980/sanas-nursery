"use client";
import { getMasterData } from "@/lib/api-routes/api-public";
import { CARE_LEVEL_ARR, PLANT_SIZES_ARR } from "@/lib/constants";
import { getErrorMessage, showErrorToast } from "@/lib/helper";
import { MasterData, MasterDataOptionsType } from "@/lib/types/admin-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import classes from "./filter.module.css";
import MultiCheckBoxFilter from "./multi-check-filter";

const defaultMasterData = {
  tags: [],
};

export default function Filters() {
  const dispatch = useDispatch();
  const [masterData, setMasterData] =
    useState<MasterDataOptionsType>(defaultMasterData);

  const [sizes, setSizes] = useQueryState("sizes", {
    defaultValue: "",
    shallow: false,
  });
  const [tags, setTags] = useQueryState("tags", {
    defaultValue: "",
    shallow: false,
  });
  const [care_levels, setCareLevels] = useQueryState("care_levels", {
    defaultValue: "",
    shallow: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    const getMasterDataHandler = async () => {
      try {
        dispatch(showLoader());
        const response = await getMasterData(controller);
        const data: MasterData = response.data.data;
        setMasterData({
          tags: data.tags,
        });
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

  const reset = (): void => {
    setSizes("");
    setTags("");
    setCareLevels("");
  };

  return (
    <>
      <div className={classes.bl_filters}>
        <div
          className={`${classes.bl_filter} pt-2 !pb-2 flex items-center justify-between sm:!border-r-0`}
        >
          <h3>Filters</h3>
          <Button
            variant="link"
            className="justify-end btn-red"
            size="sm"
            onClick={reset}
          >
            Clear All
          </Button>
        </div>

        {PLANT_SIZES_ARR.length ? (
          <div
            className={`sm:!border-r-0 ${classes.bl_filter}`}
            key="materials"
          >
            <MultiCheckBoxFilter
              label="Select Size"
              value={sizes ? sizes.split(",") : []}
              setValue={(value: string[]) => setSizes(value.join(","))}
              options={PLANT_SIZES_ARR}
            />
          </div>
        ) : null}

        {CARE_LEVEL_ARR?.length ? (
          <div className={`${classes.bl_filter} sm:!border-r-0`} key="sizes">
            <MultiCheckBoxFilter
              label="Select Care Levels"
              value={care_levels ? care_levels.split(",") : []}
              setValue={(value: string[]) => setCareLevels(value.join(","))}
              options={CARE_LEVEL_ARR}
            />
          </div>
        ) : null}

        {masterData?.tags.length ? (
          <div className={`${classes.bl_filter} sm:!border-r-0`} key="styles">
            <MultiCheckBoxFilter
              label="Select Tags"
              value={tags ? tags.split(",") : []}
              setValue={(value: string[]) => setTags(value.join(","))}
              options={masterData.tags}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
