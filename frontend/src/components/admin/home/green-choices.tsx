"use client";

import {
  getPlantsForGreenChoices,
  updateGreenChoices,
} from "@/lib/api-routes/api-admin";
import { getErrorMessage, getPicURL, showErrorToast, showSuccessToast } from "@/lib/helper";
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
import { HomeGreenPlantType } from "@/lib/types/common-types";
import CustomDialog from "@/components/layout/Dialog";

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
      showSuccessToast("Grren Choices plants updated successfully!")
    } catch (e) {
      showErrorToast(getErrorMessage(e as AxiosError));
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Green Choices</h1>
        <Button
          variant="outline"
          className="bg-[#F37521] hover:bg-[#e0661c] text-white"
          onClick={() => setOpen(true)}
        >
          Update
        </Button>
      </div>

      {/* Green choices grid */}
      <div>
        {greenChoicesPlants.length === 0 ? (
          <p className="text-muted-foreground">No green choices added yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12 justify-items-center">
            {greenChoicesPlants.map((plant) => (
              <div
                key={plant._id}
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="w-[200px] sm:w-[220px] md:w-[240px] lg:w-[250px] h-[300px] sm:h-[320px] md:h-[350px] lg:h-[375px] rounded-[10px] overflow-hidden shadow-md bg-white transition-transform duration-300 hover:scale-105">
                  <div className="relative w-full h-full">
                    <Image
                      src={getPicURL(plant.pictures[0]) || "/placeholder.png"}
                      alt={plant.title}
                      fill
                      className="rounded-[10px] object-cover"
                    />
                  </div>
                </div>
                <p className="mt-4 text-center text-lg font-medium text-gray-700 group-hover:text-green-700">
                  {plant.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Update dialog */}
      <CustomDialog
        title="Update Green Choices"
        open={open}
        onclose={setOpen}
        className="w-full max-w-2xl"
      >
        <div className="space-y-4">
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
                      onClick={(e) => e.stopPropagation()}
                    />

                    {/* Plant image */}
                    <div className="relative w-10 h-10 rounded overflow-hidden border">
                      <Image
                        src={getPicURL(plant.pictures[0]) || "/placeholder.png"}
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
              </CommandGroup>
            </CommandList>
          </Command>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={selectedPlants.length === 0}
              className="bg-[#F37521] hover:bg-[#e0661c] text-white rounded-lg"
            >
              Save
            </Button>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
};

export default GreenChoices;
