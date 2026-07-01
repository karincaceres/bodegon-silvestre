import React, { useState } from "react";

const asset = (name) => `${process.env.PUBLIC_URL}/assets/${name}`;

const menuItems = [
  {
    name: "MILANESA SILVESTRE",
    description: "Con hongos, rúcula, tomates confitados y queso parmesano.",
    price: "",
    image: asset("milanesa.jpg"),
    alt: "MILANESA SILVESTRE",
  },
  {
    name: "ENTRAÑA AL HIERRO",
    description: "Con baba ganoush y criolla de quinoa y durazno ahumado.",
    price: "",
    image: asset("asado.jpg"),
    alt: "ENTRAÑA AL HIERRO",
  },
  {
    name: "FETUCCINI A LA CARBONARA",
    description: "Pasta casera italiana",
    price: "",
    image: asset("ravioles.jpg"),
    alt: "FETUCCINI A LA CARBONARA",
  },
  {
    name: "SILVESTRE WHITE RUSSIAN",
    description: "Vodka, borghetti y crema",
    price: "",
    image: asset("old-fashioned.jpg"),
    alt: "SILVESTRE WHITE RUSSIAN",
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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
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

      <section className="hero" id="inicio">
        <div className="hero-content wrap">
          <p className="eyebrow hero-eyebrow">CÓRDOBA · AV. GAUSS 5795</p>
          <h1>
            Perfectamente
            <br />
            imperfecto.
          </h1>
          <p className="hero-copy">
            Cocina con alma, animales con carácter. Un bodegón donde quedarse y
            quedarse un poco más.
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
          <strong>4.9★</strong>
          <span>EN GOOGLE</span>
        </div>
      </section>

      <section className="menu-section light-section" id="menu">
        <div className="wrap">
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
          <div className="menu-grid">
            {menuItems.map((item) => (
              <article className="menu-card" key={item.name}>
                <img src={item.image} alt={item.alt} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <strong>{item.price}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
            <h2>El lugar</h2>
            <a href="#reserva">Ver más →</a>
          </div>
          <div className="gallery-grid">
            <img
              className="gallery-main"
              src={asset("salon.jpg")}
              alt="Salón principal"
            />
            <img src={asset("exterior.jpg")} alt="Exterior del restaurante" />
            <img src={asset("barra.jpg")} alt="Plato servido en la barra" />
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
              Reservar por WhatsApp
            </a>
            <span className="button button-outline registration-pending">
              Registrate para recibir más info
            </span>
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
