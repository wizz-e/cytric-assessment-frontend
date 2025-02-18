import MintForm from "./components/mint-form";
import Gallary from "./components/gallary";
import { HeroSection } from "./components/hero-section";
import Header from "./components/header";

export default function App() {
  return (
    <main className="min-h-screen pb-6   bg-gradient-to-r  from-[#000000] to-[#111827]">
      <Header />
      <div className="max-w-7xl mx-auto p-6 space-y-5">
        <HeroSection />
        <MintForm />
        <Gallary />
      </div>
    </main>
  );
}
