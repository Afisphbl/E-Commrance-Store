import { MoveRight } from "lucide-react";
import HeroImage from "../../assets/products-img.png";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <section className="container hero-content">
          <div className="hero-text">
            <h1>Discover Premium Eco-Friendly Products</h1>
            <p>
              Shop the best quality items with sustainable materials. Upgrade
              your lifestyle today with our exclusive collection.
            </p>

            <button className="hero-cta btn-primary">
              <span>Shop Now</span>
              <MoveRight size={20} />
            </button>
          </div>
          <div className="hero-image">
            <img src={HeroImage} alt="Eco-Friendly Products" />
          </div>
        </section>
      </header>
    </div>
  );
}

export default Home;
