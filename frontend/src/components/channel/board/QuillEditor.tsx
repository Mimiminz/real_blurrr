import React, { useMemo, useRef } from "react";
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
}

Quill.register('modules/imageActions', ImageActions);

const QuillEditor: React.FC<QuillEditorProps> = ({ content, setContent }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      //이미지를 담아 전송할 file을 만든다
      const file = input.files?.[0];
      if (!file) return;

      try {
        //업로드할 파일의 이름으로 Date 사용
        const name = Date.now();
        const extension = file.name.split('.').pop();
        const filename = `${name}.${extension}`;

        //생성한 s3 관련 설정들
        AWS.config.update({
          region: "ap-northeast-2",
          accessKeyId: ACCESS_KEY,
          secretAccessKey: SECRET_ACCESS_KEY,
        });
        //앞서 생성한 file을 담아 s3에 업로드하는 객체를 만든다
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: "blurrr-img-bucket", //버킷 이름
            Key: `images/${filename}`,
            Body: file,
            ContentType: file.type,
          },
        });
        const result = await upload.promise();
        const url_key = result.Key;

        if (quillRef.current) {
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          if (range) {
            editor.insertEmbed(range.index, "image", CLOUD_FRONT_URL + url_key);
          }
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
          ["link", "image", "video"],
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
    "link",
    "image",
    "video",
    'height',
    'width',
  ];
  console.log(content);

  return (
    <ReactQuill
      ref={quillRef}
      style={{ height: "400px", paddingBottom: "40px" }} // 적절한 높이와 여유 공간 설정
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
