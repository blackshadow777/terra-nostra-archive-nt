
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchInterface from "@/components/SearchInterface";
import SearchResults from "@/components/SearchResults";
import Footer from "@/components/Footer";
import { SearchFilters } from "@/types";

const Index = () => {
  const [searchData, setSearchData] = useState<SearchFilters>({
    fullName: "",
    christian_name: "",
    surname: "",
    date_of_birth: "",
    date_of_arrival_nt: "",
    place_of_birth: "",
    town_or_city: "",
    occupation: ""
  });
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (data: SearchFilters) => {
    setSearchData(data);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <SearchInterface onSearch={handleSearch} />
        <SearchResults searchData={searchData} showResults={showResults} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
