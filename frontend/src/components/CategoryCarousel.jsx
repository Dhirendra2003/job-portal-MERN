
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const category = [
  "frontend developer",
  "backend developer",
  "data scientist",
  "graphic designer",
  "fullstack developer",
  "cloud engineer",
  "DevOps engineer",
  "machine learning",
  "product manager",
  "UI/UX designer",
  "cybersecurity specialist",
  "mobile app developer",
  "blockchain developer",
  "AI research scientist",
  "data analyst",
  "business intelligence",
  "digital marketing",
  "content strategist",
  "SEO specialist",
  "network engineer"
];

export default function CategoryCarousel() {
  return (
    <div>
      <Carousel className='w-full max-w-xl mx-auto my-20'>
        <CarouselContent >
          {category.map((cat, index) => {
            return (
            <CarouselItem key={index} className='md:basis-1/3 lg:basis-1/3  '>
              <motion.div initial={{opacity:0,x:100}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-100}} transition={{duration:.5}}>
              <Link to={`/browse?searchstring=${cat}`}>
              <Button variant='outline' className='rounded-full dark:bg-neutral-700'>{cat}</Button>
              </Link>
              </motion.div>
            </CarouselItem>)
          })}

        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}
