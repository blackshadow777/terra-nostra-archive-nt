
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Person } from "@/types";

interface PersonalInfoStepProps {
  form: UseFormReturn<Omit<Person, 'person_id'>>;
}

export default function PersonalInfoStep({ form }: PersonalInfoStepProps) {
  const { register, watch, setValue } = form;
  const christian_name = watch('christian_name');
  const surname = watch('surname');

  // Auto-generate fullName when first or last name changes
  const updateFullName = () => {
    const fullName = `${christian_name} ${surname}`.trim();
    setValue('fullName', fullName);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-slate-300">First Name *</Label>
          <Input
            {...register('christian_name', { 
              required: 'First name is required',
              onChange: updateFullName 
            })}
            className="bg-slate-700 border-slate-600 text-white"
            placeholder="Enter first name"
          />
        </div>
        
        <div>
          <Label className="text-slate-300">Last Name *</Label>
          <Input
            {...register('surname', { 
              required: 'Last name is required',
              onChange: updateFullName 
            })}
            className="bg-slate-700 border-slate-600 text-white"
            placeholder="Enter last name"
          />
        </div>
      </div>

      <div>
        <Label className="text-slate-300">Full Name</Label>
        <Input
          {...register('fullName')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Auto-generated from first and last name"
          readOnly
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-slate-300">Birth Year</Label>
          <Input
            {...register('date_of_birth', { valueAsNumber: true })}
            type="number"
            className="bg-slate-700 border-slate-600 text-white"
            placeholder="e.g., 1920"
            min="1800"
            max="2024"
          />
        </div>
        
        <div>
          <Label className="text-slate-300">Death Year</Label>
          <Input
            {...register('date_of_death', { valueAsNumber: true })}
            type="number"
            className="bg-slate-700 border-slate-600 text-white"
            placeholder="e.g., 1990"
            min="1800"
            max="2024"
          />
        </div>
      </div>

      <div>
        <Label className="text-slate-300">Place of Birth</Label>
        <Input
          {...register('place_of_birth')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Enter place of birth"
        />
      </div>

      <div>
        <Label className="text-slate-300">Occupation</Label>
        <Input
          {...register('occupation')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Enter occupation"
        />
      </div>

      <div>
        <Label className="text-slate-300">ID Card Number</Label>
        <Input
          {...register('id_card_no')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Enter ID card number"
        />
      </div>

      <div>
        <Label className="text-slate-300">Additional Notes</Label>
        <Textarea
          {...register('additional_notes')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Enter any additional notes"
          rows={3}
        />
      </div>

      <div>
        <Label className="text-slate-300">Reference</Label>
        <Input
          {...register('reference')}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Enter reference information"
        />
      </div>
    </div>
  );
}
