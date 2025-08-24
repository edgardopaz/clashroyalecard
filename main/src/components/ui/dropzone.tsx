import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Cropper, { Area } from "react-easy-crop";

function DropzoneWithCropper() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  // cropper state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);

  const onDrop = useCallback((accepted: File[], rejections: FileRejection[]) => {
    if (accepted.length > 0) {
      const url = URL.createObjectURL(accepted[0]);
      setFileUrl(url);
      setCroppedUrl(null);
    }
    if (rejections.length > 0) {
      setRejected(rejections);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxSize: 10 * 1024 * 1024,
  });

  const applyCrop = async () => {
    if (!fileUrl || !area) return;

    const img = await loadImage(fileUrl);
    const canvas = document.createElement("canvas");
    canvas.width = 800; // target size for profile
    canvas.height = 800;
    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(
      img,
      area.x, area.y, area.width, area.height,
      0, 0, canvas.width, canvas.height
    );

    return new Promise<void>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          if (croppedUrl) URL.revokeObjectURL(croppedUrl);
          setCroppedUrl(url);
          setFileUrl(null); // clear original so cropper disappears
        }
        resolve();
      }, "image/png");
    });
  };

  const removeAll = () => {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    if (croppedUrl) URL.revokeObjectURL(croppedUrl);
    setFileUrl(null);
    setCroppedUrl(null);
    setRejected([]);
  };

  return (
    <div className="space-y-6">
      {/* show cropped preview if available */}
      {croppedUrl && (
        <div className="relative w-64 aspect-square rounded-xl border overflow-hidden">
          <img
            src={croppedUrl}
            alt="Cropped"
            className="w-full h-full object-cover"
          />
          <button
            onClick={removeAll}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* show cropper if a file was just dropped */}
      {fileUrl && (
        <div className="space-y-3">
          <div className="relative w-80 h-80 bg-black/5 rounded-lg overflow-hidden">
            <Cropper
              image={fileUrl}
              crop={crop}
              zoom={zoom}
              aspect={1} // square for profile
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, areaPx) => setArea(areaPx)}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={applyCrop}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Apply Crop
            </button>
            <button
              onClick={removeAll}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* show dropzone if no image is selected/cropped */}
      {!fileUrl && !croppedUrl && (
        <div
          {...getRootProps({
            className:
              "cursor-pointer rounded-xl border-2 border-dashed p-6 text-center grid place-items-center gap-3",
          })}
        >
          <input {...getInputProps()} />
          <ArrowUpTrayIcon className="w-5 h-5" />
          {isDragActive ? (
            <p>Drop the image here…</p>
          ) : (
            <p>
              Drag & drop an image here, or click to select. <br />
              HEIC is not accepted. Convert here:{" "}
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
      )}

      {/* rejected list */}
      {rejected.length > 0 && (
        <ul className="text-sm text-red-500">
          {rejected.map(({ file, errors }) => (
            <li key={file.name}>
              {file.name} — {errors.map((e) => e.message).join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropzoneWithCropper;

// helper to load image
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
