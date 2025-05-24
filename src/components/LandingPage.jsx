import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './LandingPage.css'; // For slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

const LandingPage = ({ products }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // This is correct!
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [instagramPosts, setInstagramPosts] = useState([]);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch('/file.json'); // file is directly under public/
        const data = await response.json();
  
        const posts = data.map((item, index) => ({
          image: `downloaded_images/post_${index + 1}.jpeg`, // correct folder path
          postlink: item.post_url
        }));
  
        setInstagramPosts(posts);
      } catch (error) {
        console.error('Error loading Instagram posts:', error);
      }
    };
  
    fetchInstagramPosts();
  }, []);
  console.log(instagramPosts); // Check the loaded posts in the console

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
         

  return (
    <div className="landing-page">
      {/* Hero Section */}
     <header className="hero-section">
  <img src="/imagess1/IMG-20250524-WA0049.jpg" alt="Art Background" className="hero-bg" />
  <div className="hero-content">
    <h1 className="hero-title">Welcome to Art World</h1>
    <p className="hero-subtitle">Discover unique and inspiring artwork from talented artists.</p>
    <button className="cta-button">Explore Now</button>
  </div>
</header>


      {/* Product Slider Section */}
      <section className="product-slider">
        <h2 className="section-title">Featured Products</h2>
        <Slider {...sliderSettings}>
          {products.slice(0, 4).map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="featured-product-link"
              style={{ textDecoration: "none" }}
            >
              <div className="featured-product-card">
                <img src={product.image} alt={product.name} className="featured-product-image" />
                <h3 className="featured-product-name">{product.name}</h3>
              </div>
            </Link>
          ))}
        </Slider>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to="/products">
            <button className="cta-button">Show More</button>
          </Link>
        </div>
      </section>

      {/* Instagram Slider Section */}
      <div className="slider-container">
      <h2 className='section-title'> Instagram Gallery</h2><br />
      <Slider {...settings}>
        {instagramPosts.map((post, i) => (
          <div key={i} className="slide-item">
            <a href={post.postlink} target="_blank" rel="noopener noreferrer">
              <img src={post.image} alt={`Post ${i + 1}`} />
            </a>
          </div>
        ))}
      </Slider>
    </div>



      {/* About the Artist Section */}
      <section className="about-artist">
  <h2 className="section-title">About Comrade Husnain</h2>
  <p className="about-description">
    Comrade Husnain (Husnain Jamil Faridi) is a Lahore-based artist, Urdu calligrapher, writer, and political activist. His work blends revolutionary and romantic content with classical calligraphic elegance, rooted in the painter-style tradition of South Asia. His art is raw, expressive, and speaks directly to the masses about truth, dignity, and struggle.
  </p>
  <div style={{ textAlign: "center", marginTop: "1rem" }}>
    <Link to="/about">
      <button className="cta-button">Read More</button>
    </Link>
  </div>
</section>

      {/* Gallery Section */}
      <section className="gallery">
  <h2 className="section-title">Gallery</h2>
  <div className="gallery-grid">
    <img src="/imagess1/IMG-20250524-WA0049.jpg" alt="Gallery Art 1" className="gallery-item" />
    <img src="/imagess1/IMG-20250524-WA0050.jpg" alt="Gallery Art 2" className="gallery-item" />
    <img src="/imagess1/IMG-20250524-WA0051.jpg" alt="Gallery Art 3" className="gallery-item" />
    <img src="/imagess1/IMG-20250524-WA0052.jpg" alt="Gallery Art 4" className="gallery-item" />
    {/* Add more images as needed */}
  </div>
</section>

      {/* Testimonials Section */}
      <section className="testimonials">
  <h2 className="section-title">What People Say</h2>
  <div className="testimonial-grid">
    <div className="testimonial-card">
      <p>"Alex's artwork is truly inspiring. The attention to detail and creativity are unmatched!"</p>
      <h4>- Sarah Johnson</h4>
    </div>
    <div className="testimonial-card">
      <p>"I purchased a painting from Alex, and it has completely transformed my living room. Highly recommend!"</p>
      <h4>- Michael Brown</h4>
    </div>
    <div className="testimonial-card">
      <p>"Comrade Husnain's calligraphy brings poetry and revolution together. A rare and beautiful talent."</p>
      <h4>- Fatima Noor</h4>
    </div>
    <div className="testimonial-card">
      <p>"The passion and message in every piece is powerful. His art speaks to the heart and mind."</p>
      <h4>- Usman Ali</h4>
    </div>
  </div>
</section>

      {/* Footer Section */}
      <footer className="site-footer">
  <div className="footer-content">
    <div className="footer-brand">
      <span className="footer-title">Comrade Husnain</span>
    </div>
    <div className="footer-links">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </div>
    <div className="footer-social">
      <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      <a href="mailto:Husnainjamilfaridi@gmail.com"><FaEnvelope /></a>
    </div>
  </div>
  <div className="footer-bottom">
    © {new Date().getFullYear()} Art World. All rights reserved.
  </div>
</footer>
    </div>
  );
};

export default LandingPage;