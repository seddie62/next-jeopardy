"use client"
import {Button} from "@nextui-org/button";
import { useState } from "react";
import FunkyButton from './ui/components/FunkyButton'
import NewSessionModal from './ui/components/NewSessionModal'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ code: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }



  const handleSubmit = async (e) => {
    console.log('here', e);

    e.preventDefault()
    if (!form.code) return

    router.push(`/sessions/${form.code}`)
}

  return (
    <main className="bg-primary/80 h-screen w-full flex flex-col items-center justify-center space-y-6 font-sans">
      <h1 className="font-marker text-white text-7xl">Welcome!!</h1>
      <h2 className="font-marker text-2xl text-[#0FF0FC] tracking-wide">Enter a session id or create a new session</h2>

      <div>
        <form className="space-y-4">
          <input
            type="text"
            value={form.code}
            onChange={handleChange}
            name="code"
            placeholder="Eg. CV45"
            className="text-4xl py-4 px-4 rounded-sm text-center caret-current w-[50vw]"
          />

          <div className="space-x-2 h-24 flex justify-center items-center">
            <FunkyButton type="submit" onClick={handleSubmit} >Enter Session</FunkyButton>

            <NewSessionModal isOpen={isOpen} />
          </div>
        </form>
      </div>


    </main>
  );
}
