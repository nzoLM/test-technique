'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import questions from "@/data/questions.json";
import { useState } from "react";

export default function TestTechnique() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }

  const question = questions[currentQuestion];

  const formatOptions = (options) => {
    return options?.map(option => ({
      label: option,
      value: option
    })) || [];
  };

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">

        <div key={question.id} className="flex flex-col gap-2">
          <label htmlFor={question.id}>{question.title}</label>
          {question.type === "text" && <Input id={question.id} type="text" placeholder="Name..."></Input>}
          {question.type === "number" && <Input id={question.id} type="number" placeholder="Age"></Input>}
          {question.type === "radio" && (
            <RadioGroup id={question.id}>
              {question.options?.map((value) => (
                <div key={value} className="space-x-2">
                  <RadioGroupItem value={value} id={value}>{value}</RadioGroupItem>
                  <label htmlFor={value}>{value}</label>
                </div>
              ))}
            </RadioGroup>)}
          {
            question.type === "multiselect" && (
                <MultiSelect
                  options={formatOptions(question.options)}
                  onValueChange={setSelectedHobbies}
                  defaultValue={selectedHobbies}
                  placeholder="Select hobbies"
                  variant="inverted"
                  animation={2}
                  maxCount={4}
                />
                )
          }
          {
            question.type === "textarea" && (
              <Textarea name="about" id={question.id} cols={33} placeholder={question.description}></Textarea>
            )
          }
        </div>
        <div className="flex justify-between">
          {currentQuestion === questions.length - 1 && 
                  <Button type="submit">Submit</Button>
                  }
          {currentQuestion < questions.length - 1 && 
                  <Button className="self-start" onClick={handleNext}>Next</Button>
                  }
          {currentQuestion > 0 && 
                  <Button onClick={handlePrevious}>Previous</Button>
                  }
        </div>

      </div>
    </div>
  )
}

