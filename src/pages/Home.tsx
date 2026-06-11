import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaPlane, FaShip, FaTruck, FaWarehouse, FaCheckCircle,
  FaGlobe, FaShieldAlt, FaHeadset, FaChartLine, FaArrowRight,
  FaSearch, FaBoxOpen, FaHandshake, FaAward, FaStar, FaQuoteLeft,
  FaHospital, FaCar, FaShoppingCart, FaApple, FaClock, FaFileContract,
  FaLaptop, FaCogs, FaMobileAlt, FaCloud, FaRocket
} from 'react-icons/fa';
import AnimatedCard from '../components/animations/AnimatedCard';
import Icon from '../components/icons/Icon';

const testimonials = [
  {
    text: "EazyPost LLC has transformed our international distribution. Their professionalism and adherence to timelines are unmatched in the industry.",
    author: "Jonathan Reed",
    role: "Director, Global Retail Inc."
  },
  {
    text: "The real-time tracking accuracy provided by EazyPost gives us and our clients true peace of mind. Truly a top-tier courier service.",
    author: "Sarah Jenkins",
    role: "Logistics Manager, TechFlow"
  },
  {
    text: "EazyPost handles our entire North American supply chain. Their reliability has cut our delays by 80% since switching.",
    author: "Marcus Chen",
    role: "VP Supply Chain, NovaMed Corp"
  },
  {
    text: "We ship over 10,000 units monthly through EazyPost. Zero lost packages, zero complaints from our customers.",
    author: "Amara Okafor",
    role: "Operations Director, Lagos Trade Hub"
  },
  {
    text: "The customs clearance support from EazyPost is exceptional. They navigate complex regulations effortlessly.",
    author: "Dmitri Volkov",
    role: "Import Manager, EuroTech GmbH"
  },
  {
    text: "EazyPost's API integration with our warehouse system was seamless. Real-time tracking at our fingertips.",
    author: "Priya Sharma",
    role: "CTO, BombayMart Online"
  },
  {
    text: "Their dedicated account management team anticipates our needs before we even raise a request. Outstanding service.",
    author: "Carlos Mendez",
    role: "CEO, Andean Logistics Group"
  },
  {
    text: "We've partnered with EazyPost for three years and they consistently deliver ahead of schedule. A trusted ally.",
    author: "Fatima Al-Rashid",
    role: "Supply Chain Lead, Gulf Express"
  },
  {
    text: "From Sydney to Singapore, EazyPost delivers with precision. Their tracking technology sets the industry standard.",
    author: "James Whitfield",
    role: "Logistics Director, Oceana Trading"
  },
  {
    text: "EazyPost helped us scale from local to international shipping in under six months. Invaluable partnership.",
    author: "Yuki Tanaka",
    role: "Founder, Tokyo Craft Exports"
  },
  {
    text: "Their cold chain logistics are impeccable. Temperature-sensitive shipments arrive in perfect condition every time.",
    author: "Dr. Anna Kowalski",
    role: "Pharma Logistics, BioCare Europe"
  },
  {
    text: "EazyPost's pricing transparency is refreshing. No hidden fees, no surprises, just reliable service.",
    author: "Robert Osei",
    role: "Finance Director, Accra Merchants"
  },
  {
    text: "We reduced our shipping insurance claims by 95% after moving to EazyPost. Their handling standards are exceptional.",
    author: "Isabella Rossi",
    role: "Risk Manager, Milano Fashion House"
  },
  {
    text: "The EazyPost team goes above and beyond during peak seasons. They scaled with us when we needed it most.",
    author: "Ahmed Hassan",
    role: "E-commerce Director, Cairo Digital"
  },
  {
    text: "Their global network coverage in Southeast Asia is unmatched. Our expansion there was made possible by EazyPost.",
    author: "Linh Nguyen",
    role: "Regional Manager, Saigon Shipping"
  },
  {
    text: "EazyPost's sustainability initiatives align with our green logistics goals. Carbon-neutral shipping is the future.",
    author: "Elena Petrova",
    role: "Sustainability Officer, GreenLogix"
  },
  {
    text: "Trust is everything in logistics. EazyPost has earned ours many times over with consistent excellence.",
    author: "David Thompson",
    role: "CEO, Thompson Global Enterprises"
  }
];

