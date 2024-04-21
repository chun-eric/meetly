import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10'>
        <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0'>
          <div className='flex flex-col justify-center gap-8'>
            <h1>Meet, Connect, Thrive: Your Meetups, Our Platform!</h1>
            <p>
              Meet and Learn from 5,000+ expert mentors at top global companies
              in our dynamic community.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
