import { Sorting, SortingDirection } from "@/types";
import React from "react";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

interface Props {
  sorting: Sorting;
  sortingDirection: SortingDirection;
  handleSortingPress: (pressedSorting: Sorting) => void;
}

const SortingComponent = (props: Props) => {
  const { sorting, sortingDirection, handleSortingPress } = props;

  return (
    <div className="flex pb-2">
      <div
        className={`flex bg-gray-800 w-fit p-1 px-4 rounded-xl ml-4 cursor-pointer ${
          sorting === Sorting.Name ? "bg-white" : "bg-gray-800"
        }`}
        onClick={() => handleSortingPress(Sorting.Name)}
      >
        {sorting === Sorting.Name &&
          (sortingDirection === SortingDirection.Descending ? (
            <HiTrendingDown
              color={sorting === Sorting.Name ? "black" : "white"}
              size={24}
              className={"sortingDirectionIcon"}
            />
          ) : (
            <HiTrendingUp
              color={sorting === Sorting.Name ? "black" : "white"}
              size={24}
              className={"sortingDirectionIcon"}
            />
          ))}
        <span
          className={`${sorting === Sorting.Name ? "text-black" : "text-white"} font-bold pl-2`}
        >
          Name
        </span>
      </div>
      <div
        className={`flex bg-gray-800 w-fit p-1 px-4 rounded-xl ml-4 cursor-pointer ${
          sorting === Sorting.AvailableSpaces ? "bg-white" : "bg-gray-800"
        }`}
        onClick={() => handleSortingPress(Sorting.AvailableSpaces)}
      >
        {sorting === Sorting.AvailableSpaces &&
          (sortingDirection === SortingDirection.Descending ? (
            <HiTrendingDown
              color={sorting === Sorting.AvailableSpaces ? "black" : "white"}
              size={24}
              className={"sortingDirectionIcon"}
            />
          ) : (
            <HiTrendingUp
              color={sorting === Sorting.AvailableSpaces ? "black" : "white"}
              size={24}
              className={"sortingDirectionIcon"}
            />
          ))}
        <span
          className={`${
            sorting === Sorting.AvailableSpaces ? "text-black" : "text-white"
          } font-bold pl-2`}
        >
          Available spaces
        </span>
      </div>
    </div>
  );
};

export default SortingComponent;
