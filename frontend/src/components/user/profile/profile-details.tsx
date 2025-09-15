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
      <div className="mb-6 sm:mb-8">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 flex-shrink-0">
                  <AvatarFallback className="bg-green-100 text-gray-700 text-lg font-semibold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                    {user.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 truncate">
                    {user.email}
                  </p>
                  {user.phone ? (
                    <p className="text-sm sm:text-base text-gray-600 truncate">
                      {user.phone}
                    </p>
                  ) : null}
                </div>
              </div>
              <Button
                onClick={() => setShowEditForm(true)}
                variant="orange"
                size="sm"
                className="flex items-center gap-2 w-full sm:w-auto"
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