const testimonialsFrench = [
  {
    text: "EazyPost LLC a transformé notre distribution internationale. Leur professionnalisme et leur respect des délais sont inégalés dans l'industrie.",
    author: "Jonathan Reed",
    role: "Directeur, Global Retail Inc."
  },
  {
    text: "La précision du suivi en temps réel fourni par EazyPost nous apporte une tranquillité d'esprit absolue. Un service de messagerie de premier ordre.",
    author: "Sarah Jenkins",
    role: "Responsable Logistique, TechFlow"
  },
  {
    text: "EazyPost gère l'ensemble de notre chaîne d'approvisionnement nord-américaine. Leur fiabilité a réduit nos retards de 80%.",
    author: "Marcus Chen",
    role: "VP Chaîne d'Approvisionnement, NovaMed Corp"
  },
  {
    text: "Nous expédions plus de 10 000 unités par mois avec EazyPost. Zéro colis perdu, zéro réclamation.",
    author: "Amara Okafor",
    role: "Directrice des Opérations, Lagos Trade Hub"
  },
  {
    text: "Le service de dédouanement d'EazyPost est exceptionnel. Ils naviguent dans les réglementations complexes sans effort.",
    author: "Dmitri Volkov",
    role: "Responsable Import, EuroTech GmbH"
  },
  {
    text: "L'intégration API d'EazyPost avec notre système d'entrepôt a été parfaite. Le suivi en temps réel à portée de main.",
    author: "Priya Sharma",
    role: "CTO, BombayMart Online"
  },
  {
    text: "Leur équipe de gestion de compte anticipe nos besoins avant même que nous les demandions. Un service remarquable.",
    author: "Carlos Mendez",
    role: "CEO, Andean Logistics Group"
  },
  {
    text: "Nous collaborons avec EazyPost depuis trois ans et ils livrent systématiquement en avance. Un allié de confiance.",
    author: "Fatima Al-Rashid",
    role: "Responsable Chaîne d'Approvisionnement, Gulf Express"
  },
  {
    text: "De Sydney à Singapour, EazyPost livre avec précision. Leur technologie de suivi établit la norme de l'industrie.",
    author: "James Whitfield",
    role: "Directeur Logistique, Oceana Trading"
  },
  {
    text: "EazyPost nous a aidés à passer de l'expédition locale à internationale en moins de six mois. Un partenariat inestimable.",
    author: "Yuki Tanaka",
    role: "Fondateur, Tokyo Craft Exports"
  },
  {
    text: "Leur logistique de chaîne du froid est impeccable. Les expéditions sensibles à la température arrivent en parfait état.",
    author: "Dr. Anna Kowalski",
    role: "Logistique Pharmaceutique, BioCare Europe"
  },
  {
    text: "La transparence tarifaire d'EazyPost est rafraîchissante. Pas de frais cachés, pas de surprises, un service fiable.",
    author: "Robert Osei",
    role: "Directeur Financier, Accra Merchants"
  },
  {
    text: "Nous avons réduit nos réclamations d'assurance de 95% après avoir choisi EazyPost. Leurs normes de manutention sont exceptionnelles.",
    author: "Isabella Rossi",
    role: "Responsable Risques, Milano Fashion House"
  },
  {
    text: "L'équipe EazyPost se dépasse pendant les saisons de pointe. Ils ont évolué avec nous quand nous en avions le plus besoin.",
    author: "Ahmed Hassan",
    role: "Directeur E-commerce, Cairo Digital"
  },
  {
    text: "Leur couverture réseau en Asie du Sud-Est est inégalée. Notre expansion là-bas a été rendue possible par EazyPost.",
    author: "Linh Nguyen",
    role: "Responsable Régional, Saigon Shipping"
  },
  {
    text: "Les initiatives de durabilité d'EazyPost s'alignent sur nos objectifs logistiques verts. L'expédition carbone-neutre est l'avenir.",
    author: "Elena Petrova",
    role: "Responsable Développement Durable, GreenLogix"
  },
  {
    text: "La confiance est primordiale en logistique. EazyPost a gagné la nôtre de nombreuses fois par son excellence constante.",
    author: "David Thompson",
    role: "CEO, Thompson Global Enterprises"
  }
];

