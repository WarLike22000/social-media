"use client";

import Link from 'next/link';

import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const RegisterForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if(session.status === "authenticated") {
      router.push("/")
    }
  }, [router, session.status]);
  
  const {
    register,
    formState: {
      errors
    },
    handleSubmit,
    watch,
    setError
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: ""
    }
  })


  const username = watch("username");
  const email = watch("email");
  const passwordFirst = watch("password");
  const repeatPassword = watch("repeatPassword");

  const PrevStep = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      if(step === 0) {
        setStep((prevStep) => prevStep + 1)
      } else {
        try {
          setIsLoading(true);

          if(passwordFirst !== repeatPassword) {
            setError("repeatPassword", {
              message: "رمز ها با هم مطابقت ندارند"
            })
            return null;
          }
          
          const { username, email, password } = data;
          
          await axios.post("/api/register", {
            username,
            email,
            password
          })
          .then(() => {
            toast.success("حساب کاربری با موفقیت ساخته شد")
            router.refresh()
            router.push("/login");
          })
        } catch (error) {
          toast.error("مشکلی پیش آمده!")
        } finally {
          setIsLoading(false);
        }
      }
  }

  //conditional rendering 

  if (step === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[100vh]">
        <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-lg"
          >
              <div className="bg-darkGray shadow-lg sm:px-6 px-4 py-4 w-full sm:max-w-md space-y-5 rounded-lg mx-2 border-[1px] border-black">
                  <div className="w-full flex flex-col items-center justify-center">
                      <h3 className="mt-2 text-5xl text-gray-600">
                        LOGO
                      </h3>
                      <p className='text-white font-bold text-xl'>
                        ثبت نام
                      </p>
                  </div>

                  <div className="w-full">
                      <Input
                          label="نام کاربری"
                          id="username"
                          register={register}
                          errors={errors}
                          required
                          disabled={isLoading}
                          type="text"
                          value={username}
                      />
                      <Input
                          label="ایمیل"
                          id="email"
                          register={register}
                          errors={errors}
                          required
                          disabled={isLoading}
                          type="email"
                          value={email}
                      />
                  </div>

                  <div className="w-full">
                      <Button
                          disabled={isLoading}
                          purple
                          widthFull
                          type="submit"
                      >
                          ادامه
                      </Button>
                  </div>

                  <div className="flex gap-2 items-center justify-center">
                      <div className="text-white text-sm">
                        قبلا ثبت نام کرده اید؟
                      </div>
                      <Link
                      href="/login"
                          className="underline text-sm text-sky-600 cursor-pointer"
                      >
                        ورود
                      </Link>
                  </div>
              </div>
        </form>
      </div>
    )
  } 
  else if (step === 1)
    return (
      <div className="flex items-center justify-center w-full h-[100vh]">
        <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-lg"
          >
              <div className="bg-darkGray shadow-lg sm:px-6 px-4 py-4 w-full sm:max-w-md space-y-5 rounded-lg mx-2 border-[1px] border-black">
                  <div className="w-full flex  items-center justify-between">
                      <h3 className="mt-2 text-2xl text-white">
                        رمز عبور 
                      </h3>
                      <div onClick={() => PrevStep()} className='text-white text-xl cursor-pointer hover:text-gray-400 p-3'>
                        <TiArrowBack />
                      </div>
                  </div>

                  <div className="w-full">
                      <Input
                          label="رمز عبور"
                          id="password"
                          register={register}
                          errors={errors}
                          required
                          disabled={isLoading}
                          type={showPassword ? "text" : "password"}
                          VisibilityOff={<MdOutlineVisibilityOff className="text-white" size={20} />}
                          VisibilityOn={<MdOutlineVisibility className="text-white" size={20} />}
                          onClickIcon={(value) => setShowPassword(!value)}
                          showPassword={showPassword}
                          value={passwordFirst}
                      />
                        <Input
                            label="تکرار رمز عبور"
                            id="repeatPassword"
                            register={register}
                            errors={errors}
                            required
                            disabled={isLoading}
                            type={showPassword ? "text" : "password"}
                            VisibilityOff={<MdOutlineVisibilityOff className="text-white" size={20} />}
                            VisibilityOn={<MdOutlineVisibility className="text-white" size={20} />}
                            onClickIcon={(value) => setShowPassword(!value)}
                            showPassword={showPassword}
                            value={repeatPassword}
                        />
                  </div>

                  <div className="w-full">
                      <Button
                          disabled={isLoading}
                          purple
                          widthFull
                          type="submit"
                      >
                          ادامه
                      </Button>
                  </div>

                  <div className="flex gap-2 items-center justify-center">
                      <div className="text-white text-sm">
                        قبلا ثبت نام کرده اید؟
                      </div>
                      <Link
                          href="/login"
                          className="underline text-sm text-sky-600 cursor-pointer"
                      >
                        ورود
                      </Link>
                  </div>
              </div>
        </form>
      </div>
    );
};

export default RegisterForm;

