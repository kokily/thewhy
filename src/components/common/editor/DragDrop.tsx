import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  onDragDropUpload: (file: File) => void;
}

export function DragDrop({ onDragDropUpload }: Props) {
  const dragIndex = useRef(0);
  const down = useRef(false);

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    function onDrop(e: DragEvent) {
      e.preventDefault();

      const { files } = e.dataTransfer || { files: null };

      if (!files) return;
      if (!files[0]) return;

      onDragDropUpload(files[0]);

      dragIndex.current = 0;

      setDragging(false);

      e.stopPropagation();
    }

    function onMouseDown() {
      down.current = true;
    }

    function onMouseUp() {
      down.current = false;
    }

    function onDragEnter() {
      if (down.current) return;

      dragIndex.current += 1;

      if (dragIndex.current === 1) {
        setDragging(true);
      }
    }

    function onDragOver(e: DragEvent) {
      e.preventDefault();

      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'copy';
      }

      if (!dragging) {
        setDragging(true);
      }
    }

    function onDragLeave() {
      if (down.current) return;

      dragIndex.current -= 1;

      if (dragIndex.current === 0) {
        setDragging(false);
      }
    }

    function onMouseLeave() {
      if (dragging) {
        setDragging(false);
      }
    }

    window.addEventListener('drop', onDrop);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('dragenter', onDragEnter);
    window.addEventListener('dragover', onDragOver);
    window.addEventListener('dragleave', onDragLeave);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('drop', onDrop);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('dragenter', onDragEnter);
      window.removeEventListener('dragover', onDragOver);
      window.removeEventListener('dragleave', onDragLeave);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [dragging, onDragDropUpload]);

  return dragging ? (
    <DragContainer>
      <ShadowInput type="file" />
    </DragContainer>
  ) : null;
}

// Styles
const DragContainer = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const ShadowInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: block;
`;
