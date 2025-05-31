
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Person } from "@/types";

interface ReviewStepProps {
  form: UseFormReturn<Omit<Person, 'person_id'>>;
}

export default function ReviewStep({ form }: ReviewStepProps) {
  const data = form.watch();

  return (
    <div className="space-y-4">
      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-slate-300">
          <p><strong>Name:</strong> {data.fullName || 'Not provided'}</p>
          <p><strong>Birth Year:</strong> {data.date_of_birth || 'Not provided'}</p>
          <p><strong>Death Year:</strong> {data.date_of_death || 'Not provided'}</p>
          <p><strong>Place of Birth:</strong> {data.place_of_birth || 'Not provided'}</p>
          <p><strong>Occupation:</strong> {data.occupation || 'Not provided'}</p>
          <p><strong>ID Card No:</strong> {data.id_card_no || 'Not provided'}</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Family Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-slate-300">
          <p><strong>Parents:</strong> {data.family?.names_of_parents || 'Not provided'}</p>
          <p><strong>Children:</strong> {data.family?.names_of_children || 'Not provided'}</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Migration Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-slate-300">
          <p><strong>Arrival in Australia:</strong> {data.migration?.date_of_arrival_aus || 'Not provided'}</p>
          <p><strong>Arrival in NT:</strong> {data.migration?.date_of_arrival_nt || 'Not provided'}</p>
          <p><strong>Arrival Period:</strong> {data.migration?.arrival_period || 'Not provided'}</p>
          <p><strong>Data Source:</strong> {data.migration?.data_source || 'Not provided'}</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Residence & Naturalization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-slate-300">
          <p><strong>Town/City:</strong> {data.residence?.town_or_city || 'Not provided'}</p>
          <p><strong>Home at Death:</strong> {data.residence?.home_at_death || 'Not provided'}</p>
          <p><strong>Naturalization Date:</strong> {data.naturalization?.date_of_naturalisation || 'Not provided'}</p>
          <p><strong>Certificate No:</strong> {data.naturalization?.no_of_cert || 'Not provided'}</p>
          <p><strong>Issued At:</strong> {data.naturalization?.issued_at || 'Not provided'}</p>
        </CardContent>
      </Card>

      {data.additional_notes && (
        <Card className="bg-slate-700 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white">Additional Notes</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300">
            <p>{data.additional_notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
