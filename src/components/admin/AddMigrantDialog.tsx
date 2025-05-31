
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Person } from "@/types";
import { useMigrantMutations } from "@/hooks/useMigrants";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import FamilyInfoStep from "./steps/FamilyInfoStep";
import MigrationInfoStep from "./steps/MigrationInfoStep";
import ResidenceInfoStep from "./steps/ResidenceInfoStep";
import NaturalizationInfoStep from "./steps/NaturalizationInfoStep";
import ReviewStep from "./steps/ReviewStep";

interface AddMigrantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 1, title: "Personal Information", component: PersonalInfoStep },
  { id: 2, title: "Family Information", component: FamilyInfoStep },
  { id: 3, title: "Migration Information", component: MigrationInfoStep },
  { id: 4, title: "Residence Information", component: ResidenceInfoStep },
  { id: 5, title: "Naturalization Information", component: NaturalizationInfoStep },
  { id: 6, title: "Review & Submit", component: ReviewStep },
];

export default function AddMigrantDialog({ open, onOpenChange }: AddMigrantDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { createMigrant } = useMigrantMutations();
  
  const form = useForm<Omit<Person, 'person_id'>>({
    defaultValues: {
      surname: "",
      christian_name: "",
      fullName: "",
      date_of_birth: 0,
      place_of_birth: "",
      date_of_death: undefined,
      occupation: "",
      additional_notes: "",
      reference: "",
      id_card_no: "",
      photos: [],
      family: {
        names_of_parents: "",
        names_of_children: "",
      },
      naturalization: {
        date_of_naturalisation: "",
        no_of_cert: "",
        issued_at: "",
      },
      residence: {
        town_or_city: "",
        home_at_death: "",
      },
      has_photo: false,
      migration: {
        date_of_arrival_aus: "",
        date_of_arrival_nt: "",
        arrival_period: "",
        data_source: "",
      },
    },
  });

  const progress = (currentStep / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep - 1].component;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (data: Omit<Person, 'person_id'>) => {
    try {
      await createMigrant.mutateAsync(data);
      onOpenChange(false);
      setCurrentStep(1);
      form.reset();
    } catch (error) {
      console.error('Failed to create migrant:', error);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setCurrentStep(1);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Migrant Record</DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-400">
            <span>Step {currentStep} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-center text-slate-300 font-medium">
            {steps[currentStep - 1].title}
          </div>
        </div>

        {/* Step Content */}
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <CurrentStepComponent form={form} />

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t border-slate-600">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-slate-600 text-slate-300"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-red-600 hover:bg-red-700"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={createMigrant.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                {createMigrant.isPending ? (
                  "Creating..."
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Create Migrant
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
