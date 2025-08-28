import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

interface ViewerProps {
  content: string;
  style?: "default" | "prose";
}

const Viewer = ({ content, style }: ViewerProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
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
    editable: false,
  });

  if (!editor) return <></>;

  const className: string =
    style === "prose" ? "prose-mt-0 prose max-w-none dark:prose-invert" : "";

  return (
    <article className={className? className : ""}>
      <EditorContent editor={editor} readOnly={true} />
    </article>
  );
};

export default Viewer;
