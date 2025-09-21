import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-6 px-10">
      <div className="container mx-auto pb-5 flex flex-col md:flex-row items-center justify-between">
        
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <Image src="/assets/Vector.png" alt="Logo" width={50} height={40} />
        </div>

        <div className="text-center mb-4 ms-40 md:mb-0">
          <div className="flex items-center justify-center space-x-6 mb-2">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()}  Nike Air. All rights reserved.</p>
        </div>

        <div className="text-sm">
        Made with ♥ for sneaker enthusiasts
        </div>
      </div>
    </footer>
  );
}
