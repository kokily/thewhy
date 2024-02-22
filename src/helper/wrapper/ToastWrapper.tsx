'use client';

import { ToastContainer } from 'react-toastify';

export default function ToastWrapper() {
  return (
    <ToastContainer
      position="top-center"
      draggable={false}
      closeOnClick={true}
    />
  );
}
