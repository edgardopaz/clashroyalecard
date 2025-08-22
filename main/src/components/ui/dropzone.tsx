import React, {useCallback, useState} from 'react'
import {useDropzone, FileRejection} from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'

type PreviewFile = File & { preview:string };

function Dropzone({ className }) {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        setFiles(prev => [
          ...prev,
          ...acceptedFiles.map(f =>
            Object.assign(f, { preview: URL.createObjectURL(f) }) as PreviewFile
          ),
        ]);
      }

      if (rejectedFiles?.length) {
        setRejected(prev => [...prev, ...rejectedFiles]);
      }
    },
    []
  );


  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {
    'image/*': [".png", ".jpeg", ".img"]},
    maxSize: 10 * 1024 * 1024
  })

  const removeFile = (name => {
    setFiles(files => files.filter(file => file.name !== name))
  })

  const removeRejected = name => {
    setRejected(files => files.filter(({file}) => file.name !== name))
  }

  return (
    <form>
    <div {...getRootProps(
        className={className}
    )}>
      <input {...getInputProps()} />
    {isDragActive ? (
    <p>Drop the files here ...</p>
    ) : (
    <p>
        Drag 'n' drop some files here, or click to select files
        <br />
        HEIC is not accepted, please convert iPhone images to JPG, PNG or JPEG here:{" "}
        <a
        href="https://cloudconvert.com/heic-converter"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
        >
        cloudconvert.com
        </a>
    </p>
    )}    
    </div>

    <h3 className='title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3'>
          Accepted Files
        </h3>
        <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
          {files.map(file => (
            <li className="rounded-xl overflow-hidden shadow bg-card">
                {/* image wrapper must be relative for the absolute badge */}
                <div className="relative w-full aspect-square">
                    <img
                        src={file.preview}
                        alt={file.name}
                        className="h-full w-full object-contain bg-gray-100"
                        onLoad={() => URL.revokeObjectURL(file.preview)}
                        />

                        {/* remove badge */}
                        <button
                        type="button"
                        onClick={() => removeFile(file.name)}
                        className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center
                                    rounded-full bg-secondary text-secondary-foreground shadow
                                    hover:bg-red-500 hover:text-white
                                    focus:outline-none focus:ring-2 focus:ring-red-400
                                    transition-colors"
                        aria-label="Remove file"
                        >
                        {/* Heroicons: use text color, not fill */}
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                </div>

                <p className="px-2 py-2 text-xs text-muted-foreground truncate">{file.name}</p>
            </li>
          ))}
        </ul>

         {/* Rejected Files */}
        <h3 className='title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3'>
          Rejected Files
        </h3>
        <ul className='mt-6 flex flex-col'>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-start justify-between'>
              <div>
                <p className='mt-2 text-neutral-500 text-sm font-medium'>
                  {file.name}
                </p>
                <ul className='text-[12px] text-red-400'>
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type='button'
                className='mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
                onClick={() => removeRejected(file.name)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

    </form>
  )
}

export { Dropzone }