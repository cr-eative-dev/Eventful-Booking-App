import { IEvent } from "@/lib/database/mongoDB/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Pencil } from "lucide-react";
import { CornerDownRight, FilePenLine, ArrowUpRight } from "lucide-react";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white dark:bg-black shadow-md transition-all hover:shadow-lg hover:border-neongreen md:min-h-[438px] dark:border-2">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white bg-opacity-75 p-3 shadow-sm transition-all dark:bg-black dark:bg-opacity-75">
          <Link href={`/events/${event._id}/update`}>
            <FilePenLine className="transition duration-50 hover:scale-110" />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2 items-center">
            <span className="p-semibold-14 w-min rounded-full bg-neongreen dark:text-black px-4 py-1 text-green-60">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            <p className="p-semibold-14 rounded-full border-2 bg-grey-500/10 px-4 py-1 text-grey-500 ">
              {event.category.name}
            </p>
          </div>
        )}

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <Link href={`/events/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black dark:text-white">
            {event.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <ArrowUpRight />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
