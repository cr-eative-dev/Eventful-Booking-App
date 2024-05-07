"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { eventDefaultValues } from "@/constants";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import { MapPin } from "lucide-react";
// import { DatePicker } from "./DatePicker";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "lucide-react";
import { CircleDollarSign, CalendarCheck2, CalendarX2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/lib/uploadthing";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/mongoDB/models/event.model";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [startDate, setStartDate] = useState(new Date());

  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
          categoryId: event.category._id,
        }
      : eventDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/dashboard",
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="flex flex-col gap-5 w-full">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Event title"
                          {...field}
                          className="input-field"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Dropdown
                          onChangeHandler={field.onChange}
                          value={field.value}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex h-full w-full">
                      <FormControl>
                        <Textarea
                          placeholder="Event description"
                          {...field}
                          className="textarea"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <FileUploader
                        onFieldChange={field.onChange}
                        imageUrl={field.value}
                        setFiles={setFiles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex-center h-[54px] w-full overflow-hidden  gap-2">
                        <MapPin />

                        <Input
                          placeholder="Event location or Online"
                          {...field}
                          className="input-field"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className=" w-full flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="flex items-center">
                      <div className=" h-[54px]">
                        <CalendarCheck2 className="mr-2" />
                        <DatePicker
                          selected={field.value}
                          span={"Pick a start date"}
                          onChange={(date: Date) => field.onChange(date)}
                          showTimeSelect
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy hh:mm aa"
                          // wrapperClassName="datePicker"
                          className="dark:bg-[#09090b] border h-[42px] p-3 rounded-md"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="flex items-center">
                      <div className="h-[54px]">
                        <CalendarX2 className="mr-2" />
                        <DatePicker
                          span="Pick an end date"
                          selected={field.value}
                          onChange={(date: Date) => field.onChange(date)}
                          showTimeSelect
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy hh:mm aa"
                          // wrapperClassName="datePicker"
                          className="dark:bg-[#09090b] border h-[42px] p-3 rounded-md"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex-center h-[54px] w-full overflow-hidden  gap-2">
                        <CircleDollarSign className="flex-none" />
                        <Input
                          className="grow"
                          type="number"
                          placeholder="Price in USD"
                          {...field}
                        />
                        <FormField
                          control={form.control}
                          name="isFree"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center">
                                  <label
                                    htmlFor="isFree"
                                    className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    Free Ticket
                                  </label>
                                  <Checkbox
                                    onCheckedChange={field.onChange}
                                    checked={field.value}
                                    id="isFree"
                                    className="mr-2 h-5 w-5 border"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex-center h-[54px] w-full overflow-hidden  gap-2">
                        <Link />

                        <Input
                          placeholder="URL"
                          {...field}
                          className="input-field"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
              className="w-full bg-neongreen hover:bg-lime-400 text-black"
            >
              {form.formState.isSubmitting ? "Submitting..." : `${type} Event `}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EventForm;
