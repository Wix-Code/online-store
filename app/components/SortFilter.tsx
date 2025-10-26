"use client";

import { sort } from "@/app/dummyData";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";

interface SortFilterProps {
  onSelect?: (id: string) => void;
  size?: "sm" | "md" | "lg"; // 👈 size control
}

const SortFilter: React.FC<SortFilterProps> = ({ onSelect, size = "md" }) => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>(sort[0]?.id ?? "");

  // Apply size-based styles
  const sizeStyles = {
    sm: {
      height: "36px",
      padding: "0 10px",
      fontSize: "12px",
    },
    md: {
      height: "46px",
      padding: "0 12px",
      fontSize: "13px",
    },
    lg: {
      height: "54px",
      padding: "0 14px",
      fontSize: "15px",
    },
  }[size];

  useEffect(() => {
    if (selectedType) onSelect?.(selectedType);
  }, [selectedType, onSelect]);

  const handleSelect = (id: string) => {
    setSelectedType(id);
    setOpen(false);
  };

  const selectedLabel = sort.find((item) => item.id === selectedType)?.name ?? "";

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className="flex cursor-pointer justify-between items-center bg-white border rounded-[4px] text-left border-[#000000]/10 hover:border-[#000000]/30 transition"
          style={{
            height: sizeStyles.height,
            padding: sizeStyles.padding,
            fontSize: sizeStyles.fontSize,
          }}
        >
          <div className="flex gap-[10px] items-center overflow-hidden max-w-[calc(100vw-80px)]">
            <span className="text-[#5F6370] whitespace-nowrap font-[400] tracking-[-0.24px]">
              Sort By:
            </span>
            <span className="text-[#1E1E1E] font-[600] tracking-[-0.24px] overflow-hidden whitespace-nowrap text-ellipsis">
              {selectedLabel}
            </span>
          </div>
          <ChevronDown width={14} height={14} color="#1E1E1E" />
        </button>
      </Popover.Trigger>

      <Popover.Content
        sideOffset={5}
        align="start"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
          width: "var(--radix-popover-trigger-width)",
        }}
        className="bg-white p-0 rounded-md z-[50]"
      >
        <ul className="overflow-y-auto max-h-40 scrollbar-hide">
          {sort.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="px-4 py-[10px] cursor-pointer text-[13px] tracking-[-0.24px] flex items-center gap-2 hover:bg-[#f5f5f5] transition"
            >
              <input
                type="radio"
                checked={item.id === selectedType}
                onChange={() => handleSelect(item.id)}
                className="cursor-pointer accent-black"
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