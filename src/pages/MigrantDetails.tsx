
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, User, Users, FileText, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePersonById } from "@/hooks/usePersonSearch";

const MigrantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: person, isLoading, error } = usePersonById(parseInt(id || '0'));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-terra-red" />
          <p className="text-terra-navy/70">Loading migrant details...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error || !person) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-terra-navy mb-4">Migrant Not Found</h1>
          <Button onClick={() => navigate("/")} className="bg-terra-red hover:bg-terra-red/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <Button 
            onClick={() => navigate("/")} 
            variant="outline"
            className="mb-6 border-terra-navy text-terra-navy hover:bg-terra-navy hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-[3/4] bg-gradient-to-br from-terra-beige to-terra-beige/50 overflow-hidden rounded-t-lg">
                    {person.has_photo && person.photos.length > 0 ? (
                      <img 
                        src={person.photos[0]} 
                        alt={person.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-terra-beige/60" />
                      </div>
                    )}
                  </div>
                  
                  {person.photos.length > 1 && (
                    <div className="p-4">
                      <h4 className="font-semibold text-terra-navy mb-3">Photo Gallery</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {person.photos.slice(1).map((photo: string, index: number) => (
                          <div key={index} className="aspect-square bg-terra-beige/30 rounded overflow-hidden">
                            <img 
                              src={photo} 
                              alt={`${person.fullName} ${index + 2}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-terra-navy mb-2">
                  {person.fullName}
                </h1>
                <p className="text-lg text-terra-navy/70 mb-4">{person.occupation}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-terra-red text-white">
                    {person.place_of_birth.split(',').pop()?.trim() || 'Italy'}
                  </Badge>
                  <Badge variant="outline" className="border-terra-green text-terra-green">
                    {person.residence.town_or_city}
                  </Badge>
                  <Badge variant="outline" className="border-terra-navy text-terra-navy">
                    Arrived {new Date(person.migration.date_of_arrival_nt).getFullYear()}
                  </Badge>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-terra-navy">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-terra-navy">Birth:</span>
                      <p className="text-terra-navy/70">{person.date_of_birth} in {person.place_of_birth}</p>
                    </div>
                    {person.date_of_death && (
                      <div>
                        <span className="font-medium text-terra-navy">Death:</span>
                        <p className="text-terra-navy/70">{person.date_of_death} in {person.residence.home_at_death}</p>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-terra-navy">Arrival in NT:</span>
                      <p className="text-terra-navy/70">{new Date(person.migration.date_of_arrival_nt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-terra-navy">Occupation:</span>
                      <p className="text-terra-navy/70">{person.occupation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-terra-navy">
                    <FileText className="w-5 h-5" />
                    Additional Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-terra-navy/80 leading-relaxed">{person.additional_notes}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-terra-navy">
                    <Users className="w-5 h-5" />
                    Family
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-terra-navy">Parents:</span>
                    <p className="text-terra-navy/70">{person.family.names_of_parents}</p>
                  </div>
                  <div>
                    <span className="font-medium text-terra-navy">Children:</span>
                    <p className="text-terra-navy/70">{person.family.names_of_children}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-terra-navy">
                    <Calendar className="w-5 h-5" />
                    Naturalization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-terra-navy">Date:</span>
                      <p className="text-terra-navy/70">{new Date(person.naturalization.date_of_naturalisation).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-terra-navy">Certificate:</span>
                      <p className="text-terra-navy/70">{person.naturalization.no_of_cert}</p>
                    </div>
                    <div>
                      <span className="font-medium text-terra-navy">Issued at:</span>
                      <p className="text-terra-navy/70">{person.naturalization.issued_at}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MigrantDetails;
