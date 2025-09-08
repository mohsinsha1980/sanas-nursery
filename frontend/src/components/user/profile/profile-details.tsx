"use client";
import { UserInSessionTypes } from "@/lib/types/user-types";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import CustomDialog from "@/components/layout/Dialog";
import ProfileEditForm from "./profile-edit-form";
import { useState } from "react";
import { getInitials } from "@/lib/helper";

interface ProfileHeaderProps {
  user: UserInSessionTypes;
}

export default function ProfileDetails({ user }: ProfileHeaderProps) {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <>
      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <Card className=" ">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-green-100 text-gray-700 text-lg font-semibold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {user.name}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                  {user.phone ? (
                    <p className="text-gray-600">{user.phone}</p>
                  ) : null}
                </div>
              </div>
              <Button
                onClick={() => setShowEditForm(true)}
                variant="orange"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <CustomDialog
        title="Edit Profile"
        open={showEditForm}
        onclose={(open: boolean) => setShowEditForm(open)}
        className="max-w-sm"
      >
        <ProfileEditForm user={user} onClose={() => setShowEditForm(false)} />
      </CustomDialog>
    </>
  );
}
