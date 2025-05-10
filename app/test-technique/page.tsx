'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import questions from "@/data/questions.json";
import { useState } from "react";
import { answersSubmit } from "@/app/actions/submit";

export default function TestTechnique() {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const formatOptions = (options: string[] | undefined) => {
    return options?.map(option => ({
      label: option,
      value: option
    })) || [];
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        <form action={answersSubmit} className="flex flex-col gap-4">
          {questions.map((question) => (
            <div key={question.id} className="flex flex-col gap-2">
              <label htmlFor={question.id}>{question.title}</label>

              {question.type === "text" && (
                <Input required name="name" id={question.id} type="text" placeholder="Name..." />
              )}

              {question.type === "number" && (
                <Input required name="age" id={question.id} type="number" placeholder="Age" />
              )}

              {question.type === "radio" && (
                <RadioGroup name="gender" id={question.id} required>
                  {question.options?.map((value) => (
                    <div key={value} className="space-x-2">
                      <RadioGroupItem value={value} id={value} />
                      <label htmlFor={value}>{value}</label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === "multiselect" && (
                <>
                  <MultiSelect
                    required
                    options={formatOptions(question.options)}
                    onValueChange={setSelectedHobbies}
                    defaultValue={selectedHobbies}
                    placeholder="Select hobbies"
                    variant="inverted"
                    animation={2}
                    maxCount={4}
                  />
                  {selectedHobbies.map((hobby, index) => (
                    <input key={index} type="hidden" name="hobbies" value={hobby} />
                  ))}
                </>
              )}

              {question.type === "textarea" && (
                <Textarea
                  required
                  name="about"
                  id={question.id}
                  cols={33}
                  placeholder={question.description}
                />
              )}
            </div>
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
