import EventForm from "@/app/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { auth, currentUser } from "@clerk/nextjs/server";

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();

  //TODO sessionClaims ! anders regeln

  const userId = sessionClaims!.userId as string;
  const event = await getEventById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h4-bold text-center sm:text-left">
          <span className="border-2 px-7 py-4 rounded-full border-neongreen">
            Update Event
          </span>
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          type="Update"
          event={event}
          eventId={event._id}
          userId={userId}
        />
      </div>
    </>
  );
};

export default UpdateEvent;
