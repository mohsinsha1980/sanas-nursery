"use client";

import {
  getPlantsForGreenChoices,
  updateGreenChoices,
} from "@/lib/api-routes/api-admin";
import { getErrorMessage, getPicURL, showErrorToast } from "@/lib/helper";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { HomeGreenPlantType } from "@/lib/types/common-types";

const GreenChoices = ({ data }: { data: HomeGreenPlantType[] }) => {
  const dispatch = useDispatch();
  const [plants, setPlants] = useState<HomeGreenPlantType[]>([]);
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);
  const [greenChoicesPlants, setGreenChoicesPlants] =
    useState<HomeGreenPlantType[]>(data);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data?.length) {
      setGreenChoicesPlants(data);
      const selected = data?.map((plant) => plant._id);
      setSelectedPlants(selected);
    }
  }, [data]);

  useEffect(() => {
    const controller = new AbortController();
    const getAllPlants = async () => {
      try {
        dispatch(showLoader());
        const response = await getPlantsForGreenChoices(controller);
        const allPlants: HomeGreenPlantType[] = response.data.plants;
        setPlants([...allPlants]);
      } catch (e) {
        showErrorToast(getErrorMessage(e as AxiosError));
      } finally {
        dispatch(hideLoader());
      }
    };

    getAllPlants();

    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [dispatch]);

  const togglePlant = (plantId: string) => {
    setSelectedPlants((prev) =>
      prev.includes(plantId)
        ? prev.filter((id) => id !== plantId)
        : [...prev, plantId]
    );
  };

  const handleSave = async () => {
    const controller = new AbortController();
    try {
      dispatch(showLoader());
      const response = await updateGreenChoices(selectedPlants, controller);
      const greenChoicesPlants: HomeGreenPlantType[] = response.data.data;
      setGreenChoicesPlants(greenChoicesPlants);
      const selected = greenChoicesPlants?.map((plant) => plant._id);
      setSelectedPlants(selected);
      setOpen(false);
    } catch (e) {
      showErrorToast(getErrorMessage(e as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Green Choices</h1>

      <div className="max-w-lg">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-[400px]  justify-between"
            >
              {selectedPlants.length > 0
                ? `${selectedPlants.length} plant(s) selected`
                : "Select plants..."}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Search plants..." />
              <CommandList>
                <CommandEmpty>No plants found.</CommandEmpty>
                <CommandGroup>
                  {plants.map((plant, index) => (
                    <CommandItem
                      key={plant._id + index}
                      value={plant.title}
                      onSelect={() => togglePlant(plant._id)}
                      className="flex items-center gap-3"
                    >
                      {/* Checkbox */}
                      <Checkbox
                        checked={selectedPlants.includes(plant._id)}
                        onCheckedChange={() => togglePlant(plant._id)}
                        onClick={(e) => e.stopPropagation()} // stop bubbling
                      />

                      {/* Plant image */}
                      <div className="relative w-10 h-10 rounded overflow-hidden border">
                        <Image
                          src={
                            getPicURL(plant.pictures[0]) || "/placeholder.png"
                          }
                          alt={plant.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Plant info */}
                      <div className="flex-1">
                        <p className="font-medium">{plant.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {plant.category}
                        </p>
                      </div>
                    </CommandItem>
                  ))}

                  <div className="mt-4 px-4 pb-3">
                    <Button
                      className="w-full"
                      onClick={handleSave}
                      disabled={selectedPlants.length === 0}
                    >
                      Save Green Choices
                    </Button>
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Existing Green Choices</h2>
        {greenChoicesPlants.length === 0 ? (
          <p className="text-muted-foreground">No green choices added yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {greenChoicesPlants.map((plant) => (
              <Card key={plant._id} className="overflow-hidden">
                <CardContent className="py-3 px-2 flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 mb-2 rounded-lg overflow-hidden border">
                    <Image
                      src={getPicURL(plant.pictures[0]) || "/placeholder.png"}
                      alt={plant.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-medium">{plant.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {plant.category}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GreenChoices;
