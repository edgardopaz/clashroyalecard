import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Dropzone } from "@/components/ui/dropzone"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>

      <div className="fixed top-4 left-1/2 -translate-x-1/2">
        <Input placeholder="Enter here" />
      </div>
    
      <section className='section'>
      <div className='container'>
        <h1 className='title text-3xl font-bold'>Upload Files</h1>
        <Dropzone className='p-16 mt-10 border border-neutral-200' />
      </div>
    </section>
    </>
  )
}


export default App
