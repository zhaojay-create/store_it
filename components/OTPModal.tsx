"use client";

import { FC, useState } from "react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "./ui/button";
import { sendEmailODP, verifyOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

interface OTPModalProps {
  accountId: string;
  email: string;
}

const OTPModal: FC<OTPModalProps> = ({ accountId, email }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // verify OTP
      const sessionId = await verifyOTP({ accountId, password });
      if (sessionId) {
        router.push("/");
      }

      console.log("verify OTP");
    } catch (error) {
      console.log("failed to verify OTP", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    // 调用 resend OTP
    await sendEmailODP({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="flex flex-col justify-center items-center">
        <AlertDialogHeader className="relative flex justify-center items-center">
          <AlertDialogTitle className="text-center text-2xl">
            Enter your OTP
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-light-100">
            we&apos;ve send a code to your email:{" "}
            <span className="p-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="flex justify-center">
            {[...Array(6)].map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="text-brand rounded-xl "
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>
            Continue {isLoading && "..."}
          </AlertDialogAction>
        </AlertDialogFooter>
        <div className="text-center text-brand-100 text-sm">
          Didn&apos;t receive the code?
          <Button type="button" variant="link" onClick={handleResendOTP}>
            click resend
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
