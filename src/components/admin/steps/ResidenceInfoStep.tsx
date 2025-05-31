
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Person } from "@/types";

interface ResidenceInfoStepProps {
  form: UseFormReturn<Omit<Person, 'person_id'>>;
}

export default function ResidenceInfoStep({ form }: ResidenceInfoStepProps) {
  const { register } = form;

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-slate-300">Town or City</Label>
        <Input
          {...register('residence.town_or_city')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Enter town or city of residence"
        />
      </div>

      <div>
        <Label className="text-slate-300">Home at Death</Label>
        <Input
          {...register('residence.home_at_death')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Enter last known address"
        />
      </div>
    </div>
  );
}
