
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Person } from "@/types";

interface MigrationInfoStepProps {
  form: UseFormReturn<Omit<Person, 'person_id'>>;
}

export default function MigrationInfoStep({ form }: MigrationInfoStepProps) {
  const { register } = form;

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-slate-300">Date of Arrival in Australia</Label>
        <Input
          {...register('migration.date_of_arrival_aus')}
          type="date"
          className="bg-slate-700 border-slate-600 text-white"
        />
      </div>

      <div>
        <Label className="text-slate-300">Date of Arrival in Northern Territory</Label>
        <Input
          {...register('migration.date_of_arrival_nt')}
          type="date"
          className="bg-slate-700 border-slate-600 text-white"
        />
      </div>

      <div>
        <Label className="text-slate-300">Arrival Period</Label>
        <Input
          {...register('migration.arrival_period')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="e.g., Post-war migration, 1950s"
        />
      </div>

      <div>
        <Label className="text-slate-300">Data Source</Label>
        <Input
          {...register('migration.data_source')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Source of migration data"
        />
      </div>
    </div>
  );
}
