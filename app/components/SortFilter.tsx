"use client";

import { sort } from "@/app/dummyData";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SortFilterProps {
  onSelect?: (id: string) => void; // callback when option selected
}

const SortFilter: React.FC<SortFilterProps> = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>(sort[0]?.id ?? ""); // first selected by default

  // Call onSelect whenever value changes
  useEffect(() => {
    if (selectedType) {
      onSelect?.(selectedType);
    }
  }, [selectedType, onSelect]);

  const handleSelect = (id: string) => {
    setSelectedType(id);
    setOpen(false); // close immediately
  };

  const selectedLabel = sort.find((item) => item.id === selectedType)?.name ?? "";

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="flex cursor-pointer justify-between items-center bg-white border rounded-[4px] px-[12px] h-[46px] text-left border-[#00000]">
          <div className="flex gap-[14px] items-center overflow-hidden max-w-[calc(100vw-80px)]">
            <span className="text-[#5F6370] whitespace-nowrap text-[12px] font-[400] tracking-[-0.24px]">
              Sort By:
            </span>
            <span className="text-[#1E1E1E] text-[12px] font-[600] tracking-[-0.24px] overflow-hidden whitespace-nowrap text-ellipsis">
              {selectedLabel}
            </span>
          </div>
          <ChevronDown width={12} height={12} color="#1E1E1E" />
        </button>
      </Popover.Trigger>

      <Popover.Content
        sideOffset={5}
        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}
        className="w-[var(--radix-popover-trigger-width)] bg-white p-0 rounded-md"
      >
        <ul className="overflow-y-auto max-h-40 scrollbar-hide">
          {sort.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="px-4 py-[10px] cursor-pointer text-[12px] tracking-[-0.24px] flex items-center gap-2 hover:bg-[#f5f5f5]"
            >
              <input
                type="radio"
                checked={item.id === selectedType}
                onChange={() => handleSelect(item.id)}
                className="cursor-pointer"
              />
              <span className={`${item.id === selectedType ? "font-[600]" : "font-[400]"}`}>
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
};

export default SortFilter;