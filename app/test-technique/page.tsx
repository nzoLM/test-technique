'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import questions from "@/data/questions.json";
import { useState, useRef } from "react";
import { answersSubmit } from "@/app/actions/submit";
import { ArrowUpRight } from "lucide-react";

export default function TestTechnique() {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [status, setStatus] = useState<{
    message: string;
    type: 'success' | 'error' | 'none';
    status?: number;
  }>();
  const formCurrent = useRef<HTMLFormElement>(null);

  const formatOptions = (options: string[] | undefined) => {
    return options?.map(option => ({
      label: option,
      value: option
    })) || [];
  };

  const handleError = async (formData: FormData) => {
    const result = await answersSubmit(formData);
    if (result?.error) {
      setStatus({
        message: "An error occurred while submitting the form.",
        type: 'error',
        status: result.status
      });
    } else {
      if (selectedHobbies.length === 0) {
        setStatus({
          message: "Please select at least one hobby.",
          type: 'error',
        });
        return;
      }
      setStatus({
        message: "The data has been sent successfully.",
        type: 'success',
        status: result.status
      });
      formCurrent.current?.reset();
      setSelectedHobbies([]);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-xl space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-gray-900">Who are you ?</h1>
          <p className="text-gray-600 text-sm">Help us get to know you better through a few simple questions. There's no right or wrong answer; just be yourself!</p>
        </div>

        <form ref={formCurrent} action={handleError} className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="space-y-1">
              <label htmlFor={question.id} className="text-lg font-medium text-gray-900">
                {question.title}
              </label>
              <p className="text-sm text-gray-500">{question.description}</p>

              {question.type === "text" && (
                <Input
                  required
                  name="name"
                  id={question.id}
                  type="text"
                  placeholder="Name..."
                  className="w-full"
                />
              )}

              {question.type === "number" && (
                <Input
                  required
                  name="age"
                  id={question.id}
                  type="number"
                  placeholder="Age..."
                  className="w-full"
                />
              )}

              {question.type === "radio" && (
                <div className="space-y-1">
                  {question.options?.map((value) => (
                    <label key={value} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="gender"
                        value={value}
                        required
                        className="form-radio text-blue-600"
                      />
                      {value}
                    </label>
                  ))}
                </div>
              )}

              {question.type === "multiselect" && (
                <div className="text-sm">
                  <MultiSelect
                    options={formatOptions(question.options)}
                    onChange={setSelectedHobbies}
                    placeholder="Pick one or more hobbies you enjoy (at least one required)"
                    value={selectedHobbies}
                  />
                  {selectedHobbies.map((hobby, index) => (
                    <input key={index} type="hidden" name="hobbies" value={hobby} />
                  ))}
                </div>
              )}

              {question.type === "textarea" && (
                <Textarea
                  required
                  name="about"
                  id={question.id}
                  placeholder="Write here..."
                  className="w-full min-h-[100px]"
                />
              )}
            </div>
          ))}

          <Button
            type="submit"
            className="w-full bg-pink-100 hover:bg-pink-200 text-black font-medium py-2"
          >
            <span className="flex items-center justify-center gap-2">
              Submit<ArrowUpRight size={16} />
            </span>
          </Button>
        </form>
        {status?.type && (
          <div className={`p-3 rounded border text-sm ${status?.type === 'success' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'}`}>
            {status?.message}
          </div>
        )}
      </div>
    </div>
  );
}
