import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./toolbar/editor-toolbar";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

interface EditorProps {
  content: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Editor = ({ content, placeholder, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        listItem: false,
        bulletList: false,
        orderedList: false,
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold capitalize",
          levels: [2],
        },
      }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-2",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-2",
        },
      }),
    ],

    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return <></>;

  return (
    <div className="prose max-w-none w-full  bg-background dark:prose-invert rounded-md">
      <EditorToolbar editor={editor} />
      <div className="editor">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  );
};

export default Editor;
