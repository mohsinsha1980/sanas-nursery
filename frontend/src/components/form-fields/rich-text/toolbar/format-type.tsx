import * as React from "react";
import { Editor } from "@tiptap/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormatTypeProps {
  editor: Editor;
}

export function FormatType({ editor }: FormatTypeProps) {
  const value = () => {
    if (editor.isActive("paragraph")) return "paragraph";
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    if (editor.isActive("heading", { level: 4 })) return "h4";
    if (editor.isActive("heading", { level: 5 })) return "h5";
    if (editor.isActive("heading", { level: 6 })) return "h6";
  };

  const onChange = (value: string) => {
    switch (value) {
      case "paragraph":
        editor.chain().focus().setParagraph().run();
        break;
      case "h1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "h2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "h3":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case "h4":
        editor.chain().focus().toggleHeading({ level: 4 }).run();
        break;
      case "h5":
        editor.chain().focus().toggleHeading({ level: 5 }).run();
        break;
      case "h6":
        editor.chain().focus().toggleHeading({ level: 6 }).run();
        break;
    }
  };

  return (
    <Select onValueChange={onChange} defaultValue={value()} value={value()}>
      <SelectTrigger className="h-8 w-[120px] invisible sm:visible">
        <SelectValue placeholder="Select format" />
      </SelectTrigger>
      {/* Add styling here */}
      <SelectContent className="bg-white text-black shadow-md">
        <SelectGroup>
          <SelectItem value="paragraph" className="hover:bg-gray-100">Paragraph</SelectItem>
          <SelectItem value="h1" className="hover:bg-gray-100">H1</SelectItem>
          <SelectItem value="h2" className="hover:bg-gray-100">H2</SelectItem>
          <SelectItem value="h3" className="hover:bg-gray-100">H3</SelectItem>
          <SelectItem value="h4" className="hover:bg-gray-100">H4</SelectItem>
          <SelectItem value="h5" className="hover:bg-gray-100">H5</SelectItem>
          <SelectItem value="h6" className="hover:bg-gray-100">H6</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
