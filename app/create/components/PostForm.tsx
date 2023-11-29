"use client"

import Button from "@/app/components/Button";
import CountrySelect from "@/app/components/CountrySelect";
import ImageUpload from "@/app/components/ImageUpload";
import useCountries from "@/app/hooks/useCountries";
import { Input } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler, Controller } from "react-hook-form";
import toast from "react-hot-toast";


const PostForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control
  } = useForm<FieldValues>({
    defaultValues: {
      caption: "",
      photos: [],
      location: "",
      tags: ""
    }
  })

  const [isLoading, setIsLoading] = useState(false);
  const { getAll } = useCountries();
  const router = useRouter();
  
  const photos = watch("photos");
  
  const filteredImage = (url: string) => {
    const filtered = photos.filter((image: string) => image != url);
    return filtered;
  };
  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      await axios.post("/api/post", data)
      router.refresh();
      router.push("/");
      toast.success("پست با موفقیت ایجاد شد")
      
    } catch (error) {
      toast.error("مشکلی پیش آمده")
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 lg:p-8 h-[100vh]">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="caption" className="text-white text-xl">توضیحات</label>
          <Controller
            render={({ field }) => (
              <Input.TextArea
                {...field}
                disabled={isLoading}
                className="bg-[#1f1f22] text-white rounded-md p-2 font-vazir "
                id="caption"
              />
            )}
            name="caption"
            control={control}
            rules={{ required: true }}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="photos" className="text-white text-xl">عکس ها</label>
            <ImageUpload
              value={photos ? photos.map((item: string) => item) : []}
              onChange={(url) => setValue("photos", [...photos, url])}
              onRemove={(url) => setValue("photos", filteredImage(url))}
              disabled={isLoading}
            />
        </div>
        <div className="space-y-2 flex flex-col max-w-lg">
          <label htmlFor="location" className="text-white text-xl">موقعیت جغرافیایی</label>
          <CountrySelect
            value={getAll()}
            onChange={(value) => setValue("location", value)}
            isLoading={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="tags" className="text-white text-xl">تگ ها</label>
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                disabled={isLoading}
                className="bg-[#1f1f22] text-white rounded-md p-2 font-vazir"
                id="tags"
              />
            )}
            control={control}
            name="tags"
          />
        </div>
        <Button
          purple
          type="submit"
        >
          ایجاد پست
        </Button>
      </div>
    </form>
  )
}

export default PostForm;