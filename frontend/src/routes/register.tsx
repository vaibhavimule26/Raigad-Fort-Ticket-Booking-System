import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mountain } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — Raigad Fort" },
      {
        name: "description",
        content: "Create a Raigad Fort visitor account.",
      },
    ],
  }),
  component: Register,
});

function Register() {
  const nav = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [otp, setOtp] = useState("");
const [showOtpBox, setShowOtpBox] = useState(false);

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/register",
        {
          fullName: `${firstName} ${lastName}`,
          email: email,
          phone: phone,
            city :city,
          password: password,
        }
      );

      toast.success(response.data);

      setShowOtpBox(true);
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed");
    }
  };

  return (
    <PublicLayout>
      <section className="container mx-auto px-4 py-16 grid place-items-center">
        <Card className="w-full max-w-lg border-border/60 shadow-lg">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto h-12 w-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                <Mountain className="h-6 w-6" />
              </div>

              <h1 className="font-display text-3xl">
                Create your account
              </h1>

              <p className="text-sm text-muted-foreground">
                Quick sign-up — start booking in minutes
              </p>
            </div>

            <form
              className="grid sm:grid-cols-2 gap-4"
              onSubmit={handleRegister}
            >
              <div className="space-y-1.5">
                <Label>First Name</Label>
                <Input
                  value={firstName}
                  onChange={(e) =>
                    setFirstName(e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label>Last Name</Label>
                <Input
                  value={lastName}
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label>ID Type</Label>
                <Input
                  placeholder="Aadhaar / Passport"
                  required
                />
              </div>

              <div className="space-y-1.5">
  <Label>City</Label>
  <Input
    value={city}
    onChange={(e) =>
      setCity(e.target.value)
    }
    required
  />
</div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>

              <Button
                type="submit"
                className="sm:col-span-2 w-full"
              >
                Create Account
              </Button>
            </form>

            {showOtpBox && (
  <div className="space-y-4 mt-6">

    <Label>Enter OTP</Label>

    <Input
      value={otp}
      onChange={(e) =>
        setOtp(e.target.value)
      }
      placeholder="6-digit OTP"
    />

    <Button
      className="w-full"
      onClick={async () => {

        try {

          const response =
            await axios.post(
              "http://localhost:8081/api/auth/verify-otp",
              {
                email,
                otp
              }
            );

          toast.success(response.data);

          nav({
            to: "/login"
          });

        } catch (error) {

          console.error(error);

          toast.error(
            "OTP Verification Failed"
          );

        }

      }}
    >
      Verify OTP
    </Button>
    <Button
  variant="outline"
  className="w-full"
  onClick={async () => {

    try {

      const response =
        await axios.post(
          "http://localhost:8081/api/auth/resend-otp",
          {
            email
          }
        );

      toast.success(
        response.data
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed To Resend OTP"
      );

    }

  }}
>
  Resend OTP
</Button>

  </div>
)}

            <div className="text-center text-sm text-muted-foreground">
              Have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
}