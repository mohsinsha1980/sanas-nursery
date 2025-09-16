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
import { CATEGORY_ARR } from "@/lib/constants";
import Link from "next/link";

const defaultMasterData = {
  tags: [],
};

interface CategoryFilterProps {
  category: string;
}

export default function Filters({ category }: CategoryFilterProps) {
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
        className={`w-full h-full px-4 py-3 lg:py-2 rounded-lg shadow-md shadow-gray-400 flex items-center justify-between `}
      >
        <h3 className="text-base lg:text-[16px] font-semibold">Filters</h3>
        <Button
          variant="link"
          className="justify-end btn-red text-sm lg:text-[14px] font-semibold text-red-600"
          size="sm"
          onClick={reset}
        >
          Clear All
        </Button>
      </div>

      <div className="w-full lg:h-full h-auto lg:py-3 lg:mt-5 mt-4 rounded-lg shadow-md shadow-gray-400 flex flex-col lg:items-start items-start justify-between p-4">
        {CATEGORY_ARR.map((cat) => (
          <Link
            key={cat.value}
            href={`/categories/${cat.value}`}
            className={`px-3 py-2 lg:py-2 text-base lg:text-lg font-medium transition-colors duration-200 cursor-pointer rounded-md w-full text-left
            ${
              category === cat.value
                ? "text-[#f37521] font-semibold bg-orange-50"
                : "text-gray-700 hover:text-[#f37521] hover:bg-gray-50"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {PLANT_SIZES_ARR.length ? (
        <div className={`lg:mt-5 mt-2`} key="sizes">
          <MultiCheckBoxFilter
            label="Select Size"
            value={sizes ? sizes.split(",") : []}
            setValue={(value: string[]) => setSizes(value.join(","))}
            options={PLANT_SIZES_ARR}
          />
        </div>
      ) : null}

      {CARE_LEVEL_ARR?.length ? (
        <div className={`lg:mt-5 mt-2`} key="care">
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
      <div className="md:hidden">
        <Button
          variant="orange"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-out hover:scale-105 active:scale-95"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
            />
          </svg>
          <span>Filters</span>
        </Button>
      </div>

      <div className="hidden lg:block">{FilterContent}</div>

      <div
        className={`fixed inset-0 z-50 flex md:hidden transition-all duration-500 ease-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-500 ease-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-2xl p-4 max-h-[80vh] overflow-y-auto
          transform transition-all duration-500 ease-out
          ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 ease-out hover:scale-110 active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          <div className="space-y-4">{FilterContent}</div>
        </div>
      </div>
    </>
  );
}
