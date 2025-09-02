"use client";

import Spinner from "@/components/shared/spinner/Spinner";
import { user } from "@/data/user";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function Home() {
  const isLoading = false;
  const userData = user?.data;
  const router = useRouter();

  if (isLoading) {
    return <Spinner />;
  }
  // console.log(user);
  if (!userData) {
    toast.error("Please Login to continue...");
    return router.push("/auth/login");
  }

  return router.push("/analytics");
}
