import EventForm from "@/app/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";

const CreateEvent = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims!.userId as string;
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover py-5 bg-center md:py-3">
        <h3 className="wrapper h3-bold text-center">
          <span className="highlightBrush_1 dark:text-black">Create Event</span>
        </h3>
      </section>
      <div className="wrapper my-1">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
