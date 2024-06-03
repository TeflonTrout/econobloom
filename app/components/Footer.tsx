// Footer.tsx
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full relative bottom-0 py-6 bg-gray-800 text-white mt-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <p>© {new Date().getFullYear()} Econobloom. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-gray-300">
              About Us
            </Link>
            <Link href="/terms" className="hover:text-gray-300">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
