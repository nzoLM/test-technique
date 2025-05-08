'use client'
import { Button } from "@/components/ui/button"
import questions from "@/data/questions.json"
import { useState } from "react"
export default function TestTechnique() {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const question = questions[currentQuestion];

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        
      </div>
    </div>
  )
}

