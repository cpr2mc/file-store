'use client';

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OTPModal = ({ accountId, email }: { accountId: string, email: string}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call API to verify OTP
      const sessionId = await verifySecret({ accountId, password })

      if (sessionId) router.push("/");
    } catch (error) {
      console.log("Failed to verify OTP", error);
    }

    setIsLoading(false);
  };

  const handleResendOtp = async ( ) => {
    await sendEmailOTP({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader className="relative flex justify-center">
                    <AlertDialogTitle className="h2 text-center">Enter Your OTP</AlertDialogTitle>
                    <AlertDialogDescription className="subtitle-2 text-center text-light-100">
                        We&apos;ve sent a code to{" "} 
                        <span className="pl-1">{email}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={password} onChange={setPassword}>
                    <InputOTPGroup className="shad-otp">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <AlertDialogFooter>
                    <div className="flex w-full flex-col gap-4">
                      
                      <AlertDialogAction 
                        onClick={handleSubmit}
                        className="shad-submit-button"
                        type="button"
                      >
                        Continue
                      </AlertDialogAction>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <div className="subtitle-2 text-center text-light-100">
                        Didn&apos;t get a code?
                        <Button
                          type="button"
                          variant="link"
                          className="pl-1"
                          onClick={handleResendOtp}
                        >
                          Click to resend
                        </Button>
                      </div>
                    </div>
                  </AlertDialogFooter>
            </AlertDialogContent>
    </AlertDialog>
  )
}

export default OTPModal