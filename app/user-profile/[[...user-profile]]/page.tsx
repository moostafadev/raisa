"use client";

import { Button } from "@/components/ui/button";
import { UserProfile } from "@clerk/nextjs";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const UserProfilePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-4 flex-col">
      <Button
        className="self-end ml-4 mb-2"
        onClick={() => router.replace("/admin")}
      >
        <X size={30} />
      </Button>
      <UserProfile path="/user-profile" />
    </div>
  );
};

export default UserProfilePage;
