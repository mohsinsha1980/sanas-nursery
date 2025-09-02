"use client";
import CardsSection from "@/components/admin/home/cards-section";
import GallerySection from "@/components/admin/home/gallery";
import GreenChoices from "@/components/admin/home/green-choices";
import VideoSection from "@/components/admin/home/video-section";
import { getHomeData } from "@/lib/api-routes/api-admin";
import { defultHomeData } from "@/lib/constants";
import { getErrorMessage, showErrorToast } from "@/lib/helper";
import { HomeDataType } from "@/lib/types/common-types";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function HomePageComponent() {
  const dispatch = useDispatch();
  const [homeData, setHomeData] = useState<HomeDataType>();

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
      <CardsSection data={homeData?.cards} />
      <GallerySection images={homeData?.gallery} />
      <VideoSection videos={homeData?.videos || defultHomeData.Videos} />
    </>
  );
}
