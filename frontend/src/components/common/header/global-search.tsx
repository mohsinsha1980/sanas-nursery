"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getGlobalSearchOpt } from "@/lib/api-routes/api-public";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface SearchOptionType {
  label: string;
  url: string;
}

const GlobalSearch = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [options, setOptions] = useState<SearchOptionType[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const getGlobalSearchOptions = async () => {
      try {
        dispatch(showLoader());
        const response = await getGlobalSearchOpt(controller);
        const data: SearchOptionType[] = response.data.data;
        setOptions(data);
        dispatch(hideLoader());
      } catch (e: unknown) {
        dispatch(hideLoader());
        console.log("GlobalSearch Error : ", e);
      }
    };

    getGlobalSearchOptions();

    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [dispatch]);

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className={className ? `${className}` : ""}>
          <Button
            variant="outline"
            role="combobox"
            className={`justify-start gap-3 px-3 font-normal border-none p-1 shadow-none bg-transparent`}
          >
            <SearchIcon strokeWidth={2} className="size-6"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={-30} className="w-[350px] p-0 sm:w-[340px] xs:!w-[280px] mr-[330px] lg:mr-[130px] sm:!mr-4 sm:mt-[50px] shadow-none border-black/10">
          <Command>
            <CommandInput placeholder="Search Products"/>
            <CommandList>
              <CommandEmpty>No option found</CommandEmpty>
              <CommandGroup>
                {options.map((option, index) => (
                    <CommandItem
                      key={index}
                      value={option.label}
                      onSelect={() => {
                        setOpen(false);
                      }}
                    >
                      <Link href={option.url} key={`${option.url}-${index}`} className="w-full"> {option.label}</Link>
                     
                    </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default GlobalSearch;
