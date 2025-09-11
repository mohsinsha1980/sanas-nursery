"use client";
import CustomDialog from "@/components/layout/Dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useState } from "react";
import PasswordChangeForm from "./password-change-form";

export default function AccountSettings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Account Settings
        </h2>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Lock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Change Password
                  </h3>
                  <p className="text-gray-600">
                    Update your password to keep your account secure
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowPasswordForm(true)}
                variant="orange"
                size="sm"
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <CustomDialog
        title="Change Password"
        open={showPasswordForm}
        onclose={(open: boolean) => setShowPasswordForm(open)}
        className="max-w-sm"
      >
        <PasswordChangeForm onClose={() => setShowPasswordForm(false)} />
      </CustomDialog>
    </>
  );
}
