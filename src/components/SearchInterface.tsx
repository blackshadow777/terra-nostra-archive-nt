
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { SearchFilters } from "@/types";
import { sanitizeFilters, parseFullName } from "@/utils/textUtils";

interface SearchInterfaceProps {
  onSearch: (searchData: SearchFilters) => void;
}

const SearchInterface = ({ onSearch }: SearchInterfaceProps) => {
  const [searchForm, setSearchForm] = useState<SearchFilters>({
    fullName: "",
    christian_name: "",
    surname: "",
    date_of_birth: "",
    date_of_arrival_nt: "",
    place_of_birth: "",
    town_or_city: "",
    occupation: ""
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [fullNameSearch, setFullNameSearch] = useState("");

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setSearchForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFullNameChange = (value: string) => {
    setFullNameSearch(value);
    
    // Parse full name and update individual name fields
    const { christian_name, surname } = parseFullName(value);
    setSearchForm(prev => ({ 
      ...prev, 
      fullName: value,
      christian_name,
      surname 
    }));
  };

  const handleSearch = () => {
    // Sanitize all filters before searching
    const sanitizedFilters = sanitizeFilters(searchForm);
    console.log("Searching with:", sanitizedFilters);
    onSearch(sanitizedFilters);
  };

  const handleClearFilters = () => {
    const emptyFilters: SearchFilters = {
      fullName: "",
      christian_name: "",
      surname: "",
      date_of_birth: "",
      date_of_arrival_nt: "",
      place_of_birth: "",
      town_or_city: "",
      occupation: ""
    };
    setSearchForm(emptyFilters);
    setFullNameSearch("");
  };

  return (
    <section id="search" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="font-playfair text-3xl lg:text-4xl font-bold text-terra-navy mb-4">
            Search the Archive
          </h3>
          <p className="text-lg text-terra-navy/70 max-w-2xl mx-auto">
            Use our advanced search to find Italian migrants by name, year of arrival, 
            region of origin, or settlement location in the Northern Territory.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg border-terra-beige/30">
          <CardHeader className="bg-gradient-to-r from-terra-beige/30 to-terra-beige/10">
            <CardTitle className="flex items-center gap-2 text-terra-navy">
              <Search className="w-5 h-5" />
              Search Archive
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Quick Full Name Search */}
            <div className="mb-6">
              <Label htmlFor="fullName" className="text-terra-navy font-medium text-lg mb-3 block">
                Quick Search by Full Name
              </Label>
              <div className="flex gap-4">
                <Input
                  id="fullName"
                  value={fullNameSearch}
                  onChange={(e) => handleFullNameChange(e.target.value)}
                  placeholder="e.g., Giuseppe Rossi"
                  className="border-terra-beige focus:border-terra-red flex-1 text-lg py-3"
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-terra-red hover:bg-terra-red/90 text-white px-8 py-3 font-semibold"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="border-t border-terra-beige pt-6">
              <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between border-terra-navy text-terra-navy hover:bg-terra-navy hover:text-white mb-4"
                  >
                    <span className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Advanced Search Filters
                    </span>
                    {showAdvancedFilters ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="christian_name" className="text-terra-navy font-medium">
                        First Name
                      </Label>
                      <Input
                        id="christian_name"
                        value={searchForm.christian_name}
                        onChange={(e) => handleInputChange("christian_name", e.target.value)}
                        placeholder="e.g., Giuseppe"
                        className="border-terra-beige focus:border-terra-red"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="surname" className="text-terra-navy font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="surname"
                        value={searchForm.surname}
                        onChange={(e) => handleInputChange("surname", e.target.value)}
                        placeholder="e.g., Rossi"
                        className="border-terra-beige focus:border-terra-red"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="place_of_birth" className="text-terra-navy font-medium">
                        Place of Birth
                      </Label>
                      <Input
                        id="place_of_birth"
                        value={searchForm.place_of_birth}
                        onChange={(e) => handleInputChange("place_of_birth", e.target.value)}
                        placeholder="e.g., Venice, Italy"
                        className="border-terra-beige focus:border-terra-red"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date_of_birth" className="text-terra-navy font-medium">
                        Birth Year
                      </Label>
                      <Input
                        id="date_of_birth"
                        type="number"
                        value={searchForm.date_of_birth}
                        onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
                        placeholder="1925"
                        min="1800"
                        max="2000"
                        className="border-terra-beige focus:border-terra-red"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date_of_arrival_nt" className="text-terra-navy font-medium">
                        Arrival Date (NT)
                      </Label>
                      <Input
                        id="date_of_arrival_nt"
                        type="date"
                        value={searchForm.date_of_arrival_nt}
                        onChange={(e) => handleInputChange("date_of_arrival_nt", e.target.value)}
                        className="border-terra-beige focus:border-terra-red"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="town_or_city" className="text-terra-navy font-medium">
                        NT Settlement
                      </Label>
                      <Input
                        id="town_or_city"
                        value={searchForm.town_or_city}
                        onChange={(e) => handleInputChange("town_or_city", e.target.value)}
                        placeholder="e.g., Darwin, Katherine"
                        className="border-terra-beige focus:border-terra-red"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="occupation" className="text-terra-navy font-medium">
                        Occupation
                      </Label>
                      <Input
                        id="occupation"
                        value={searchForm.occupation}
                        onChange={(e) => handleInputChange("occupation", e.target.value)}
                        placeholder="e.g., Construction Worker"
                        className="border-terra-beige focus:border-terra-red"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-terra-beige">
                    <Button 
                      onClick={handleSearch}
                      className="bg-terra-red hover:bg-terra-red/90 text-white px-8 py-3 font-semibold flex-1 sm:flex-none"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Search Archive
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleClearFilters}
                      className="border-terra-navy text-terra-navy hover:bg-terra-navy hover:text-white"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SearchInterface;
