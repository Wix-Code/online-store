"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import { locations } from "@/app/dummyData";

const LocationFilter = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const filteredLocations = locations.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSelected = (id: string) => selectedLocations.includes(id);

  const toggleSelection = (id: string) => {
    setSelectedLocations((prev) =>
      isSelected(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedLocations.length === locations.length) {
      setSelectedLocations([]);
    } else {
      setSelectedLocations(locations.map((item) => item.id));
    }
  };

  const handleDone = () => setOpen(false);

  const selectedLabels = locations
    .filter((item) => selectedLocations.includes(item.id))
    .map((item) => item.name)
    .join(", ");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex cursor-pointer justify-between items-center bg-white border rounded-[4px] px-[12px] h-[46px] text-left border-[#000000] md:w-[250px] w-full">
          <div className="flex gap-[8px] items-center overflow-hidden max-w-[calc(100vw-80px)]">
            <span className="text-[#5F6370] whitespace-nowrap text-[12px] font-[400]">
              {selectedLocations.length > 0
                ? "Location(s):"
                : "Select Location(s)"}
            </span>
            <span className="text-[#1E1E1E] text-[12px] font-[600] overflow-hidden whitespace-nowrap text-ellipsis">
              {selectedLabels || ""}
            </span>
          </div>
          <ChevronDown width={12} height={12} color="#1E1E1E" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="md:w-[250px] w-full bg-white border border-[#E6E6E6] rounded-[4px] shadow-md p-0">
        <div className="p-2">
          <input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border outline-none border-[#E6E6E6] rounded-[4px] p-2 text-[12px] mb-2"
          />
        </div>

        <ul className="overflow-y-auto max-h-48 scrollbar-hide">
          <li
            className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50"
            onClick={toggleAll}
          >
            <input
              type="checkbox"
              checked={selectedLocations.length === locations.length}
              readOnly
            />
            <span className="text-[12px] text-[#1E1E1E] font-[500]">
              All Locations
            </span>
          </li>

          {filteredLocations.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSelection(item.id)}
            >
              <input type="checkbox" checked={isSelected(item.id)} readOnly />
              <span className="text-[12px] text-[#1E1E1E]">{item.name}</span>
            </li>
          ))}

          {filteredLocations.length === 0 && (
            <li className="px-4 py-2 text-gray-400 text-[12px]">
              No locations found
            </li>
          )}
        </ul>

        <div className="px-[16px] py-[8px] border-t border-[#E6E6E6] flex justify-end">
          <button
            className="px-[12px] py-[6px] bg-[#2B50D6] rounded-[4px] text-white text-[10px] font-[600]"
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationFilter;