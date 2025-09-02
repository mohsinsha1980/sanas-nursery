"use client";
import CardsSection from "@/components/admin/home/cards-section";
import GreenChoices from "@/components/admin/home/green-choices";
import { getHomeData } from "@/lib/api-routes/api-admin";
import { getErrorMessage, showErrorToast } from "@/lib/helper";
import { HomeBannerSectionType } from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function HomePageComponent() {
  const dispatch = useDispatch();
  const [homeData, setHomeData] = useState<HomeBannerSectionType>();

  useEffect(() => {
    const controller = new AbortController();
    const getHomeDataHandler = async () => {
      try {
        dispatch(showLoader());
        const response = await getHomeData(controller);
        const updatedResponse = structuredClone(response.data.data);
        setHomeData(updatedResponse);
        dispatch(hideLoader());
      } catch (error: unknown) {
        dispatch(hideLoader());
        showErrorToast(getErrorMessage(error as AxiosError));
      }
    };

    getHomeDataHandler();

    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [dispatch]);

  return (
    <>
      <GreenChoices data={homeData?.greenChoices || []} />
      {/* <TopSection data={homeData?.top} />
      <MiddleSection data={homeData?.middle} /> */}
      <CardsSection data={homeData?.cards} />
    </>
  );
}
