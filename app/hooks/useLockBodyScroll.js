"use client";
import { useLayoutEffect } from "react";

export const useLockBodyScroll = () => {
    useLayoutEffect(() => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      scrollTo(0, 0);
      return () => {(document.body.style.overflow = originalStyle)};
    }, []);
  }