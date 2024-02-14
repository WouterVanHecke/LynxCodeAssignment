"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { FaArrowLeft, FaParking } from "react-icons/fa";

/** Could have done this better but was running out of time */

const Details = () => {
  const searchParams = useSearchParams();

  const iconColor = useMemo(() => (searchParams.get("isOpen") ? "green" : "red"), [searchParams]);

  return (
    <div className={`w-screen h-screen bg-black p-12`}>
      <Link href={"/"}>
        <FaArrowLeft size={24} color="white" />
      </Link>
      <div className="flex items-center pt-12 ">
        <FaParking color={iconColor} size={80} />
        <div>
          <p className="text-white text-xl font-bold ml-4">{searchParams.get("name")}</p>
          <p className="text-white text-md ml-4">
            Available spaces: {searchParams.get("availableSpaces")}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-gray-400 font-bold text-sm uppercase">Description</p>
        <p className="text-white text-lg">{searchParams.get("description")}</p>
      </div>

      <div className="mt-10">
        <p className="text-gray-400 font-bold text-sm uppercase">Opening hours</p>
        <p className="text-white text-lg">{searchParams.get("openingHours")}</p>
      </div>

      <div className="mt-10">
        <p className="text-gray-400 font-bold text-sm uppercase">Website URL</p>
        <a href={searchParams.get("websiteUrl") || ""}>
          <p className="text-white text-lg">{searchParams.get("websiteUrl")}</p>
        </a>
      </div>

      <div className="mt-10">
        <p className="text-gray-400 font-bold text-sm uppercase">Operator</p>
        <p className="text-white text-lg">{searchParams.get("operator")}</p>
      </div>

      <div className="mt-10">
        <p className="text-gray-400 font-bold text-sm uppercase">Category</p>
        <p className="text-white text-lg">{searchParams.get("category")}</p>
      </div>

      <div className="mt-10">
        <p className="text-gray-400 font-bold text-sm uppercase">Type</p>
        <p className="text-white text-lg">{searchParams.get("type")}</p>
      </div>
    </div>
  );
};

export default Details;
