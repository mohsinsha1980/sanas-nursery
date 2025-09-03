"use client";

import { useState } from "react";
import Image from "next/image";
import { Save, Upload } from "lucide-react";
import {
  getErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib/helper";
import { AxiosError } from "axios";
import { updateHomeGallery } from "@/lib/api-routes/api-admin";

interface ImageCardProps {
  src: string;
  alt: string;
  field: string;
  width: number;
  height: number;
}

const ImageCard = ({ src, alt, field, width, height }: ImageCardProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    try {
      setSaving(true);
      const data = {
        field,
        picture: selectedFile,
      };
      console.log("data", data);
      await updateHomeGallery(data);
      showSuccessToast("Gallery image updated successfully!");
      setSelectedFile(null);
    } catch (error) {
      showErrorToast(getErrorMessage(error as AxiosError));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative group w-full h-full overflow-hidden rounded-xl">
      <Image
        src={previewImage || src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Hover Upload Button */}
      <div className="absolute inset-0 flex items-center justify-center transition bg-black/40">
        {!selectedFile ? (
          <label className="flex items-center justify-center  opacity-0 group-hover:opacity-100 bg-white text-sm px-3 py-2 rounded-lg cursor-pointer shadow hover:bg-gray-100">
            <Upload className="w-4 h-4 mr-2" />
            Change
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        ) : (
          <div className="opacity-100">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center bg-[#F37521] text-white px-4 py-3 rounded-lg shadow hover:bg-[#e0661c] disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save New Image"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
