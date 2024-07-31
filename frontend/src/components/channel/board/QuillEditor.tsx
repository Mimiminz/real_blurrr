import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ content, setContent }) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ font: [] }, { size: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video"],
        ["vote"],
      ],
    }),
    []
  );

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "ordered",
    "bullet",
    "align",
    "color",
    "background",
    "link",
    "image",
    "video",
  ];
  console.log(content);

  return (
    <ReactQuill
      style={{ height: "400px", paddingBottom: "40px" }} // 적절한 높이와 여유 공간 설정
      value={content}
      onChange={setContent}
      modules={modules}
      formats={formats}
      placeholder="본문을 입력해주세요."
    />
  );
};

export default QuillEditor;
