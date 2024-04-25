import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              One <span className="font-tanmeringue">platform</span> for all
              your best <span className="font-tanmeringue">experiences.</span>
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book your next event, meet your friends, and share your
              experiences with the world.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Take me to the events</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] dark:filter dark:invert dark:brightness-9000 dark:contrast-150 dark:grayscale"
          />
        </div>

        <section
          id="events"
          className="wrapper my-8 flex flex-col gap-8 md:gap-12"
        >
          <h2 className="h2-bold">
            <span className="font-tanmeringue">Explore</span> <br /> hundreds of
            experiences.
          </h2>

          <div className="flex w-full flex-col gap-5 md:flex-row">
            Search Filter Category
          </div>
        </section>
      </section>
    </>
  );
}
