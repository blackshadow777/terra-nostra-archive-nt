
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { SearchFilters } from "@/types";

interface SearchInterfaceProps {
  onSearch: (searchData: SearchFilters) => void;
}

const SearchInterface = ({ onSearch }: SearchInterfaceProps) => {
  const [searchForm, setSearchForm] = useState<SearchFilters>({
    firstName: "",
    lastName: "",
    yearFrom: "",
    yearTo: "",
    region: "",
    settlement: ""
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [fullNameSearch, setFullNameSearch] = useState("");

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    // Trim spaces from the end of the input
    const trimmedValue = value.trimEnd();
    setSearchForm(prev => ({ ...prev, [field]: trimmedValue }));
  };

  const handleFullNameChange = (value: string) => {
    // Trim spaces from the end of the input
    const trimmedValue = value.trimEnd();
    setFullNameSearch(trimmedValue);
    
    // Split full name into first and last name
    const nameParts = trimmedValue.split(' ');
    if (nameParts.length >= 2) {
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      setSearchForm(prev => ({ 
        ...prev, 
        firstName: firstName,
        lastName: lastName 
      }));
    } else if (nameParts.length === 1) {
      setSearchForm(prev => ({ 
        ...prev, 
        firstName: nameParts[0],
        lastName: "" 
      }));
    }
  };

  const handleSearch = () => {
    // Final trim on all fields before searching
    const trimmedSearchData = Object.keys(searchForm).reduce((acc, key) => {
      acc[key as keyof SearchFilters] = searchForm[key as keyof SearchFilters].trim();
      return acc;
    }, {} as SearchFilters);
    
    console.log("Searching with:", trimmedSearchData);
    onSearch(trimmedSearchData);
  };

  const handleClearFilters = () => {
    setSearchForm({
      firstName: "",
      lastName: "",
      yearFrom: "",
      yearTo: "",
      region: "",
      settlement: ""
    });
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
            {/* Simple Full Name Search */}
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
                      <Label htmlFor="firstName" className="text-terra-navy font-medium">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={searchForm.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="e.g., Giuseppe"
                        className="border-terra-beige focus:border-terra-red"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-terra-navy font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={searchForm.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="e.g., Rossi"
                        className="border-terra-beige focus:border-terra-red"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="region" className="text-terra-navy font-medium">
                        Italian Region
                      </Label>
                      <Input
                        id="region"
                        value={searchForm.region}
                        onChange={(e) => handleInputChange("region", e.target.value)}
                        placeholder="e.g., Veneto, Sicily"
                        className="border-terra-beige focus:border-terra-red"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearFrom" className="text-terra-navy font-medium">
                        Arrival Year (From)
                      </Label>
                      <Input
                        id="yearFrom"
                        type="number"
                        value={searchForm.yearFrom}
                        onChange={(e) => handleInputChange("yearFrom", e.target.value)}
                        placeholder="1920"
                        min="1800"
                        max="2000"
                        className="border-terra-beige focus:border-terra-red"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearTo" className="text-terra-navy font-medium">
                        Arrival Year (To)
                      </Label>
                      <Input
                        id="yearTo"
                        type="number"
                        value={searchForm.yearTo}
                        onChange={(e) => handleInputChange("yearTo", e.target.value)}
                        placeholder="1980"
                        min="1800"
                        max="2000"
                        className="border-terra-beige focus:border-terra-red"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="settlement" className="text-terra-navy font-medium">
                        NT Settlement
                      </Label>
                      <Input
                        id="settlement"
                        value={searchForm.settlement}
                        onChange={(e) => handleInputChange("settlement", e.target.value)}
                        placeholder="e.g., Darwin, Katherine"
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
