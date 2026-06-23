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

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Raigad Fort" },
      {
        name: "description",
        content: "Access your Raigad Fort booking account.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginType, setLoginType] =
  useState("ROLE_CUSTOMER");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data;

      localStorage.setItem(
        "token",
        token
      );

      const userResponse = await axios.get(
        `http://localhost:8081/api/users/email/${email}`
      );

      console.log("User Response:", userResponse.data);


      localStorage.setItem(
  "userEmail",
  userResponse.data.email
);

localStorage.setItem(
  "fullName",
  userResponse.data.fullName
);
localStorage.setItem(
  "userId",
  userResponse.data.id
);

console.log("ROLE =", userResponse.data.role);

localStorage.setItem(
  "role",
  userResponse.data.role
);
localStorage.setItem(
  "city",
  userResponse.data.city
);

localStorage.setItem(
  "phone",
  userResponse.data.phone
);

if (
  userResponse.data.role !== loginType
) {
  toast.error(
    "Wrong Login Type Selected"
  );
  return;
}

toast.success("Login Successful");

if (userResponse.data.role === "ROLE_ADMIN") {
  nav({ to: "/admin" });
}
else if (
  userResponse.data.role === "ROLE_SECURITY"
) {
  nav({ to: "/security" });
}
else {
  nav({ to: "/dashboard" });
}

    } catch (error) {

      console.error(error);

      toast.error("Invalid Email or Password");

    }
  };

  return (
    <PublicLayout>
      <section className="container mx-auto px-4 py-16 grid place-items-center">
        <Card className="w-full max-w-md border-border/60 shadow-lg">
          <CardContent className="p-8 space-y-6">

            <div className="text-center space-y-2">
              <div className="mx-auto h-12 w-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                <Mountain className="h-6 w-6" />
              </div>

              <h1 className="font-display text-3xl">
                Welcome Back
              </h1>

              <p className="text-sm text-muted-foreground">
                Sign in to manage your bookings
              </p>
            </div>

            <form
              className="space-y-4"
              onSubmit={handleLogin}
              
            >
              <div className="space-y-1.5">
  <Label>Login As</Label>

  <select
    className="w-full border rounded p-2"
    value={loginType}
    onChange={(e) =>
      setLoginType(e.target.value)
    }
  >
    <option value="ROLE_CUSTOMER">
      Visitor
    </option>

    <option value="ROLE_SECURITY">
      Security
    </option>

    <option value="ROLE_ADMIN">
      Admin
    </option>
  </select>
</div>
              <div className="space-y-1.5">
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
                className="w-full"
              >
                Sign In
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              New here?{" "}
              <Link
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                Create account
              </Link>
            </div>

          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
}
