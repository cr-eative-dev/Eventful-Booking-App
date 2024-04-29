import EventForm from "@/app/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";
import * as z from "zod";

const UpdateEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover py-10 bg-center md:py-5">
        <h3 className="wrapper h3-bold text-left sm:text-center">
          Update Event!
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm userId={userId} type="Update" />
      </div>
    </>
  );
};

export default UpdateEvent;
