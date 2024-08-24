import Navbar from './shared/Navbar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar,AvatarImage } from './ui/avatar'

export default function JobDescription() {
  const applied=false
  return (
    <div >
      <Navbar/>
      
      <div className='max-w-7xl mx-auto my-10 border-2 border-gray-100 rounded-2xl p-10'>
        <div className=' flex  gap-5 '>
      <Button variant='ghost' className='p-1' size='xl'>
          <Avatar >
            <AvatarImage src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' >

            </AvatarImage>
          </Avatar>
        </Button>
        <div className='mx-4'>
        <h1 className='text-4xl font-semibold my-4 '>Job Title</h1>
        <h1 className='text-xl underline my-1'>Company Name</h1>
        <h1 className='text-lg mb-2'>Location</h1>
      <div className='flex gap-2'>
      <Badge variant="ghost" className='text-blue-700 font-bold'>12 Positions</Badge>
      <Badge variant="ghost" className='text-purple-700 font-bold'>part-time</Badge>
      <Badge variant="ghost" className='text-red-400 font-bold'>3.6 lpa</Badge>
      </div>

      </div>
      <div className='flex  items-center ml-auto'>
     {applied?   <Button className='bg-purple-600 hover:bg-purple-800'>Apply Now</Button>:<Button variant='outline' disabled={true} className='cursor-not-allowed'>Already applied</Button>}
      </div>
      </div>
      <hr className='mt-8'/>
      <div >
        <h1>Job details:</h1>
        <h1 className='font-bold my-1 text-pretty'>Role : <span className='pl-4 font-medium text-gray-700'>Frontend developer</span></h1>
        <h1 className='font-bold my-1 text-pretty'>Location : <span className='pl-4 font-medium text-gray-700'>Delhi, India</span></h1>
        <h1 className='font-bold my-1 text-pretty'>Experience : <span className='pl-4 font-medium text-gray-700'>3-5 Years</span></h1>
        <h1 className='font-bold my-1 text-pretty'>Salary: <span className='pl-4 font-medium text-gray-700'>INR 350000 -560000 ₹ </span></h1>
        <h1 className='font-bold my-1 text-pretty'>Total Applicants : <span className='pl-4 font-medium text-gray-700'>1000+</span></h1>
        <h1 className='font-bold my-1 text-pretty'>Posted On: <span className='pl-4 font-medium text-gray-700'>12 Aug 2024</span></h1>
      </div>
      <hr className='mt-8'/>
      <p className='text-justify'>
<span className='font-bold'>      About Us:</span><br />
[Company Name] is a leading technology company specializing in innovative solutions for the [industry] sector. Our team is passionate about building products that make a difference and we are looking for a talented Frontend Developer to join our growing team. If you are enthusiastic about web development, design, and user experience, we would love to hear from you!
<br />
<span className='font-bold'>Job Description:</span><br />

As a Frontend Developer at [Company Name], you will be responsible for developing and maintaining user-facing features for our web applications. You will work closely with our design and backend teams to implement high-quality, responsive UI/UX designs that provide a seamless user experience.
<br />
<span className='font-bold'>Key Responsibilities:</span><br />

Develop and maintain responsive and interactive web applications using HTML, CSS, and JavaScript.
Collaborate with UI/UX designers to translate design mockups into fully functional features.
Ensure the technical feasibility of UI/UX designs and optimize applications for maximum speed and scalability.
Build reusable code and components for future use.
Collaborate with backend developers to integrate APIs and ensure seamless data flow between front-end and back-end systems.
Perform code reviews and provide constructive feedback to peers.
Stay up-to-date with emerging technologies and industry trends and share your knowledge with the team.
Debug and resolve issues to improve performance and usability.
Requirements:
Proven experience as a Frontend Developer or similar role.
Proficiency in HTML, CSS, JavaScript, and modern JavaScript frameworks (such as React, Angular, or Vue.js).
Strong understanding of responsive web design and mobile-first development.
Experience with version control systems (e.g., Git).
Knowledge of web development tools and debugging techniques (e.g., Chrome Developer Tools).
Familiarity with RESTful APIs and asynchronous request handling.
Excellent problem-solving skills and attention to detail.
Strong communication skills and ability to work effectively in a collaborative environment.
A portfolio showcasing your work and projects.
Preferred Qualifications:
Experience with CSS preprocessors like SASS or LESS.
Knowledge of frontend build tools (e.g., Webpack, Babel).
Familiarity with TypeScript and modern ES6+ features.
Experience with testing frameworks (e.g., Jest, Mocha).
Understanding of SEO principles and ensuring that web 


      </p>
      </div>
      </div>
  )
}
