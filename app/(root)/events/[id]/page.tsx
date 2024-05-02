import CheckoutButton from "@/app/components/shared/CheckoutButton";
import Collection from "@/app/components/shared/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import {
  CircleDollarSign,
  CalendarCheck2,
  CalendarX2,
  MapPin,
} from "lucide-react";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h3-bold text-left">{event.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3 items-center">
                  <p className="p-bold-20 rounded-full px-5 py-2 text-black bg-neongreen">
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </p>
                  <p className="border-2 p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                </div>
              </div>
            </div>

            <CheckoutButton event={event} />

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center gap-3">
                  <div className="flex gap-3">
                    <CalendarCheck2 />
                    <p>
                      {formatDateTime(event.startDateTime).dateOnly} -{" "}
                      {formatDateTime(event.startDateTime).timeOnly}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <CalendarX2 />
                    <p>
                      {formatDateTime(event.endDateTime).dateOnly} -{" "}
                      {formatDateTime(event.endDateTime).timeOnly}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <MapPin />
                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">
                Information about the event:
              </p>
              <p className="p-regular-16 lg:p-regular-18">
                {event.description}
              </p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline cursor-pointer">
                {event.url}
              </p>
            </div>

            <p className="text-left mt-2 sm:mt-0">
              Event organized by{" "}
              <span className="text-primary-500 font-bold">
                {event.organizer.firstName} {event.organizer.lastName}
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h3-bold">Related Events</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetails;
