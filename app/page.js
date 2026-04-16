"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/session";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = getStoredUser();
    router.replace(user ? "/dashboard" : "/login");
  }, [router]);

  return <div className="center-screen">กำลังเปิดหน้าใช้งาน...</div>;
}
