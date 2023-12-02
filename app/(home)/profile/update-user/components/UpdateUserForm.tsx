"use client";

import Image from 'next/image';
import Button from '@/app/components/Button';

import { User } from '@prisma/client'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import ImageUpload from '@/app/components/ImageUpload';
import { useEffect, useState } from 'react';
import { Input } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface UpdateUserFormProps {
    currentUser?: User | null;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
    currentUser
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const {
        handleSubmit,
        setValue,
        watch,
        control
      } = useForm<FieldValues>({
        defaultValues: {
          name: currentUser?.name,
          email: currentUser?.email,
          image: currentUser?.image,
        }
      })
      
      const image = watch("image")
    
      const [mounted, setMounted] = useState(false);

      const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
          setIsLoading(true);
    
          await axios.patch("/api/update-user", data)
          .then(() => {
            router.push("/profile")
            toast.success("پروفایل ویرایش شد")
          })
          
        } catch (error) {
          toast.error("مشکلی پیش آمده")
        } finally {
          setIsLoading(false);
        }
      }
      
      useEffect(() => {
        setMounted(true)
      }, []);
    
      if(!mounted) {
        return null
      }
      
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-[100vh] p-4 lg:p-8 space-y-5">
        <div className="flex flex-wrap gap-3 items-center">
            <Image
                src={image || currentUser?.image || "/images/placeholder.jpg"}
                width={150}
                height={150}
                alt='profile-image'
                className="rounded-full object-cover"
            />
            <ImageUpload
                    value={image ? [image] : []}
                    onChange={(url) => setValue("image", url)}
                    onRemove={() => setValue("image", "")}
                    disabled={isLoading}
                    icon={<MdOutlineAddPhotoAlternate size={23} />}
                    showImage={false}
                />
                   
        </div>

        <div className='w-full space-y-3'>
            <div className="space-y-2">
                <label htmlFor="name" className="text-white text-xl">نام کاربری</label>
                <Controller
                    render={({ field }) => (
                    <Input
                        {...field}
                        disabled={isLoading}
                        className="bg-[#1f1f22] text-white rounded-md p-2 font-vazir"
                        id="name"
                    />
                    )}
                    control={control}
                    name="name"
                    rules={{required: true, minLength: 2}}
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="text-white text-xl">ایمیل</label>
                <Controller
                    render={({ field }) => (
                    <Input
                        {...field}
                        disabled={isLoading}
                        className="bg-[#1f1f22] text-white rounded-md p-2 font-vazir"
                        id="email"
                    />
                    )}
                    control={control}
                    name="email"
                    rules={{required: true, minLength: 2}}
                />
            </div>

        </div>
        <Button
            purple
            type="submit"
            className="mb-20"
            >
                ویرایش
        </Button>
    </form>
  )
}

export default UpdateUserForm
