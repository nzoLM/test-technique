'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import questions from "@/data/questions.json";
import { useState, useRef } from "react";
import { answersSubmit } from "@/app/actions/submit";

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
    if (selectedHobbies.length === 0) {
      setStatus({
        message: "Veuillez sélectionner au moins un hobby.",
        type: 'error',
      });
      return; // Stoppe la soumission
    }
    const result = await answersSubmit(formData);
    if (result?.error) {
      alert(result.error);
      setStatus({
        message: "Une erreur est survenue lors de la soumission du formulaire.",
        type: 'error',
        status: result.status
      });
    } else {
      setStatus({
        message: "Les données ont été envoyées avec succès.",
        type: 'success',
        status: result.status
      });
    }

    formCurrent.current?.reset();
    setSelectedHobbies([]);
  }

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        {
          status?.type === "success" && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {status?.message}
            </div>
          )
        }
        {
          status?.type === "error" && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {status?.message}
            </div>
          )
        }
        <form action={handleError} className="flex flex-col gap-4">
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
                <div className="flex flex-col gap-2" id={question.id}>
                  {question.options?.map((value) => (
                    <label key={value} className="inline-flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={value}
                        required
                        className="form-radio text-blue-600 focus:ring-blue-500"
                      />
                      <span>{value}</span>
                    </label>
                  ))}
                </div>
                )}


              {question.type === "multiselect" && (
                <>
                  <MultiSelect
                    options={formatOptions(question.options)}
                    onChange={setSelectedHobbies}
                    placeholder="Select hobbies"
                    value={selectedHobbies}
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