const testimonialsAustralian = [
  {
    text: "EazyPost has revolutionised our supply chain down under. Their reliability across the Pacific is second to none.",
    author: "Liam O'Brien",
    role: "Supply Chain Director, AusTrade Logistics"
  },
  {
    text: "The visibility EazyPost provides on our shipments from Sydney to the world is outstanding. Game changer for our exports.",
    author: "Charlotte Bennett",
    role: "Export Manager, BlueScope Trading"
  },
  {
    text: "We've been using EazyPost for our rural and remote deliveries across the Outback. They never miss a drop-off.",
    author: "Jack Thompson",
    role: "Operations Manager, Remote Logistics AU"
  },
  {
    text: "EazyPost's customs expertise made our expansion into Asian markets effortless. Highly recommend their services.",
    author: "Sophie Williams",
    role: "International Trade Lead, Koala Exports"
  },
  {
    text: "Their warehousing and distribution network across Australia is world-class. Seamless integration with our systems.",
    author: "Harper Jones",
    role: "CEO, Pacific E-Commerce"
  },
  {
    text: "EazyPost delivered our largest consignment ahead of schedule during peak season. Absolutely reliable partner.",
    author: "Oliver Taylor",
    role: "Logistics Director, Brisbane Goods"
  },
  {
    text: "The real-time tracking and proactive notifications keep our clients informed every step of the way. Brilliant service.",
    author: "Amelia Brown",
    role: "Client Relations Manager, Sydney Logistics Hub"
  },
  {
    text: "From Melbourne to Malaysia, EazyPost handles our cross-border freight with unmatched efficiency.",
    author: "Noah Wilson",
    role: "Freight Manager, Southern Cross Shipping"
  },
  {
    text: "Their team's local knowledge of Australian customs regulations saved us thousands in delays. Invaluable expertise.",
    author: "Mia Anderson",
    role: "Compliance Officer, DownUnder Trade"
  },
  {
    text: "EazyPost helped us build a reliable cold chain for our premium produce exports. Everything arrives fresh.",
    author: "Thomas Martin",
    role: "Cold Chain Manager, Fresh Harvest AU"
  },
  {
    text: "The dedicated account management and personalised support sets EazyPost apart from every other courier we've tried.",
    author: "Isla White",
    role: "Operations Director, Adelaide Commerce"
  },
  {
    text: "EazyPost's technology platform integrates perfectly with our inventory management. Tracking is seamless and accurate.",
    author: "Zac Harris",
    role: "CTO, TechLogix Australia"
  },
  {
    text: "We rely on EazyPost for time-critical medical supply deliveries. They have never let us down, not once.",
    author: "Dr. Emily Clarke",
    role: "Medical Logistics, HealthLink Australia"
  },
  {
    text: "Their global network combined with local Australian expertise is the perfect formula for international shipping success.",
    author: "William Walker",
    role: "Director, Walker International"
  },
  {
    text: "EazyPost's sustainability commitment matches our own. It's great to partner with a logistics company that cares.",
    author: "Grace Johnson",
    role: "Sustainability Officer, Green Freight AU"
  },
  {
    text: "The transition to EazyPost was smooth and the results were immediate. Our delivery times improved dramatically.",
    author: "Henry King",
    role: "E-commerce Director, Perth Retail Co"
  },
  {
    text: "Best logistics partner we've had in 15 years of business. EazyPost sets the benchmark for courier services in Australia.",
    author: "Ruby Davis",
    role: "CEO, Davis & Co Trading"
  }
];

