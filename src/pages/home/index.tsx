"use client";

import ParkingStructureItem from "@/components/ParkingStructureItem";
import Profile from "@/components/Profile";
import SortingComponent from "@/components/Sorting";
import { ParkingStructure, Sorting, SortingDirection } from "@/types";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  setHasAccount: Dispatch<SetStateAction<boolean | undefined>>;
}
const Home = (props: Props) => {
  const { setHasAccount } = props;

  const [parkingStructures, setParkingStructures] = useState<ParkingStructure[]>([]);

  const [sorting, setSorting] = useState<Sorting>(Sorting.AvailableSpaces);
  const [sortingDirection, setSortingDirection] = useState<SortingDirection>(
    SortingDirection.Descending
  );
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const formattedParkingStructures = useMemo(() => {
    const filteredParkingStructures =
      searchQuery.length === 0
        ? parkingStructures
        : parkingStructures.filter((parking) =>
            parking.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

    if (sorting === Sorting.AvailableSpaces) {
      if (sortingDirection === SortingDirection.Descending) {
        return filteredParkingStructures.sort((a, b) => b.availableSpaces - a.availableSpaces);
      }

      return filteredParkingStructures.sort((a, b) => a.availableSpaces - b.availableSpaces);
    }

    if (sortingDirection === SortingDirection.Descending) {
      return filteredParkingStructures.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
    }

    return filteredParkingStructures.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }, [parkingStructures, searchQuery, sorting, sortingDirection]);

  return (
    <div className="w-screen h-screen bg-black p-12 overflow-y-scroll">
      <div className="flex justify-between">
        <p className="text-3xl text-white font-bold pb-12">Parking Structures</p>
        <Profile setHasAccount={setHasAccount} />
      </div>

      <SortingComponent
        sorting={sorting}
        sortingDirection={sortingDirection}
        handleSortingPress={handleSortingPress}
      />

      <input
        type="text"
        name={"search"}
        value={searchQuery}
        onChange={handleSearchChange}
        className="pl-2 rounded-lg bg-gray-700 p-1 my-2 text-white"
        placeholder="Search..."
      />

      <div className="flex items-center">
        <div className="flex flex-wrap w-full">
          {formattedParkingStructures.map((parking) => (
            <ParkingStructureItem key={parking.name} item={parking} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
