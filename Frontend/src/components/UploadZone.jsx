import { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

export default function UploadZone({ onFileSelected, errorMsg }) {
  const picker = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [validation, setValidation] = useState('');
  function select(files) {
    if (!files.length) return;
    const file = files[0];
    let message = '';
    if (files.length !== 1) message = 'Choose one PDF at a time.';
    else if (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf') message = 'Choose a PDF file.';
    else if (!file.size) message = 'This file is empty.';
    else if (file.size > 50 * 1024 ** 2) message = 'Choose a PDF smaller than or equal to 50 MiB.';
    setValidation(message);
    if (!message) onFileSelected(file);
  }

  return <div onDragOver={e => { e.preventDefault(); setDragging(true); }}
    onDragLeave={() => setDragging(false)} onDrop={e => {
      e.preventDefault(); setDragging(false); select(e.dataTransfer.files);
    }}>
    <input hidden ref={picker} type="file" accept=".pdf,application/pdf" onChange={e => {
      select(e.target.files); e.target.value = '';
    }} />
    <button type="button" className={'w-full rounded-xl border p-5 text-left focus-visible:outline ' +
      (dragging ? 'border-blue-400' : 'border-zinc-700 bg-zinc-900')} onClick={() => picker.current.click()}>
      <UploadCloud className="mr-3 inline" /> Open PDF
      <span className="mt-2 block text-sm text-zinc-400">Choose or drop one PDF · up to 50 MiB</span>
    </button>
    {(validation || errorMsg) && <p className="mt-2 text-rose-300" role="alert">{validation || errorMsg}</p>}
  </div>;
}
