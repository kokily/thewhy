import { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { media } from '@/helper/client/style';
import { DragDrop } from './DragDrop';
import 'react-quill/dist/quill.snow.css';
import client from '@/helper/client/client';

interface Props {
  body: string;
  onChangeBody: (text: string) => void;
}

export default function EditorBody({ body, onChangeBody }: Props) {
  const quillRef = useRef(null);

  // Image Upload Function
  const imageUpload = async (formData: FormData) => {
    const response = await client.post<{ url: string }>('/upload', formData);

    if (!response.data) {
      toast.error('Upload Failed');
      return;
    }

    const { url } = response.data;
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();

    editor.insertEmbed(range.index, 'image', url);
    editor.setSelection(range.index + 1);
  };

  // Quill Editor Image Handler
  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append('file', file);

      try {
        await imageUpload(formData);
      } catch (err: any) {
        toast.error(err);
      }
    });
  };

  // Image Drag&Drop
  const imageDragDrop = async (file: File) => {
    const formData = new FormData();

    formData.append('file', file);

    try {
      await imageUpload(formData);
    } catch (err: any) {
      toast.error(err);
      return;
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction

          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],
          ['link', 'image', 'video', 'formula'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
        ImageDrop: true,
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  return (
    <>
      <EditorContainer>
        <ReactQuill
          ref={quillRef}
          value={body}
          onChange={onChangeBody}
          placeholder="본문을 작성하세요"
          theme="snow"
          modules={modules}
        />
      </EditorContainer>

      <DragDrop onDragDropUpload={imageDragDrop} />
    </>
  );
}

// Styles
const EditorContainer = styled.div`
  top: 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 650px;
  font-size: 1.125rem;
  margin-bottom: 5rem;
  scroll-behavior: auto;

  blockquote {
    border-left: 4px solid #1b3bf5;
    font-size: 1.4rem;
    padding: 0.6rem 0 0.6rem 1.3rem;
    color: black;
    margin-left: 0;
    margin-right: 0;

    p {
      margin: 0;
    }
  }

  p {
    font-size: 1.215rem;
    em {
      color: #fff;
      background: #1fb498;
      padding: 0 0.5rem 0.1rem 0.5rem;
      font-style: normal;
      border-radius: 4px;
    }
    strong {
      color: #1e63c4;
      border-radius: 6px;
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      margin-left: 0.2rem;
      margin-right: 0.2rem;
    }
  }

  pre {
    font-size: 1.215rem;
    padding: 0.5rem 0.8rem;
    background: none;
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: normal;
  }

  .ql-editor {
    overflow-y: scroll;
    height: 650px;
  }

  .ql-toolbar {
    border: none;
    border-bottom: 1px solid #777;
  }

  .ql-container {
    flex: 1 1 0%;
    min-height: 0px;
    height: auto;
  }

  img {
    width: 100%;
    height: 100%;
    max-width: 650px !important;
  }

  .ql-video {
    display: block;
    width: 100vw;
    height: 100vh;
    max-width: 650px;
    max-height: 480px;

    ${media.medium} {
      width: 100%;
      height: 100%;
    }
  }
`;
