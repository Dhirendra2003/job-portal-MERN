import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black text-white py-8 dark:bg-neutral-900">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className='gap-4 flex-col flex'>
          <div className="flex items-center gap-2 ">
            <div className="flex items-center justify-center w-[40px] h-[40px]">
              <img src="/hire_loop.png" alt="" className="object-contain" />
            </div>
            <h1 className="text-lg font-bold ">
              Hire<span className="text-[#2C89FD]">Loop</span>
            </h1>
          </div>
          <p className="w-[70%] ">Your gateway to finding the perfect job.</p>
        </div>
        <div className='gap-4 flex-col flex'>
          <h4 className="text-lg font-bold mb-4">Useful Links</h4>
          <ul>
            <li><a href="#about" className="hover:underline">About Us</a></li>
            <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
        <div className='gap-4 flex-col flex'>
          <h4 className="text-lg font-bold mb-4">Follow Us</h4>
          <ul className="flex gap-2">
            <li><a href="https://facebook.com" className="hover:underline"><Facebook/></a></li>
            <li><a href="https://twitter.com" className="hover:underline"><Twitter/></a></li>
            <li><a href="https://linkedin.com" className="hover:underline"><Linkedin/></a></li>
            <li><a href="https://instagram.com" className="hover:underline"><Instagram/></a></li>
          </ul>
        </div>
        <div className='gap-4 flex-col flex'>
          <h4 className="text-lg font-bold mb-4">Contact Information</h4>
          <a href="mailto:info@hireloop.com">Email: info@hireloop.com</a>
          <a href="tel:+1234567890">Phone: +123 456 7890</a>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>© {new Date().getFullYear()} WorkNest. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
