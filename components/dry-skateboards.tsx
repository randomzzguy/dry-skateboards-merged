"use client"

import { FormEvent, useEffect, useRef, useState } from "react"

const navItems = [
  { label: "Drop", target: "drop" },
  { label: "Story", target: "story" },
  { label: "Boards", target: "boards" },
  { label: "Apparel", target: "apparel" },
]

const products = [
  {
    number: "01",
    name: "Heat Deck 8.25",
    type: "7-ply Canadian maple",
    price: "AED 350",
    image: "/assets/dryLogo.webp",
    tone: "charcoal",
  },
  {
    number: "02",
    name: "Tag Mark Tee",
    type: "Heavy cotton / oversized",
    price: "AED 180",
    image: "/assets/shirt.jpg",
    tone: "cream",
  },
  {
    number: "03",
    name: "Dry Carryall",
    type: "Daily street utility",
    price: "AED 120",
    image: "/assets/bags.jpg",
    tone: "heat",
  },
]

const colorCells = [
  { name: "Concrete", hex: "#302f2b", className: "identity-card--charcoal" },
  { name: "Heat", hex: "#d92b12", className: "identity-card--red" },
  { name: "Paper", hex: "#f4f0e5", className: "identity-card--paper" },
  { name: "Night", hex: "#11100e", className: "identity-card--black" },
]

