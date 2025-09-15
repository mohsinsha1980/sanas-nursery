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

  const [isOpen, setIsOpen] = useState(false); // sidebar state

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

  // 🚀 Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const reset = (): void => {
    setSizes("");
    setTags("");
    setCareLevels("");
  };

  const FilterContent = (
    <div className={classes.bl_filters}>
      <div
        className={`w-full h-full p-3 rounded-lg shadow-md shadow-gray-400 flex items-center justify-between`}
      >
        <h3 className="text-[16px] font-semibold">Filters</h3>
        <Button
          variant="link"
          className="justify-end btn-red text-[14px] font-semibold text-red-600"
          size="sm"
          onClick={reset}
        >
          Clear All
        </Button>
      </div>

      {PLANT_SIZES_ARR.length ? (
        <div className={`mt-5`} key="sizes">
          <MultiCheckBoxFilter
            label="Select Size"
            value={sizes ? sizes.split(",") : []}
            setValue={(value: string[]) => setSizes(value.join(","))}
            options={PLANT_SIZES_ARR}
          />
        </div>
      ) : null}

      {CARE_LEVEL_ARR?.length ? (
        <div className={`mt-5`} key="care">
          <MultiCheckBoxFilter
            label="Select Care Levels"
            value={care_levels ? care_levels.split(",") : []}
            setValue={(value: string[]) => setCareLevels(value.join(","))}
            options={CARE_LEVEL_ARR}
          />
        </div>
      ) : null}

      {masterData?.tags.length ? (
        <div className={`${classes.bl_filter} sm:!border-r-0`} key="tags">
          <MultiCheckBoxFilter
            label="Select Tags"
            value={tags ? tags.split(",") : []}
            setValue={(value: string[]) => setTags(value.join(","))}
            options={masterData.tags}
          />
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      {/* Filter button visible only on small devices */}
      <div className="sm:flex lg:hidden justify-end mb-3">
        <Button
          variant="orange"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2"
        >
          <span className="text-sm font-medium">Filters</span>
        </Button>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block">{FilterContent}</div>

      {/* Bottom drawer (only sm) */}
      <div
        className={`fixed inset-0 z-50 flex md:flex lg:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black/40"
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer content at bottom */}
        <div
          className={`fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold pl-2">Filters</h2>
            <Button
              variant="ghost"
              size="md"
              className="font-bold"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </Button>
          </div>
          {FilterContent}
        </div>
      </div>
    </>
  );
}
