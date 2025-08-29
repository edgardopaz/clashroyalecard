import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DropzoneWithCropper from "@/components/ui/dropzone";
import CardPreview from "@/components/ui/cardpreview"; // ensure this path/casing matches your file

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [portraitUrl, setPortraitUrl] = useState(null);
  const slotPx = { x: 60, y: 110, w: 190, h: 190 };

  useEffect(() => {
    return () => {
      if (portraitUrl && portraitUrl.startsWith("blob:")) {
        URL.revokeObjectURL(portraitUrl);
      }
    };
  }, [portraitUrl]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Details</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description
                  </Label>
                  <textarea
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Upload + Crop */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
              {/* Make sure your DropzoneWithCropper calls this with the cropped blob URL */}
              <DropzoneWithCropper onPortrait={setPortraitUrl} />
            </div>
          </div>

          {/* Right: Live Card Preview */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div className="sticky top-6">
                <CardPreview
                  portraitUrl={portraitUrl} 
                  slotPx={slotPx} /* debug */ />

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-8 flex justify-center">
          <Button size="lg" disabled={!name || !description} className="px-8">
            Create Card
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
