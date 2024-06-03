// pages/privacy.tsx
import React from "react";
import Head from "next/head";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-700 w-[80%] rounded p-8 container flex flex-col gap-4 mt-8 mx-auto">
      <Head>
        <title>Privacy Policy - Econobloom</title>
      </Head>
      <h1 className="text-2xl font-bold my-2 w-full text-center">
        Privacy Policy
      </h1>
      <p>
        This Privacy Policy describes how your personal information is
        collected, used, and shared when you visit or make a purchase from
        Econobloom (the “Site”).
      </p>

      <h2 className="font-bold ">Personal Information We Collect</h2>
      <p>
        When you visit the Site, we automatically collect certain information
        about your device, including information about your web browser, IP
        address, time zone, and some of the cookies that are installed on your
        device. Additionally, as you browse the Site, we collect information
        about the individual web pages or products that you view, what websites
        or search terms referred you to the Site, and information about how you
        interact with the Site.
      </p>

      <h2 className="font-bold ">How We Use Your Information</h2>
      <p>
        We use the information that we collect generally to provide the services
        offered on the Site (including processing any transactions, maintaining
        your account, and providing you with customer service). Additionally, we
        use this information to:
      </p>
      <ul>
        <li>Communicate with you;</li>
        <li>Screen for potential risk or fraud; and</li>
        <li>
          When in line with the preferences you have shared with us, provide you
          with information or advertising relating to our products or services.
        </li>
      </ul>

      <h2 className="font-bold ">Sharing Your Personal Information</h2>
      <p>
        We share your Personal Information with third parties to help us use
        your Personal Information, as described above. For example, we use
        external APIs to enhance our services—such external services may access
        some of your data as part of their integration.
      </p>

      <Link href="/" className="text-blue-500">
        Back to home
      </Link>
    </div>
  );
};

export default PrivacyPolicy;
