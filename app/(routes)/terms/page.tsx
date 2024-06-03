// pages/terms.tsx
import React from "react";
import Head from "next/head";
import Link from "next/link";

const TermsOfService = () => {
  return (
    <div className="bg-gray-700 w-[80%] rounded p-8 container flex flex-col gap-4 mt-8 mx-auto">
      <Head>
        <title>Terms of Service - Econobloom</title>
      </Head>
      <h1 className="text-2xl font-bold my-4 w-full text-center">
        Terms of Service
      </h1>
      <p>
        By accessing and using Econobloom, you accept and agree to be bound by
        the terms and provision of this agreement. In addition, when using this
        site’s particular services, you shall be subject to any posted
        guidelines or rules applicable to such services.
      </p>

      <h2 className="font-bold">Intellectual Property</h2>
      <p>
        The content on Econobloom, including without limitation the text,
        software, scripts, graphics, photos, sounds, music, videos, and
        interactive features and the trademarks, service marks and logos
        contained therein are owned by or licensed to Econobloom, subject to
        copyright and other intellectual property rights under international
        conventions.
      </p>

      <h2 className="font-bold">User Conduct</h2>
      <p>
        All interactions on the site must comply with these Terms of Service.
        You agree not to copy, distribute, or modify content from the site
        without our express written consent. You must not transmit any worms or
        viruses or any code of a destructive nature.
      </p>

      <Link href="/" className="text-blue-500">
        Back to home
      </Link>
    </div>
  );
};

export default TermsOfService;
