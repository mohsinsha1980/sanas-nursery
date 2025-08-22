"use client";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useEffect } from "react";
import { Router } from "next/router";
import { hideLoader, showLoader } from "@/redux/uiSlice";

const Loader = () => {
  const dispatch = useDispatch();
  const loader = useSelector((state: RootState) => (state.ui as { loader: boolean }).loader);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      dispatch(showLoader());
    });

    Router.events.on("routeChangeComplete", () => {
      dispatch(hideLoader());
    });

    Router.events.on("routeChangeError", () => {
      dispatch(hideLoader());
    });
  }, [dispatch]);

  return (
    loader && (
      <div
        style={{
          display: loader ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 5,
        }}
      >
        <h3>Loading...</h3>
      </div>
    )
  );
};
export default Loader;
