
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const mockResults = [
  {
    id: 1,
    fullName: "Giuseppe Rossi",
    birthYear: 1925,
    arrivalYear: 1951,
    region: "Veneto",
    settlement: "Darwin",
    occupation: "Construction Worker",
    hasPhoto: true
  },
  {
    id: 2,
    fullName: "Maria Benedetti",
    birthYear: 1930,
    arrivalYear: 1955,
    region: "Sicily",
    settlement: "Katherine",
    occupation: "Seamstress",
    hasPhoto: false
  },
  {
    id: 3,
    fullName: "Antonio Lombardi",
    birthYear: 1928,
    arrivalYear: 1950,
    region: "Calabria",
    settlement: "Tennant Creek",
    occupation: "Mining Engineer",
    hasPhoto: true
  },
  {
    id: 4,
    fullName: "Elena Martini",
    birthYear: 1932,
    arrivalYear: 1958,
    region: "Tuscany",
    settlement: "Alice Springs",
    occupation: "Teacher",
    hasPhoto: false
  }
];

const SearchResults = () => {
  const navigate = useNavigate();

  const handleResultClick = (id: number) => {
    navigate(`/migrant/${id}`);
  };

  return (
    <section className="py-16 bg-terra-beige/10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-terra-navy mb-2">
            Search Results
          </h3>
          <p className="text-terra-navy/70">
            Found {mockResults.length} records matching your search criteria
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockResults.map((person) => (
            <Card 
              key={person.id}
              onClick={() => handleResultClick(person.id)}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-terra-beige/30 hover:border-terra-red/30 hover:scale-105"
            >
              <CardContent className="p-0">
                {/* Photo Section */}
                <div className="aspect-[4/3] bg-gradient-to-br from-terra-beige to-terra-beige/50 relative overflow-hidden">
                  {person.hasPhoto ? (
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb')] bg-cover bg-center opacity-70">
                      <div className="w-full h-full bg-gradient-to-t from-terra-navy/40 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-16 h-16 text-terra-beige/60" />
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="font-playfair text-lg font-bold text-terra-navy group-hover:text-terra-red transition-colors">
                      {person.fullName}
                    </h4>
                    <p className="text-sm text-terra-navy/70 font-medium">
                      {person.occupation}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-terra-navy/70">
                      <Calendar className="w-4 h-4" />
                      <span>Born {person.birthYear} • Arrived {person.arrivalYear}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-terra-navy/70">
                      <MapPin className="w-4 h-4" />
                      <span>From {person.region} to {person.settlement}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Badge 
                      variant="outline" 
                      className="border-terra-green text-terra-green text-xs"
                    >
                      {person.region}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="border-terra-navy text-terra-navy text-xs"
                    >
                      {person.settlement}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-terra-navy/70 mb-4">
            Showing 4 of 1,200+ records
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="outline" className="border-terra-red text-terra-red">
              Page 1 of 300
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
