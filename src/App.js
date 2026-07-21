import React, { useEffect, useRef, useState } from "react";

const asset = (name) => `${process.env.PUBLIC_URL}/assets/${name}?v=20260701`;
const galleryAsset = (name, version) =>
  `${process.env.PUBLIC_URL}/assets/gallery/${name}?v=${version}`;

const heroSlides = [
  { image: asset("Valle.jpg"), alt: "Valle Bodegón Silvestre" },
  { image: asset("Gauss.jpg"), alt: "Gauss Bodegón Silvestre" },
];

const venuePhotos = [
  {
    name: "SALÓN PRINCIPAL",
    image: asset("salon.jpg"),
    alt: "Salón principal de Bodegón Silvestre",
  },
  {
    name: "NUESTRA GALERIA",
    image: asset("asado.jpg"),
    alt: "Galeria de Bodegón Silvestre",
  },
  {
    name: "EL BODEGÓN",
    image: asset("salon2.jpg"),
    alt: "Ambiente de Bodegón Silvestre",
  },
];

const testimonials = [
  {
    quote: "El ambiente más silvestre y acogedor de Córdoba. Siempre volvemos.",
    initials: "MG",
    name: "María G."
  },
  {
    quote: "La milanesa más generosa de toda la ciudad. Un clásico que no puede faltar.",
    initials: "DR",
    name: "Diego R."
  },
  {
    quote: "Ideal para sobremesas largas. No te apuran, al contrario.",
    initials: "PV",
    name: "Patricia V."
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const galleryTrackRef = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/assets/gallery/manifest.json`, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error("No se pudo cargar la galería");
        return response.json();
      })
      .then((items) =>
        setGalleryItems(
          items.map((item) => ({
            name: item.name,
            image: galleryAsset(item.filename, item.version),
            alt: item.name,
          }))
        )
      )
      .catch(() => setGalleryItems([]));
  }, []);

  useEffect(() => {
    if (!selectedGalleryItem) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedGalleryItem(null);
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedGalleryItem]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const scrollGallery = (direction) => {
    galleryTrackRef.current?.scrollBy({
      left: direction * 352,
      behavior: "smooth",
    });
  };

  return (
    <main>
      <header className="site-header">
        <button
          className="logo-button"
          onClick={() => scrollTo("inicio")}
          aria-label="Volver al inicio"
        >
          <img src={asset("logo.png")} alt="Bodegón Silvestre" />
        </button>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>

        <nav
          className={menuOpen ? "nav-links open" : "nav-links"}
          aria-label="Navegación principal"
        >
          <button onClick={() => scrollTo("menu")}>Menú</button>
          <button onClick={() => scrollTo("galeria")}>Galería</button>
          <button onClick={() => scrollTo("contacto")}>Contacto</button>
        </nav>

        <button
          className="button button-primary header-cta"
          onClick={() => scrollTo("reserva")}
        >
          Reservar mesa
        </button>
      </header>

      <a
        className="button button-primary floating-benefits"
        href="https://forms.gle/VHzx1WMaNGMp9ixR8"
        target="_blank"
        rel="noreferrer"
      >
        QUIERO BENEFICIOS
      </a>

      <section className="hero" id="inicio">
        <div className="hero-content wrap">
          <div className="hero-text">
            <p className="eyebrow hero-eyebrow">CÓRDOBA · AV. GAUSS 5795</p>
            <h1>
              Perfectamente
              <br />
              imperfecto.
            </h1>
            <p className="hero-copy">
              Cocina con alma, animales con carácter. Un bodegón donde quedarse
              y quedarse un poco más.
            </p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href="https://growbrands.net/neworder/silvestre/"
                target="_blank"
                rel="noreferrer"
              >
                Nuestra carta 🌱
              </a>
              <button
                className="button button-outline"
                onClick={() => scrollTo("reserva")}
              >
                Reservar mesa
              </button>
            </div>
          </div>

          <div className="hero-slider" aria-label="Galería destacada">
            {heroSlides.map((slide, index) => (
              <img
                className={index === heroSlide ? "active" : ""}
                src={slide.image}
                alt={slide.alt}
                key={slide.image}
              />
            ))}
            <div className="hero-slider-controls">
              {heroSlides.map((slide, index) => (
                <button
                  className={index === heroSlide ? "active" : ""}
                  onClick={() => setHeroSlide(index)}
                  aria-label={`Ver imagen ${index + 1}`}
                  aria-current={index === heroSlide ? "true" : undefined}
                  key={slide.image}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Datos del restaurante">
        <div>
          <strong>3</strong>
          <span>AMBIENTES</span>
        </div>
        <div>
          <strong>180</strong>
          <span>CUBIERTOS</span>
        </div>
        <div>
          <strong>4.5★</strong>
          <span>EN GOOGLE</span>
        </div>
      </section>

      <section className="menu-section light-section" id="menu">
        <div className="wrap featured-wrap">
          <div className="section-heading">
            <h2>Los destacados</h2>
            <a
              href="https://growbrands.net/neworder/silvestre/"
              target="_blank"
              rel="noreferrer"
            >
              Nuestra carta 🌱 →
            </a>
          </div>
          <div className="featured-carousel">
            <button
              className="carousel-arrow carousel-arrow-left"
              onClick={() => scrollGallery(-1)}
              aria-label="Ver fotos anteriores"
            >
              ←
            </button>
            <div className="featured-track" ref={galleryTrackRef}>
              {galleryItems.map((item) => (
                <button
                  className="polaroid-card"
                  onClick={() => setSelectedGalleryItem(item)}
                  aria-label={`Ampliar ${item.name}`}
                  key={item.image}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    onError={() =>
                      setGalleryItems((currentItems) =>
                        currentItems.filter(
                          (currentItem) => currentItem.image !== item.image,
                        ),
                      )
                    }
                  />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
            <button
              className="carousel-arrow carousel-arrow-right"
              onClick={() => scrollGallery(1)}
              aria-label="Ver fotos siguientes"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {selectedGalleryItem && (
        <div
          className="gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selectedGalleryItem.name}
          onClick={() => setSelectedGalleryItem(null)}
        >
          <button
            className="gallery-modal-close"
            onClick={() => setSelectedGalleryItem(null)}
            aria-label="Cerrar imagen ampliada"
          >
            ×
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img
              src={selectedGalleryItem.image}
              alt={selectedGalleryItem.alt}
            />
            <figcaption>{selectedGalleryItem.name}</figcaption>
          </figure>
        </div>
      )}

      <section className="identity">
        <div className="wrap identity-content">
          <p className="eyebrow">NUESTRA IDENTIDAD</p>
          <h2>
            La jungla también
            <br />
            toma asiento.
          </h2>
          <p>
            Animales libres, ambiente silvestre.
            <br />
            Bienvenidos a la manada.
          </p>
        </div>
      </section>

      <section className="gallery-section" id="galeria">
        <div className="wrap">
          <div className="section-heading dark-heading">
            <h2>El Bodegón</h2>
            {/* <a href="#reserva">Ver más →</a> */}
          </div>
          <div className="gallery-grid">
            {venuePhotos.map((photo, index) => (
              <button
                className={
                  index === 0 ? "gallery-photo gallery-main" : "gallery-photo"
                }
                onClick={() => setSelectedGalleryItem(photo)}
                aria-label={`Ampliar ${photo.name}`}
                key={photo.image}
              >
                <img src={photo.image} alt={photo.alt} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="reservation" id="reserva">
        <div className="wrap narrow">
          <h2>Reservá tu mesa</h2>
          <p>Escribinos por WhatsApp y coordinamos tu reserva.</p>
          <div className="reservation-actions">
            <a
              className="button button-primary"
              href="https://wa.me/5493518613655?text=Hola%2C%20quisiera%20reservar%20una%20mesa."
              target="_blank"
              rel="noreferrer"
            >
              RESERVAR POR WHATSAPP
            </a>
          </div>
        </div>
      </section>

      <section className="contact light-section" id="contacto">
        <div className="wrap contact-grid">
          <div className="contact-copy">
            <h2>Cómo llegar</h2>
            <div>
              <p className="eyebrow">DIRECCIÓN</p>
              <p>
                Av. Carlos F. Gauss 5795
                <br />
                Córdoba, Argentina
              </p>
            </div>
            <div>
              <p className="eyebrow">HORARIOS</p>
              <p>
                Lun–Vie · 12:00–15:30 / 20:00–24:00
                <br />
                Sáb–Dom · 12:00–16:00 / 20:00–01:00
              </p>
            </div>
            <div>
              <p className="eyebrow">TELÉFONO</p>
              <a href="tel:+543518613655">+54 351 861-3655</a>
            </div>
            <div>
              <p className="eyebrow">SERVICIOS</p>
              <p>Asientos al aire libre</p>
            </div>
          </div>
          <div className="map-container">
            <iframe
              title="Ubicación de Savana Bodegón Silvestre"
              src="https://www.google.com/maps?q=Av.%20Carlos%20F.%20Gauss%205795%2C%20C%C3%B3rdoba%2C%20Argentina&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              className="map-link"
              href="https://maps.app.goo.gl/c6tGYo77bKGCDENW9"
              target="_blank"
              rel="noreferrer"
            >
              Abrir en Google Maps →
            </a>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="wrap">
          <h2>Lo que dicen</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.name}>
                <div className="quote">“</div>
                <p>{testimonial.quote}</p>
                <div className="person">
                  <span className="avatar">{testimonial.initials}</span>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span className="stars">★★★★★</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <img src={asset("footer-logo.png")} alt="Silvestre" />
        <p>© 2024 Bodegón Silvestre · Córdoba</p>
        <div>
          <a
            href="https://www.instagram.com/bodegonsilvestre/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61587026065838"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>
      </footer>
    </main>
  );
}

export default App;
