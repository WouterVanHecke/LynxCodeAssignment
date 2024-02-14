"use client";

import ParkingStructureItem from "@/components/ParkingStructureItem";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [parkingStructures, setParkingStructures] = useState<ParkingStructure[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataResponse = await fetch(
        "https://gent.opendatasoft.com/api/records/1.0/search/?dataset=bezetting-parkeergarages-real-time&rows=20"
      );
      const data = await dataResponse.json();

      const parkingStructures: ParkingStructure[] = data.records.map((parking: any) => ({
        name: parking.fields.name,
        description: parking.fields.description,
        isOpen: parking.fields.isopennow === 1,
        availableSpaces: parking.fields.availablecapacity,
        address: null, // Cannot find this in the response?
        openingHours: parking.fields.openingtimesdescription,
        websiteUrl: parking.fields.urllinkaddress,
        operator: parking.fields.operatorinformation,
        category: parking.fields.categorie,
        type: parking.fields.type,
      }));

      setParkingStructures(parkingStructures);
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen h-screen bg-black p-12 overflow-y-scroll">
      <p className="text-3xl text-white font-bold pb-12">Parking Structures</p>
      <div className="flex items-center">
        <div className="flex flex-wrap">
          {parkingStructures.map((parking) => (
            <ParkingStructureItem key={parking.name} item={parking} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
