import React, { useMemo } from "react";
import { FaParking } from "react-icons/fa";

interface Props {
  item: ParkingStructure;
}

const ParkingStructureItem = (props: Props) => {
  const { item } = props;

  const iconColor = useMemo(() => (item.isOpen ? "green" : "red"), [item.isOpen]);

  return (
    <div className="p-6 border-b border-slate-700 w-2/5 mr-16">
      <div className="flex items-center">
        <FaParking color={iconColor} size={80} />
        <div>
          <p className="text-white text-xl font-bold ml-4">{item.name}</p>
          <p className="text-white text-md ml-4">Available spaces: {item.availableSpaces}</p>
        </div>
      </div>
    </div>
  );
};

export default ParkingStructureItem;
