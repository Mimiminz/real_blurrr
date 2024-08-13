import React, { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageActions } from '@xeger/quill-image-actions';
import AWS from "aws-sdk";

const ACCESS_KEY = process.env.NEXT_PUBLIC_S3_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY;
const CLOUD_FRONT_URL = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL;

interface QuillEditorProps {
  content: string;
  setContent: (content: string) => void;
  setThumbNail?: (url: string) => void; // 옵셔널로 변경
}

Quill.register('modules/imageActions', ImageActions);

const QuillEditor: React.FC<QuillEditorProps> = ({ content, setContent, setThumbNail }) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const name = Date.now();
        const extension = file.name.split('.').pop();
        const filename = `${name}.${extension}`;

        AWS.config.update({
          region: "ap-northeast-2",
          accessKeyId: ACCESS_KEY,
          secretAccessKey: SECRET_ACCESS_KEY,
        });

        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: "blurrr-img-bucket",
            Key: `images/${filename}`,
            Body: file,
            ContentType: file.type,
          },
        });

        const result = await upload.promise();
        const url_key = result.Key;
        const fullUrl = CLOUD_FRONT_URL + url_key;

        if (quillRef.current) {
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          if (range) {
            editor.insertEmbed(range.index, "image", fullUrl);
          }
        }

        if (!isSaved && setThumbNail) {
          setThumbNail(fullUrl);
          setIsSaved(true);
        }
      } catch (error) {
        console.log("Error uploading image: ", error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      imageActions: {},
      toolbar: {
        container: [
          [{ size: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          ["image"],
          ["vote"],
        ],
        handlers: {
          image: imageHandler
        },
        ImageResize: {
          modules: ['Resize'],
        },
      },
    };
  }, []);

  const formats = [
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
    "image",
    'height',
    'width',
  ];

  return (
    <ReactQuill
      ref={quillRef}
      style={{ height: "400px", paddingBottom: "40px" }}
      value={content}
      theme="snow"
      onChange={setContent}
      modules={modules}
      formats={formats}
      placeholder="본문을 입력해주세요."
    />
  );
};

export default QuillEditor;