const allTestimonials = [...testimonials, ...testimonialsFrench, ...testimonialsAustralian];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-eazypost-blue overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Global Logistics and Shipping"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-eazypost-blue via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-6xl font-black text-white leading-tight uppercase">
              WORLD-CLASS <span className="text-eazypost-red">LOGISTICS</span> <br className="hidden md:block" /> SOLUTIONS
            </h1>
            <p className="mt-6 text-xl text-gray-100 max-w-2xl">
              EazyPost LLC provides seamless, reliable, and efficient courier services worldwide. From local deliveries to global freight, we bring the world to your doorstep.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/track"
                className="inline-flex items-center px-8 py-4 bg-eazypost-red text-white font-bold rounded-sm hover:bg-opacity-90 transition-all uppercase tracking-wider"
              >
                Track Shipment <Icon icon={FaSearch} className="ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-sm hover:bg-white hover:text-eazypost-blue transition-all uppercase tracking-wider"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Redesigned */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-eazypost-blue uppercase tracking-tight">
                Industrial <span className="text-eazypost-red">Solutions</span>
              </h2>
              <div className="w-20 h-1 bg-eazypost-red mt-4 mb-6"></div>
              <p className="text-base md:text-lg text-gray-600">
                Precision-driven logistics tailored to your business and personal needs. We handle every package with the same level of professional care.
              </p>
            </div>
            <Link to="/contact" className="px-8 py-3 bg-gray-100 text-eazypost-blue font-black uppercase text-xs tracking-[0.2em] hover:bg-eazypost-red hover:text-white transition-all">
              Request Full Specs
            </Link>
          </div>

          <div className="space-y-4">
            {[
              {
                id: "01",
                icon: FaPlane,
                title: "Air Freight",
                desc: "Expedited global delivery for time-critical shipments with real-time monitoring.",
                img: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              },
              {
                id: "02",
                icon: FaShip,
                title: "Ocean Freight",
                desc: "Cost-effective international shipping for large-scale cargo and containerized goods.",
                img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              },
              {
                id: "03",
                icon: FaTruck,
                title: "Ground Transport",
                desc: "Reliable nationwide trucking and last-mile delivery services across all major routes.",
                img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              },
              {
                id: "04",
                icon: FaWarehouse,
                title: "Warehousing",
                desc: "Secure, state-of-the-art storage facilities with integrated inventory management.",
                img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              },
            ].map((service, idx) => (
              <div key={idx} className="relative min-h-[16rem] md:h-40 group overflow-hidden bg-eazypost-blue">
                <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-eazypost-blue via-eazypost-blue/40 to-transparent"></div>

                <div className="relative h-full flex flex-col md:flex-row items-center justify-center md:justify-start px-6 md:px-12 gap-4 md:gap-12 py-8 md:py-0">
                  <div className="hidden md:block text-white/20 text-4xl font-black italic">{service.id}</div>
                  <div className="text-eazypost-red text-4xl md:text-3xl">
                    <Icon icon={service.icon} />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-wider mb-1">{service.title}</h3>
                    <p className="text-gray-300 text-xs md:text-sm max-w-xl font-medium px-4 md:px-0">{service.desc}</p>
                  </div>
                  <Link to="/contact" className="px-6 py-2 border border-white/30 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-eazypost-blue transition-all">
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Guarantees - Strip Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-eazypost-blue uppercase tracking-tight">Service <span className="text-eazypost-red">Guarantees</span></h2>
            <div className="w-20 h-1 bg-eazypost-red mx-auto mt-4"></div>
          </div>
          <div className="space-y-6">
            {[
              { stat: "99.9%", statLabel: "On-Time Delivery", icon: FaClock, desc: "Guaranteed departure and arrival windows. Late deliveries trigger automated service credits — no paperwork required.", accent: "border-eazypost-red" },
              { stat: "Zero Loss", statLabel: "Cargo Integrity", icon: FaShieldAlt, desc: "End-to-end chain-of-custody with tamper-evident seals and full insurance coverage included on every shipment.", accent: "border-eazypost-blue" },
              { stat: "100% Match", statLabel: "Rate Transparency", icon: FaFileContract, desc: "All-inclusive pricing with no hidden fees. Final invoice matches your quote within 2% or we refund the difference.", accent: "border-eazypost-red" }
            ].map((item, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-stretch border-l-8 ${item.accent} bg-gray-50`}>
                <div className="bg-eazypost-blue text-white p-8 md:w-64 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl md:text-5xl font-black">{item.stat}</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-gray-300 mt-1">{item.statLabel}</div>
                </div>
                <div className="flex-1 flex items-center gap-6 p-8">
                  <div className="hidden md:flex w-16 h-16 bg-eazypost-red text-white items-center justify-center flex-shrink-0">
                    <Icon icon={item.icon} className="text-2xl" />
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Section: Global Infrastructure */}
      <section className="py-24 bg-eazypost-blue relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                Global <span className="text-eazypost-red">Infrastructure</span>
              </h2>
              <div className="w-20 h-1 bg-eazypost-red mt-4 mb-10"></div>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                At EazyPost LLC, our backbone is a sophisticated network of intelligent hubs and proprietary routing algorithms that ensure your cargo moves through the world with zero friction.
              </p>

              <div className="space-y-8">
                {[
                  { title: "Intelligent Routing", desc: "Automated pathfinding that avoids delays and optimizes delivery timelines." },
                  { title: "Secure Terminal Network", desc: "Privately held hubs across 6 continents with 24/7 security monitoring." },
                  { title: "Customs Mastery", desc: "Expert on-site teams facilitating near-instant clearance for complex cargo." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-eazypost-red text-xl shrink-0">
                      <Icon icon={FaChartLine} />
                    </div>
                    <div>
                      <h4 className="text-white font-black uppercase text-sm tracking-widest mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden relative md:flex items-center justify-center p-12">
              <div className="absolute inset-0 bg-eazypost-red/5 rounded-full blur-3xl"></div>
              <div className="relative z-10 p-16 border-l-8 border-eazypost-red bg-white/5 backdrop-blur-sm shadow-2xl">
                <Icon icon={FaGlobe} className="text-[200px] md:text-[300px] text-eazypost-red opacity-60 animate-pulse-slow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve - Card Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-eazypost-blue uppercase tracking-tight">Industries We <span className="text-eazypost-red">Serve</span></h2>
            <div className="w-20 h-1 bg-eazypost-red mx-auto mt-4"></div>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">Specialized logistics solutions engineered for the unique demands of each sector.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaHospital, title: "Healthcare & Pharma", desc: "Temperature-controlled cold chain logistics compliant with GDP and FDA standards. Real-time environmental monitoring for sensitive medical shipments." },
              { icon: FaCar, title: "Automotive", desc: "Just-in-time parts delivery and vehicle logistics. Warehousing solutions for aftermarket components with global distribution coverage." },
              { icon: FaShoppingCart, title: "E-Commerce & Retail", desc: "Omnichannel fulfillment with same-day processing. Integrated returns management and last-mile optimization for peak season scalability." },
              { icon: FaApple, title: "Food & Beverage", desc: "Farm-to-table cold chain integrity with HACCP certification. Specialty handling for perishables, frozen goods, and bulk commodities." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow border-b-4 border-eazypost-blue hover:border-eazypost-red group">
                <div className="w-14 h-14 bg-eazypost-blue text-white flex items-center justify-center mb-6 group-hover:bg-eazypost-red transition-colors">
                  <Icon icon={item.icon} className="text-2xl" />
                </div>
                <h3 className="text-lg font-black text-eazypost-blue uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-eazypost-red z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Our Team"
                className="relative z-10 w-full shadow-2xl rounded-sm"
              />
              <div className="absolute -bottom-8 -right-8 bg-eazypost-blue p-8 z-20 text-white hidden md:block">
                <div className="text-4xl font-black mb-1">20+</div>
                <div className="uppercase text-sm tracking-widest font-bold">Years of Trust</div>
              </div>
            </div>
            <div className="mt-16 lg:mt-0">
              <h2 className="text-3xl md:text-5xl font-black text-eazypost-blue uppercase tracking-tight">
                Our <span className="text-eazypost-red">Legacy</span>
              </h2>
              <div className="w-20 h-1 bg-eazypost-red mt-4"></div>
              <p className="mt-8 text-lg text-gray-700 leading-relaxed">
                Founded with a vision to redefine the logistics landscape, EazyPost LLC has grown from a local courier service into a global industrial leader. Our journey is built on the pillars of reliability, transparency, and innovation.
              </p>
              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                We don't just move cargo; we bridge the gap between businesses and their global opportunities. Our professional team and advanced technology ensure that every milestone in your shipment's journey is tracked and secured.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="text-eazypost-red mt-1">
                    <Icon icon={FaCheckCircle} className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-eazypost-blue uppercase">Global Reach</h4>
                    <p className="text-sm text-gray-600 mt-1">Operating in over 150 countries worldwide.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-eazypost-red mt-1">
                    <Icon icon={FaCheckCircle} className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-eazypost-blue uppercase">Zero Friction</h4>
                    <p className="text-sm text-gray-600 mt-1">Efficient customs clearing and documentation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Ecosystem - Feature Grid */}
      <section className="py-24 bg-eazypost-blue text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eazypost-red via-transparent to-eazypost-red"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">Digital <span className="text-eazypost-red">Ecosystem</span></h2>
            <div className="w-20 h-1 bg-eazypost-red mx-auto mt-4"></div>
            <p className="mt-6 text-gray-300 max-w-3xl mx-auto">Enterprise-grade technology platform powering every stage of your logistics journey. All systems built on SOC 2 compliant infrastructure with 99.99% uptime SLA.</p>
          </div>
          <div className="max-w-5xl mx-auto">
            {[
              { icon: FaLaptop, title: "Client Portal", items: ["Real-time dashboard with live global tracking", "Custom reporting and analytics exports", "Multi-user role-based access controls", "Historical data archive with instant search"] },
              { icon: FaCogs, title: "API Suite", items: ["RESTful webhooks for event-driven updates", "Inventory and order synchronization", "Automated label generation and booking", "Custom rate negotiation engine"] },
              { icon: FaMobileAlt, title: "Mobile Platform", items: ["Push notifications for every status change", "Proof-of-delivery with photo capture", "In-app direct communication with dispatch", "Offline mode for remote operational areas"] }
            ].map((section, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row gap-0 ${idx < 2 ? 'border-b border-white/10' : ''} ${idx > 0 ? 'pt-10' : ''} pb-10`}>
                <div className="md:w-72 flex items-start gap-4 mb-6 md:mb-0">
                  <div className="w-14 h-14 bg-eazypost-red flex items-center justify-center flex-shrink-0">
                    <Icon icon={section.icon} className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{section.title}</h3>
                    <Link to="/contact" className="text-eazypost-red text-[10px] uppercase tracking-widest font-black mt-1 hover:underline inline-block">Learn more →</Link>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                      <Icon icon={FaCheckCircle} className="text-eazypost-red mt-0.5 flex-shrink-0 text-xs" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 pt-8 border-t border-white/10">
            <Link
              to="/contact"
              className="inline-flex items-center px-10 py-4 bg-eazypost-red text-white font-black uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all shadow-xl"
            >
              Request Platform Demo <Icon icon={FaRocket} className="ml-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-eazypost-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-black text-eazypost-red mb-2">15M+</div>
              <div className="uppercase text-xs md:text-sm tracking-widest font-bold text-gray-300">Delivered Packages</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-eazypost-red mb-2">99.9%</div>
              <div className="uppercase text-xs md:text-sm tracking-widest font-bold text-gray-300">Arrival Accuracy</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-eazypost-red mb-2">240+</div>
              <div className="uppercase text-xs md:text-sm tracking-widest font-bold text-gray-300">Office Hubs</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-eazypost-red mb-2">24/7</div>
              <div className="uppercase text-xs md:text-sm tracking-widest font-bold text-gray-300">Active Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-eazypost-blue uppercase tracking-tight">
            Why <span className="text-eazypost-red">EazyPost?</span>
          </h2>
          <div className="w-20 h-1 bg-eazypost-red mx-auto mt-4 mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: FaShieldAlt, title: "Maximum Security", desc: "Military-grade handling and insurance for high-value items." },
              { icon: FaChartLine, title: "Advanced Analytics", desc: "Optimization tools and intelligence for your supply chain." },
              { icon: FaHandshake, title: "Partnership First", desc: "We act as an extension of your business, not just a vendor." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-eazypost-blue text-white flex items-center justify-center mx-auto mb-8 rounded-sm">
                  <Icon icon={item.icon} className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-eazypost-blue uppercase mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-black text-eazypost-blue uppercase">Global <span className="text-eazypost-red">Testimonials</span></h2>
          </div>
        </div>
        <div className="relative flex overflow-x-hidden">
          <div className="flex gap-8 animate-marquee whitespace-nowrap py-4">
            {[...allTestimonials, ...allTestimonials].map((t, idx) => (
              <div key={idx} className="inline-flex flex-col bg-gray-50 p-8 border-l-8 border-eazypost-red min-w-[400px] max-w-[400px] whitespace-normal text-left">
                <Icon icon={FaQuoteLeft} className="text-3xl text-eazypost-blue opacity-10 mb-4" />
                <p className="text-base italic text-gray-700 leading-relaxed mb-6 flex-1">"{t.text}"</p>
                <div className="flex-shrink-0">
                  <div className="font-bold text-eazypost-blue uppercase text-sm">{t.author}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-eazypost-red text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">Ready to expand your reach?</h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto font-medium">Connect with our logistics experts today and get a personalized solution for your shipping needs.</p>
          <Link
            to="/contact"
            className="inline-flex items-center px-12 py-5 bg-eazypost-blue text-white font-black rounded-sm hover:translate-y-[-2px] hover:shadow-2xl transition-all uppercase tracking-widest"
          >
            Start Shipping Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;