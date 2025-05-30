import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, User, Users, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Extended mock detailed data
const mockMigrantData: Record<string, any> = {
  "1": {
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
  },
  "2": {
    id: 2,
    fullName: "Maria Benedetti",
    firstName: "Maria",
    lastName: "Benedetti",
    birthYear: 1930,
    birthPlace: "Palermo, Sicily, Italy",
    deathYear: 1998,
    arrivalYear: 1955,
    region: "Sicily",
    settlement: "Katherine",
    occupation: "Seamstress",
    mainPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    photos: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    ],
    biography: "Maria Benedetti was a skilled seamstress who opened Katherine's first tailoring shop, serving the growing Italian community.",
    family: {
      parents: "Francesco Benedetti, Rosa Sicilian",
      children: "Giuseppe Benedetti Jr., Elena Benedetti-White"
    },
    naturalization: {
      date: "1960-08-12",
      certificate: "NAT-1960-0567",
      issuedAt: "Katherine"
    },
    residence: {
      townOrCity: "Katherine",
      homeAtDeath: "23 Main Street, Katherine"
    }
  },
  "3": {
    id: 3,
    fullName: "Antonio Lombardi",
    firstName: "Antonio",
    lastName: "Lombardi",
    birthYear: 1928,
    birthPlace: "Cosenza, Calabria, Italy",
    deathYear: 1992,
    arrivalYear: 1950,
    region: "Calabria",
    settlement: "Tennant Creek",
    occupation: "Mining Engineer",
    mainPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    ],
    biography: "Antonio Lombardi was instrumental in developing mining operations in Tennant Creek, bringing European engineering expertise to the region.",
    family: {
      parents: "Michele Lombardi, Anna Calabrese",
      children: "Franco Lombardi, Lucia Lombardi-Green"
    },
    naturalization: {
      date: "1955-11-20",
      certificate: "NAT-1955-0123",
      issuedAt: "Tennant Creek"
    },
    residence: {
      townOrCity: "Tennant Creek",
      homeAtDeath: "7 Mining Avenue, Tennant Creek"
    }
  },
  "4": {
    id: 4,
    fullName: "Elena Martini",
    firstName: "Elena",
    lastName: "Martini",
    birthYear: 1932,
    birthPlace: "Florence, Tuscany, Italy",
    deathYear: 2001,
    arrivalYear: 1958,
    region: "Tuscany",
    settlement: "Alice Springs",
    occupation: "Teacher",
    mainPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc",
    photos: [
      "https://images.unsplash.com/photo-1494790108755-2616b612b5bc"
    ],
    biography: "Elena Martini established the first Italian language classes in Alice Springs and was a beloved educator for over 30 years.",
    family: {
      parents: "Giuseppe Martini, Francesca Tuscan",
      children: "Marco Martini, Sofia Martini-Brown"
    },
    naturalization: {
      date: "1963-04-18",
      certificate: "NAT-1963-0789",
      issuedAt: "Alice Springs"
    },
    residence: {
      townOrCity: "Alice Springs",
      homeAtDeath: "42 School Road, Alice Springs"
    }
  },
  "5": {
    id: 5,
    fullName: "Giuseppe Benedetti",
    firstName: "Giuseppe",
    lastName: "Benedetti",
    birthYear: 1920,
    birthPlace: "Catania, Sicily, Italy",
    deathYear: 1988,
    arrivalYear: 1948,
    region: "Sicily",
    settlement: "Darwin",
    occupation: "Fisherman",
    mainPhoto: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66",
    photos: [
      "https://images.unsplash.com/photo-1566492031773-4f4e44671d66"
    ],
    biography: "Giuseppe Benedetti pioneered modern fishing techniques in Darwin's waters and established the city's first fish market.",
    family: {
      parents: "Salvatore Benedetti, Carmela Sicilian",
      children: "Antonio Benedetti, Rosa Benedetti-Jones"
    },
    naturalization: {
      date: "1953-07-10",
      certificate: "NAT-1953-0045",
      issuedAt: "Darwin"
    },
    residence: {
      townOrCity: "Darwin",
      homeAtDeath: "8 Fisherman's Wharf, Darwin"
    }
  }
};

const MigrantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const migrant = id ? mockMigrantData[id] : null;
  
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
                    <img 
                      src={migrant.mainPhoto} 
                      alt={migrant.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {migrant.photos.length > 1 && (
                    <div className="p-4">
                      <h4 className="font-semibold text-terra-navy mb-3">Photo Gallery</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {migrant.photos.slice(1).map((photo: string, index: number) => (
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

            <div className="lg:col-span-2 space-y-6">
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
