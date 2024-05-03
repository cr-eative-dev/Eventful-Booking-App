import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Search from "../components/shared/Search";
import CategoryFilter from "../components/shared/CategoryFilter";
import Collection from "../components/shared/Collection";
import { SearchParamProps } from "@/types";
import { getAllEvents } from "@/lib/actions/event.actions";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              One platform,{" "}
              <span className="highlightBrush_1 dark:text-black leading-relaxed">
                unforgettable
              </span>
              <span className="font-tanmeringue"> Experiences.</span>
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book your next event, meet your friends, and share your
              experiences with the world.
            </p>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="button w-full hover:bg-neongreen hover:text-black sm:w-fit"
            >
              <Link href="#events">Take me to the events</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]  dark:hidden"
          />
          <Image
            src="/assets/images/hero-dark.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain hidden object-center 2xl:max-h-[50vh] dark:block"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          <span className="font-tanmeringue">Explore</span> hundreds
          <br /> of <span>events</span>
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
