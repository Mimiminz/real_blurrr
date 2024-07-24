import React, { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor: React.FC = () => {
  const [content, setContent] = useState<string>('');

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
    ],
  }), []);

  const formats = [
    'font', 'size', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'align', 'color', 'background', 'link', 'image'
  ];

  return (
    <ReactQuill
      style={{ height: "400px", paddingBottom: "40px" }}  // 적절한 높이와 여유 공간 설정
      value={content}
      onChange={setContent}
      modules={modules}
      formats={formats}
      placeholder="본문을 입력해주세요."
    />
  );
};

export default QuillEditor;
