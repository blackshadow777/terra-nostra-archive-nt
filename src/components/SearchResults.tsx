
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "@/hooks/useSearch";
import { SearchFilters } from "@/types";

interface SearchResultsProps {
  searchData: SearchFilters;
  showResults: boolean;
}

const SearchResults = ({ searchData, showResults }: SearchResultsProps) => {
  const navigate = useNavigate();
  const { results, isLoading, hasSearched, search } = useSearch();

  React.useEffect(() => {
    if (showResults) {
      search(searchData);
    }
  }, [showResults, searchData, search]);

  const handleResultClick = (id: number) => {
    navigate(`/migrant/${id}`);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-terra-beige/10">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-terra-red" />
          <p className="text-terra-navy/70">Searching archive...</p>
        </div>
      </section>
    );
  }

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
            {results.slice(0, 4).map((person) => (
              <Card 
                key={person.person_id}
                onClick={() => handleResultClick(person.person_id)}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-terra-beige/30 hover:border-terra-red/30 hover:scale-105"
              >
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-terra-beige to-terra-beige/50 relative overflow-hidden">
                    {person.has_photo ? (
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
                        <span>Born {person.date_of_birth} • Arrived {new Date(person.migration.date_of_arrival_nt).getFullYear()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-terra-navy/70">
                        <MapPin className="w-4 h-4" />
                        <span>From {person.place_of_birth} to {person.residence.town_or_city}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Badge 
                        variant="outline" 
                        className="border-terra-green text-terra-green text-xs"
                      >
                        {person.place_of_birth.split(',').pop()?.trim() || 'Italy'}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="border-terra-navy text-terra-navy text-xs"
                      >
                        {person.residence.town_or_city}
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
            Found {results.length} records matching your search criteria
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-terra-navy/70 text-lg">No records found matching your search criteria.</p>
            <p className="text-terra-navy/50 mt-2">Try adjusting your search filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((person) => (
              <Card 
                key={person.person_id}
                onClick={() => handleResultClick(person.person_id)}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-terra-beige/30 hover:border-terra-red/30 hover:scale-105"
              >
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-terra-beige to-terra-beige/50 relative overflow-hidden">
                    {person.has_photo ? (
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
                        <span>Born {person.date_of_birth} • Arrived {new Date(person.migration.date_of_arrival_nt).getFullYear()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-terra-navy/70">
                        <MapPin className="w-4 h-4" />
                        <span>From {person.place_of_birth} to {person.residence.town_or_city}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Badge 
                        variant="outline" 
                        className="border-terra-green text-terra-green text-xs"
                      >
                        {person.place_of_birth.split(',').pop()?.trim() || 'Italy'}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="border-terra-navy text-terra-navy text-xs"
                      >
                        {person.residence.town_or_city}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
