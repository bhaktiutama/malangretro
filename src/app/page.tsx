import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Featured from "@/components/home/Featured";
import Trending from "@/components/home/Trending";
import FoodSpots from "@/components/home/FoodSpots";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      <div style={{ position: "relative", zIndex: 10, background: "var(--color-background)" }}>
        <Featured />
        <Trending />
        <FoodSpots />

        <section className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "3rem", marginBottom: "40px", color: "var(--color-primary)" }}>
            Hidden Gems
          </h2>
          <div className="retro-shadow" style={{
            background: "#fff",
            padding: "60px",
            borderRadius: "var(--radius-md)",
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "4px dashed var(--color-accent-brown)"
          }}>
            <span style={{ fontFamily: "var(--font-bebas)", fontSize: "2.5rem", color: "var(--color-accent-brown)" }}>
              Retro Map Illustration Placeholder
            </span>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
