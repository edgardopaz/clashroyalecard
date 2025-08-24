import { useState } from 'react'
import './App.css'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import DropzoneWithCropper from "@/components/ui/dropzone"
import { ImageIcon } from 'lucide-react'


function App() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Form Inputs */}
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

          {/* Middle - Dropzone */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
              <DropzoneWithCropper onImageCropped={setUploadedImage} />
            </div>
          </div>

          {/* Right Side - Card Preview */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              
              <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
                {/* Card Image */}
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  {uploadedImage ? (
                    <img 
                      src={uploadedImage} 
                      alt="Card preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <ImageIcon className="mx-auto h-12 w-12 mb-2" />
                      <p className="text-sm">No image uploaded</p>
                    </div>
                  )}
                </div>
                
                {/* Card Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {name || 'Card Title'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {description || 'Card description will appear here...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-8 flex justify-center">
          <Button 
            size="lg"
            disabled={!name || !description}
            className="px-8"
          >
            Create Card
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App