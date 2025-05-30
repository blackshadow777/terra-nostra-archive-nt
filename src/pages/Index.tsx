
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchInterface from "@/components/SearchInterface";
import SearchResults from "@/components/SearchResults";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchData, setSearchData] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (data: any) => {
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
