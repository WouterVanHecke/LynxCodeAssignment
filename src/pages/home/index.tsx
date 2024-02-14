"use client";

import ParkingStructureItem from "@/components/ParkingStructureItem";
import SortingComponent from "@/components/Sorting";
import { ParkingStructure, Sorting, SortingDirection } from "@/types";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const Home = () => {
  const [parkingStructures, setParkingStructures] = useState<ParkingStructure[]>([]);

  const [sorting, setSorting] = useState<Sorting>(Sorting.AvailableSpaces);
  const [sortingDirection, setSortingDirection] = useState<SortingDirection>(
    SortingDirection.Descending
  );

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

  const handleSortingPress = useCallback(
    (pressedSorting: Sorting) => {
      if (sorting === pressedSorting) {
        setSortingDirection((prev) =>
          prev === SortingDirection.Ascending
            ? SortingDirection.Descending
            : SortingDirection.Ascending
        );
        return;
      }

      setSorting((prev) => (prev === Sorting.Name ? Sorting.AvailableSpaces : Sorting.Name));
    },
    [sorting]
  );

  const formattedParkingStructures = useMemo(() => {
    if (sorting === Sorting.AvailableSpaces) {
      if (sortingDirection === SortingDirection.Descending) {
        return parkingStructures.sort((a, b) => b.availableSpaces - a.availableSpaces);
      }

      return parkingStructures.sort((a, b) => a.availableSpaces - b.availableSpaces);
    }

    if (sortingDirection === SortingDirection.Descending) {
      return parkingStructures.sort((a, b) => b.name.localeCompare(a.name));
    }

    return parkingStructures.sort((a, b) => a.name.localeCompare(b.name));
  }, [parkingStructures, sorting, sortingDirection]);

  return (
    <div className="w-screen h-screen bg-black p-12 overflow-y-scroll">
      <p className="text-3xl text-white font-bold pb-12">Parking Structures</p>

      <SortingComponent
        sorting={sorting}
        sortingDirection={sortingDirection}
        handleSortingPress={handleSortingPress}
      />

      <div className="flex items-center">
        <div className="flex flex-wrap">
          {formattedParkingStructures.map((parking) => (
            <ParkingStructureItem key={parking.name} item={parking} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
