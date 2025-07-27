"useclient";
import { Button } from "@/components/ui/button";
import { loginApi } from "@/services/authService";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface LoginProps {
  handleLoginAndRegister: (page: "Login" | "Register") => void;
}

export default function Login({ handleLoginAndRegister }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(process.env.BASE_API_URL);
  }, []);

  const onSubmit = async (data: any) => {
    await loginApi(data);
  };

  return (
    <div>
      <div>
        {/* <Button className="bg-white text-black w-full" variant="outline">
          <Image
            src="/images/google.png"
            alt="facebook"
            width={30}
            height={30}
          />
          <div>Đăng nhập bằng Google</div>
        </Button>
        <Button className="bg-white text-black mt-3 w-full" variant="outline">
          <Image
            src="/images/facebook.png"
            alt="facebook"
            width={30}
            height={30}
          />
          <div className="ml-2">Đăng nhập bằng Facebook</div>
        </Button>
        <Separator className="mt-3" /> */}
        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label>Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                className="w-full border p-2 rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "At least 6 characters",
                  },
                })}
                className="w-full border p-2 rounded"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="bg-primary w-full" size={"lg"}>
              Đăng nhập
            </Button>
          </form>
        </div>
        <div className="mt-2 flex justify-between">
          <div
            className="text-primary text-sm hover-opacity"
            onClick={() => {
              handleLoginAndRegister("Register");
            }}
          >
            Đăng ký
          </div>
          <div className="text-primary text-sm hover-opacity">
            Quên mật khẩu
          </div>
        </div>
      </div>
    </div>
  );
}
