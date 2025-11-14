import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ChevronDown, Loader2 } from 'lucide-react'
import React from 'react'
import { useGetCategories } from './api/categories'

interface CategoryModalProps {
  value: string;
  onChange: (categoryId: string, categoryName: string) => void;
  disabled?: boolean;
}

const CategoryModal = ({ value, onChange, disabled }: CategoryModalProps) => {
  const { data, isLoading } = useGetCategories()
  
  const categories = data?.data?.categories || []
  const selectedCategory = categories.find((cat: any) => cat.id === value)

  return (
    <Popover>
      <PopoverTrigger className='border-gray-300 h-12' asChild>
        <Button
          variant="outline"
          disabled={disabled || isLoading}
          className="w-full justify-between cursor-pointer text-left font-normal"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Loading...
            </span>
          ) : selectedCategory ? (
            selectedCategory.name
          ) : (
            <span className="text-gray-500">Select category</span>
          )}
          <ChevronDown size={16} className="ml-2 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[415px] border-gray-300 bg-white p-0" align="start">
        <div className="max-h-[300px] overflow-y-auto">
          {categories.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">
              No categories available
            </div>
          ) : (
            <div className="py-1">
              {categories.map((category: any) => (
                <button
                  key={category.id}
                  onClick={() => onChange(category.id, category.name)}
                  className={`w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-100 transition ${
                    value === category.id ? 'bg-green-50 text-green-700' : ''
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default CategoryModal