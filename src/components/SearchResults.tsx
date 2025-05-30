
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Extended mock data with more entries and similar names
const allMockResults = [
  {
    id: 1,
    fullName: "Giuseppe Rossi",
    firstName: "Giuseppe",
    lastName: "Rossi",
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
    firstName: "Maria",
    lastName: "Benedetti",
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
    firstName: "Antonio",
    lastName: "Lombardi",
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
    firstName: "Elena",
    lastName: "Martini",
    birthYear: 1932,
    arrivalYear: 1958,
    region: "Tuscany",
    settlement: "Alice Springs",
    occupation: "Teacher",
    hasPhoto: false
  },
  {
    id: 5,
    fullName: "Giuseppe Benedetti",
    firstName: "Giuseppe",
    lastName: "Benedetti",
    birthYear: 1920,
    arrivalYear: 1948,
    region: "Sicily",
    settlement: "Darwin",
    occupation: "Fisherman",
    hasPhoto: true
  },
  {
    id: 6,
    fullName: "Maria Rossi",
    firstName: "Maria",
    lastName: "Rossi",
    birthYear: 1933,
    arrivalYear: 1956,
    region: "Veneto",
    settlement: "Katherine",
    occupation: "Nurse",
    hasPhoto: false
  },
  {
    id: 7,
    fullName: "Franco Lombardi",
    firstName: "Franco",
    lastName: "Lombardi",
    birthYear: 1935,
    arrivalYear: 1960,
    region: "Calabria",
    settlement: "Darwin",
    occupation: "Chef",
    hasPhoto: true
  },
  {
    id: 8,
    fullName: "Giuseppe Martini",
    firstName: "Giuseppe",
    lastName: "Martini",
    birthYear: 1927,
    arrivalYear: 1952,
    region: "Tuscany",
    settlement: "Alice Springs",
    occupation: "Carpenter",
    hasPhoto: false
  }
];

interface SearchResultsProps {
  searchData: any;
  showResults: boolean;
}

const SearchResults = ({ searchData, showResults }: SearchResultsProps) => {
  const navigate = useNavigate();

  const handleResultClick = (id: number) => {
    navigate(`/migrant/${id}`);
  };

  const filterResults = (data: any) => {
    if (!showResults) return [];
    
    return allMockResults.filter(person => {
      const matchesFirstName = !data.firstName || 
        person.firstName.toLowerCase().includes(data.firstName.toLowerCase());
      
      const matchesLastName = !data.lastName || 
        person.lastName.toLowerCase().includes(data.lastName.toLowerCase());
      
      const matchesRegion = !data.region || 
        person.region.toLowerCase().includes(data.region.toLowerCase());
      
      const matchesSettlement = !data.settlement || 
        person.settlement.toLowerCase().includes(data.settlement.toLowerCase());
      
      const matchesYearFrom = !data.yearFrom || 
        person.arrivalYear >= parseInt(data.yearFrom);
      
      const matchesYearTo = !data.yearTo || 
        person.arrivalYear <= parseInt(data.yearTo);

      return matchesFirstName && matchesLastName && matchesRegion && 
             matchesSettlement && matchesYearFrom && matchesYearTo;
    });
  };

  const filteredResults = filterResults(searchData);

  if (!showResults) {
    return (
      <section className="py-16 bg-terra-beige/10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-terra-navy mb-4">
            Featured Records
          </h3>
          <p className="text-terra-navy/70 mb-8">
            Discover the stories of Italian migrants who helped build the Northern Territory
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allMockResults.slice(0, 4).map((person) => (
              <Card 
                key={person.id}
                onClick={() => handleResultClick(person.id)}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-terra-beige/30 hover:border-terra-red/30 hover:scale-105"
              >
                <CardContent className="p-0">
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
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-terra-beige/10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-terra-navy mb-2">
            Search Results
          </h3>
          <p className="text-terra-navy/70">
            Found {filteredResults.length} records matching your search criteria
          </p>
        </div>

        {filteredResults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-terra-navy/70 text-lg">No records found matching your search criteria.</p>
            <p className="text-terra-navy/50 mt-2">Try adjusting your search filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResults.map((person) => (
              <Card 
                key={person.id}
                onClick={() => handleResultClick(person.id)}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-terra-beige/30 hover:border-terra-red/30 hover:scale-105"
              >
                <CardContent className="p-0">
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
        )}

        {filteredResults.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-terra-navy/70 mb-4">
              Showing {filteredResults.length} of {allMockResults.length} total records
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
