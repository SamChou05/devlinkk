import { Button } from "@/components/ui/button";
import { ApplicationVenture } from "@/server/api/routers/types";
import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { CheckIcon } from "@heroicons/react/24/solid";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export const AcceptApplicationButton: React.FC<{
  application: ApplicationVenture;
}> = ({ application }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isHireLoading, setIsHireLoading] = useState(false);

  const { mutate } = api.applications.acceptApplication.useMutation({
    onSuccess: (data) => {
      setIsHireLoading(false);
      setShowDialog(false);
      toast.success("Venture updated!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      console.error("Error updating venture:", errorMessage);
      setIsHireLoading(false);
      setShowDialog(false);
      toast.error("Error updating venture");
    },
  });

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowDialog(true);
  };

  const acceptApplication = async (
    applicationId: string,
    ventureId: string,
  ) => {
    mutate({ applicationId, ventureId });
  };

  const user = application?.investor.user;
  return (
    <>
      <Button onClick={onClick} className="w-full px-6">
        Hire
      </Button>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to hire {user?.firstName} {user?.lastName}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                setIsHireLoading(true);

                acceptApplication(application.id, application.ventureId);
              }}
              className="bg-primary hover:bg-primary/70"
            >
              {isHireLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckIcon className="mr-2 h-4 w-4" />
              )}
              <span>Confirm</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
