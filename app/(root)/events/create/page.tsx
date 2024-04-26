import EventForm from "@/app/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";

const CreateEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims.userId as string;
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover py-5 bg-center md:py-3">
        <h3 className="decoration-neutral-400 underline decoration-1 underline-offset-8 wrapper h3-bold text-center">
          Create Event
        </h3>
      </section>
      <div className="wrapper my-1">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
