
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchInterface from "@/components/SearchInterface";
import SearchResults from "@/components/SearchResults";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <SearchInterface />
        <SearchResults />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