function scrollTo(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export default function DrySkateboards() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [selectedSize, setSelectedSize] = useState('8.25"')
  const [emailState, setEmailState] = useState<"idle" | "sent">("idle")
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 28)
      setProgress(max > 0 ? window.scrollY / max : 0)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -5%" },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const handleHeroMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    event.currentTarget.style.setProperty("--mouse-x", x.toFixed(3))
    event.currentTarget.style.setProperty("--mouse-y", y.toFixed(3))
  }

  const addToBag = () => setCartCount((count) => count + 1)

  const submitEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEmailState("sent")
  }

  return (
    <main className="site-shell">
      <div className="paper-grain" aria-hidden="true" />
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <button className="wordmark" onClick={() => scrollTo("top")} aria-label="Back to top">
          DRY<span>®</span>
        </button>

        <nav className="nav__links" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <button key={item.target} onClick={() => scrollTo(item.target)}>
              <span>0{index + 1}</span>{item.label}
            </button>
          ))}
        </nav>

        <button className="bag-button" onClick={() => scrollTo("drop")} aria-label={`Shopping bag with ${cartCount} items`}>
          <span>Bag</span><b>{cartCount}</b>
        </button>

        <button
          className={`menu-button ${menuOpen ? "menu-button--open" : ""}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <i /><i />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
        <span className="micro-label">DRY / Navigation / Y2026</span>
        {navItems.map((item, index) => (
          <button
            key={item.target}
            style={{ "--menu-delay": `${index * 60}ms` } as React.CSSProperties}
            onClick={() => {
              setMenuOpen(false)
              scrollTo(item.target)
            }}
          >
            <small>0{index + 1}</small>{item.label}<span>↘</span>
          </button>
        ))}
      </div>

      <section
        id="top"
        ref={heroRef}
        className="hero"
        onPointerMove={handleHeroMove}
        onPointerLeave={() => {
          heroRef.current?.style.setProperty("--mouse-x", "0")
          heroRef.current?.style.setProperty("--mouse-y", "0")
        }}
      >
        <div className="hero__coordinates hero__coordinates--left">
          <span>24°28&apos;N</span><span>54°22&apos;E</span>
        </div>
        <div className="hero__coordinates hero__coordinates--right">
          <span>Emirati-owned</span><span>Abu Dhabi / UAE</span>
        </div>

        <div className="hero__outline" aria-hidden="true">DRY</div>

        <div className="hero__poster hero__poster--main">
          <img src="/assets/skate.webp" alt="DRY skater in motion against hand-painted tags" />
          <span>Campaign 002 / Concrete heat</span>
        </div>

        <div className="hero__poster hero__poster--mark" aria-hidden="true">
          <img src="/assets/dryLogo2.webp" alt="" />
        </div>

        <div className="hero__stamp">
          <span>Born in</span>
          <strong>THE<br />HEAT</strong>
          <small>Abu Dhabi / 2024</small>
        </div>

        <p className="hero__intro">
          Skate goods and streetwear shaped by desert light, rough concrete, and the people who keep rolling when the city gets hot.
        </p>

        <button className="hero__cta magnetic" onClick={() => scrollTo("drop")}>
          <span>Explore drop 001</span><b>↘</b>
        </button>

        <div className="hero__sun" aria-hidden="true"><span>DRY</span></div>
      </section>

      <div className="ticker" aria-label="Brand details">
        <div className="ticker__track">
          {[0, 1].map((set) => (
            <div className="ticker__set" key={set} aria-hidden={set === 1}>
              <span>Born in the heat</span><i>✳</i>
              <span>Abu Dhabi, UAE</span><i>✳</i>
              <span>Board goods + clothing</span><i>✳</i>
              <span>Concrete tested</span><i>✳</i>
            </div>
          ))}
        </div>
      </div>

      <section id="drop" className="drop section-pad">
        <div className="section-heading reveal" data-reveal>
          <p className="kicker"><span>01</span> Fresh from the furnace</p>
          <h2>THE HEAT<br /><em>CHECK.</em></h2>
          <div>
            <p>Three essentials. No filler. Made for long sessions, hot streets, and everyone who keeps moving after dark.</p>
            <button className="underlined-button">Shop the full drop <span>↗</span></button>
          </div>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article
              className={`product-card product-card--${product.tone} reveal`}
              data-reveal
              style={{ "--delay": `${index * 120}ms` } as React.CSSProperties}
              key={product.name}
            >
              <div className="product-card__visual">
                <img src={product.image} alt={product.name} />
                <span className="product-card__index">{product.number}</span>
                <button className="product-card__quick" onClick={addToBag} aria-label={`Add ${product.name} to bag`}>
                  <span>Quick add</span><b>+</b>
                </button>
              </div>
              <div className="product-card__info">
                <div><h3>{product.name}</h3><p>{product.type}</p></div>
                <strong>{product.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="story" className="story">
        <div className="story__rail" aria-hidden="true">
          <span>DRY SKATEBOARDS / BORN IN THE HEAT / </span>
          <span>DRY SKATEBOARDS / BORN IN THE HEAT / </span>
        </div>

        <div className="story__copy section-pad">
          <div className="story__meta reveal" data-reveal>
            <span>02 / Our weather report</span><span>36°C &amp; rising</span>
          </div>
          <h2 className="reveal" data-reveal>
            NOT MADE<br />FOR THE SHADE.<br /><em>NEITHER ARE WE.</em>
          </h2>
          <div className="story__body reveal" data-reveal>
            <p>DRY is an Emirati-owned skate and streetwear label shaped by thermal haze, handstyle tags, concrete, and the streets that raised us.</p>
            <p>We make boards and clothing for the UAE scene—direct, durable, and built to carry a little bit of desert wherever the session goes.</p>
          </div>
        </div>

        <div className="story__image reveal" data-reveal>
          <img src="/assets/skate.webp" alt="Skaters moving in front of a DRY graffiti wall" />
          <div className="story__image-copy">
            <span>Local scene / global energy</span>
            <strong>STREET-BUILT<br />SINCE 2024.</strong>
          </div>
        </div>
      </section>

      <section className="heat-banner reveal" data-reveal aria-label="Made in the Heat">
        <img src="/assets/MadeInTheHeat.webp" alt="Made in the Heat — DRY Skateboards animated campaign" />
        <div className="heat-banner__label"><span>Campaign film / 00:12</span><span>Play on loop ↻</span></div>
      </section>

      <section id="boards" className="boards section-pad">
        <div className="boards__copy reveal" data-reveal>
          <p className="kicker"><span>03</span> Board goods</p>
          <h2>PRESSURE<br /><em>MAKES</em><br />GOOD THINGS.</h2>
          <p className="boards__description">Seven plies of Canadian maple. Three street-ready widths. One heat-warped graphic system. Pressed for pop, shaped for control.</p>
          <div className="size-picker" aria-label="Choose deck size">
            {['8.0"', '8.25"', '8.5"'].map((size) => (
              <button key={size} className={selectedSize === size ? "active" : ""} onClick={() => setSelectedSize(size)}>{size}</button>
            ))}
          </div>
          <button className="solid-button" onClick={addToBag}>Add {selectedSize} deck <span>↗</span></button>
        </div>

        <div className="boards__visual reveal" data-reveal>
          <div className="boards__rings" aria-hidden="true"><i /><i /><i /></div>
          <img src="/assets/dryLogo.webp" alt="DRY Heat Series deck artwork" />
          <span className="board-note board-note--top">Heat series / 001</span>
          <span className="board-note board-note--bottom">Abu Dhabi tested</span>
          <div className="floating-price"><small>From</small><strong>AED<br />350</strong></div>
        </div>
      </section>

      <section id="apparel" className="apparel">
        <div className="apparel__image reveal" data-reveal>
          <img src="/assets/shirt.jpg" alt="Model wearing the oversized DRY tag mark tee" />
          <span>Wear the tag / SS26 / Abu Dhabi</span>
        </div>
        <div className="apparel__copy reveal" data-reveal>
          <p className="kicker"><span>04</span> Cut for the street</p>
          <h2>THE STREET<br />IS THE<br /><em>LOOKBOOK.</em></h2>
          <p>Heavyweight pieces, easy silhouettes, zero preciousness. Designed here. Screen printed here. Worn everywhere.</p>
          <button className="underlined-button underlined-button--light">Shop apparel <span>↗</span></button>
          <div className="apparel__tag" aria-hidden="true"><img src="/assets/dry-logos.jpg" alt="" /></div>
        </div>
      </section>

      <section className="identity section-pad">
        <div className="identity__heading reveal" data-reveal>
          <p className="kicker"><span>05</span> One mark / four temperatures</p>
          <h2>THE MARK<br />MOVES.</h2>
          <p>The tag changes tone, never character. Built to live on boards, shirts, concrete, screens, and whatever comes next.</p>
        </div>
        <div className="identity__grid">
          {colorCells.map((color, index) => (
            <article
              className={`identity-card ${color.className} reveal`}
              data-reveal
              style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
              key={color.name}
            >
              <img src="/assets/dry-logos.jpg" alt={`DRY tag mark in ${color.name}`} />
              <span>{color.name}</span><small>{color.hex}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="community reveal" data-reveal>
        <img src="/assets/bags.jpg" alt="DRY Skateboards community holding branded carry bags" />
        <div className="community__shade" />
        <div className="community__copy">
          <p>06 / Carry the scene</p>
          <h2>FROM ABU DHABI<br />TO EVERYWHERE.</h2>
          <span>Board goods / clothing / accessories</span>
        </div>
        <div className="community__badge" aria-hidden="true">UAE<br /><span>24</span></div>
      </section>

      <section id="contact" className="contact section-pad">
        <div className="contact__top reveal" data-reveal>
          <p className="kicker"><span>07</span> Keep close</p>
          <p>Drops are irregular.<br />The heat is constant.</p>
        </div>
        <div className="contact__main reveal" data-reveal>
          <h2>STAY IN<br /><em>THE HEAT.</em></h2>
          <form onSubmit={submitEmail}>
            <label htmlFor="email">Email for drops, sessions, and new work.</label>
            <div>
              <input id="email" type="email" required placeholder="YOU@EMAIL.COM" aria-label="Email address" />
              <button type="submit" aria-label="Subscribe">{emailState === "sent" ? "✓" : "↗"}</button>
            </div>
            <p aria-live="polite">{emailState === "sent" ? "You’re on the heat list." : "No spam. Just the good stuff."}</p>
          </form>
        </div>

        <footer>
          <div className="footer__brand">DRY<span>®</span></div>
          <div><span>Based in</span><a href="#top">Abu Dhabi, UAE</a></div>
          <div><span>Follow</span><a href="#contact">Instagram</a><a href="#contact">TikTok</a></div>
          <div><span>Explore</span><a href="#drop">Shop</a><a href="#story">Story</a></div>
          <p>© 2026 DRY Skateboards</p>
        </footer>
      </section>
    </main>
  )
}
