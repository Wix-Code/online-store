"use client"

import { locations } from '@/app/dummyData';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { ChevronDown } from 'lucide-react'

import React from 'react'
import { useEffect, useState } from "react";


const LocationFilter = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredCategories = locations.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSelected = (id: string) => selectedTypes.includes(id);

  const toggleTypeSelection = (id: string) => {
    setSelectedTypes((prev) =>
      isSelected(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAllSelections = () => {
    if (selectedTypes.length === locations.length) {
      setSelectedTypes([]);
    } else {
      setSelectedTypes(locations.map((item) => item.id));
    }
  };

  const executeAndClose = () => {
    //onSave?.(selectedTypes);
    setOpen(false);
  };

  const selectedLabels = locations
    .filter((item) => selectedTypes.includes(item.id))
    .map((item) => item.name)
    .join(", ");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex justify-between items-center w-full md:w-60 bg-white border rounded-[4px] px-[12px] h-[46px] text-left border-[#f5f5f5]">
          <div className="flex gap-[14px] items-center overflow-hidden max-w-[calc(100vw-80px)]">
            <span className="text-[#5F6370] whitespace-nowrap text-[12px] font-[400] tracking-[-0.24px]">
              {selectedTypes.length > 0 ? "Type" : "Select type"}
            </span>
            <span className="text-[#1E1E1E] text-[12px] font-[600] tracking-[-0.24px] overflow-hidden whitespace-nowrap text-ellipsis">
              {selectedLabels}
            </span>
          </div>
          <ChevronDown width={12} height={12} color="#1E1E1E" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[var(--radix-popover-trigger-width)] bg-white p-0">
        <ul className="overflow-y-auto max-h-40 scrollbar-hide">
          <li
            className="flex items-center gap-3 mt-2 px-4 py-2 cursor-pointer"
            onClick={toggleAllSelections}
          >
            <input
              type="checkbox"
              checked={selectedTypes.length === locations.length}
              readOnly
            />
            <span className="text-[#1E1E1E] text-[12px] font-[400] tracking-[-0.24px]">
              All Status
            </span>
          </li>

          {filteredCategories.map((item) => (
            <li
              key={item.id}
              className="flex gap-3 items-center px-4 py-[13px] cursor-pointer"
              onClick={() => toggleTypeSelection(item.id)}
            >
              <input type="checkbox" checked={isSelected(item.id)} readOnly />
              <span className="text-[#1E1E1E] text-[12px] font-[400] tracking-[-0.24px]">
                {item.name}
              </span>
            </li>
          ))}

          {filteredCategories.length === 0 && (
            <li className="px-4 py-2 text-gray-500">
              No adjustment types found
            </li>
          )}
        </ul>

        <div className="px-[16px] py-[8px] border-t-[0.5px] border-[#E6E6E6] flex justify-end">
          <button
            className="px-[12px] py-[6px] bg-[#2B50D6] rounded-[4px] text-white text-[10px] font-[600] tracking-[-0.2px]"
            onClick={executeAndClose}
          >
            Done
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationFilter;