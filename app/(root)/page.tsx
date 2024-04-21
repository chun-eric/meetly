import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10'>
        <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0'>
          <div className='flex flex-col justify-center gap-8'>
            <h1 className='h1-bold'>Meet, Connect and Thrive with Meetly!</h1>
            <p className='p-regular-20 md:p-regular-24'>
              Meet and Learn from 5,000+ expert mentors at top global companies
              in our dynamic community.
            </p>
            <Button asChild size='lg' className='button w-full sm:w-fit'>
              <Link href='#events'> Explore Now</Link>
            </Button>
          </div>

          <Image
            src='/assets/images/hero.png'
            alt='Hero Image'
            width={1000}
            height={1000}
            className='object-contain object-center 2x1:max-h-[50vh] max-h-[70vh]'
          />
        </div>
      </section>

      <section
        id='events'
        className='wrapper my-8 flex flex-col gap-8 md:gap-12'
      >
        <h2 className='h2-bold'>
          Trusted by <br /> Thousands of Meetups
        </h2>
        <div className='flex w-full flex-col gap-5 md:flex-row'>
          Search and Category Filter
        </div>
      </section>
    </>
  );
}
