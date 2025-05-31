
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Person } from "@/types";

interface NaturalizationInfoStepProps {
  form: UseFormReturn<Omit<Person, 'person_id'>>;
}

export default function NaturalizationInfoStep({ form }: NaturalizationInfoStepProps) {
  const { register } = form;

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-slate-300">Date of Naturalisation</Label>
        <Input
          {...register('naturalization.date_of_naturalisation')}
          type="date"
          className="bg-slate-700 border-slate-600 text-white"
        />
      </div>

      <div>
        <Label className="text-slate-300">Certificate Number</Label>
        <Input
          {...register('naturalization.no_of_cert')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Enter certificate number"
        />
      </div>

      <div>
        <Label className="text-slate-300">Issued At</Label>
        <Input
          {...register('naturalization.issued_at')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Enter place where certificate was issued"
        />
      </div>
    </div>
  );
}
