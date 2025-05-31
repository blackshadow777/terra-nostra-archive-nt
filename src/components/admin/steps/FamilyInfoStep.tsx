
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Person } from "@/types";

interface FamilyInfoStepProps {
  form: UseFormReturn<Omit<Person, 'person_id'>>;
}

export default function FamilyInfoStep({ form }: FamilyInfoStepProps) {
  const { register } = form;

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-slate-300">Names of Parents</Label>
        <Input
          {...register('family.names_of_parents')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Enter parents' names"
        />
      </div>

      <div>
        <Label className="text-slate-300">Names of Children</Label>
        <Textarea
          {...register('family.names_of_children')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Enter children's names (one per line or separated by commas)"
          rows={4}
        />
      </div>
    </div>
  );
}
