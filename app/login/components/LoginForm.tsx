"use client"

import Button from '@/app/components/Button'
import Input from '@/app/components/Input';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

const LoginForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
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
        handleSubmit
      } = useForm<FieldValues>({
        defaultValues: {
          email: "",
          password: "",
        }
      })

      const onSubmit: SubmitHandler<FieldValues> = async (data) => {
          try {
            setIsLoading(true);
  
            
            signIn("credentials", data)
              .then((callback) => {
                if(callback?.error) {
                  toast.error("لطفا دوباره تلاش کنید")
                }
                if(callback?.ok && !callback?.error) {
                  toast.success("خوش آمدید")
                }
              })
          } catch (error) {
            toast.error("مشکلی پیش آمده!")
          } finally {
            setIsLoading(false);
          }
    }
    
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
                        ورود
                      </p>
                  </div>

                  <div className="w-full">
                      <Input
                          label="ایمیل"
                          id="email"
                          register={register}
                          errors={errors}
                          required
                          disabled={isLoading}
                          type="email"
                      />
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
                      />
                  </div>

                  <div className="w-full">
                      <Button
                          disabled={isLoading}
                          purple
                          widthFull
                          type="submit"
                      >
                          ورود
                      </Button>
                  </div>

                  <div className="flex gap-2 items-center justify-center">
                      <div className="text-white text-sm">
                        نیاز به ساخت اکانت دارید؟
                      </div>
                      <Link
                        href="/register"
                          className="underline text-sm text-sky-600 cursor-pointer"
                      >
                        ثبت نام
                      </Link>
                  </div>
              </div>
        </form>
      </div>
  )
}

export default LoginForm
