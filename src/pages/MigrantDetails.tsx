
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, User, Users, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock detailed data
const mockMigrantData = {
  1: {
    id: 1,
    fullName: "Giuseppe Rossi",
    firstName: "Giuseppe",
    lastName: "Rossi",
    birthYear: 1925,
    birthPlace: "Venice, Veneto, Italy",
    deathYear: 1995,
    arrivalYear: 1951,
    region: "Veneto",
    settlement: "Darwin",
    occupation: "Construction Worker",
    mainPhoto: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    photos: [
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    ],
    biography: "Giuseppe Rossi arrived in Darwin in 1951 as part of the post-war migration wave. He worked on major construction projects including the rebuilding of Darwin after Cyclone Tracy.",
    family: {
      parents: "Antonio Rossi, Maria Venetian",
      children: "Carlo Rossi, Anna Rossi-Smith"
    },
    naturalization: {
      date: "1956-03-15",
      certificate: "NAT-1956-0234",
      issuedAt: "Darwin"
    },
    residence: {
      townOrCity: "Darwin",
      homeAtDeath: "15 Cavenagh Street, Darwin"
    }
  }
};

const MigrantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const migrant = mockMigrantData[id as keyof typeof mockMigrantData];
  
  if (!migrant) {
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
          {/* Back Button */}
          <Button 
            onClick={() => navigate("/")} 
            variant="outline"
            className="mb-6 border-terra-navy text-terra-navy hover:bg-terra-navy hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Photo and Gallery */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-[3/4] bg-gradient-to-br from-terra-beige to-terra-beige/50 overflow-hidden rounded-t-lg">
                    <img 
                      src={migrant.mainPhoto} 
                      alt={migrant.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Photo Gallery */}
                  {migrant.photos.length > 1 && (
                    <div className="p-4">
                      <h4 className="font-semibold text-terra-navy mb-3">Photo Gallery</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {migrant.photos.slice(1).map((photo, index) => (
                          <div key={index} className="aspect-square bg-terra-beige/30 rounded overflow-hidden">
                            <img 
                              src={photo} 
                              alt={`${migrant.fullName} ${index + 2}`}
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

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-terra-navy mb-2">
                  {migrant.fullName}
                </h1>
                <p className="text-lg text-terra-navy/70 mb-4">{migrant.occupation}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-terra-red text-white">
                    {migrant.region}
                  </Badge>
                  <Badge variant="outline" className="border-terra-green text-terra-green">
                    {migrant.settlement}
                  </Badge>
                  <Badge variant="outline" className="border-terra-navy text-terra-navy">
                    Arrived {migrant.arrivalYear}
                  </Badge>
                </div>
              </div>

              {/* Basic Information */}
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
                      <p className="text-terra-navy/70">{migrant.birthYear} in {migrant.birthPlace}</p>
                    </div>
                    <div>
                      <span className="font-medium text-terra-navy">Death:</span>
                      <p className="text-terra-navy/70">{migrant.deathYear} in {migrant.residence.homeAtDeath}</p>
                    </div>
                    <div>
                      <span className="font-medium text-terra-navy">Arrival in NT:</span>
                      <p className="text-terra-navy/70">{migrant.arrivalYear}</p>
                    </div>
                    <div>
                      <span className="font-medium text-terra-navy">Occupation:</span>
                      <p className="text-terra-navy/70">{migrant.occupation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Biography */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-terra-navy">
                    <FileText className="w-5 h-5" />
                    Biography
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-terra-navy/80 leading-relaxed">{migrant.biography}</p>
                </CardContent>
              </Card>

              {/* Family Information */}
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
                    <p className="text-terra-navy/70">{migrant.family.parents}</p>
                  </div>
                  <div>
                    <span className="font-medium text-terra-navy">Children:</span>
                    <p className="text-terra-navy/70">{migrant.family.children}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Naturalization */}
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
                      <p className="text-terra-navy/70">{migrant.naturalization.date}</p>
                    </div>
                    <div>
                      <span className="font-medium text-terra-navy">Certificate:</span>
                      <p className="text-terra-navy/70">{migrant.naturalization.certificate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-terra-navy">Issued at:</span>
                      <p className="text-terra-navy/70">{migrant.naturalization.issuedAt}</p>
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
