import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

type RegisterFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

interface RegisterProps {
  handleLoginAndRegister: (page: "Login" | "Register") => void;
}

export default function Register({ handleLoginAndRegister }: RegisterProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit = (data: RegisterFormInputs) => {
    console.log("Register data:", data);
    // Gửi data lên API để tạo tài khoản
  };

  const password = watch("password");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            type="email"
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Mật khẩu */}
        <div>
          <label className="block mb-1">Mật khẩu</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "At least 6 characters",
              },
            })}
            type="password"
            className="w-full border p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Nhập lại mật khẩu */}
        <div>
          <label className="block mb-1">Nhập lại mật khẩu</label>
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type="password"
            className="w-full border p-2 rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full bg-primary py-2 rounded">
          Đăng ký
        </Button>
        <div
          className="text-primary text-sm hover-opacity mx-auto w-fit"
          onClick={() => {
            handleLoginAndRegister("Login");
          }}
        >
          Đăng nhập
        </div>
      </form>
    </div>
  );
}
