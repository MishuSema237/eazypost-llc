import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaPlane, FaShip, FaTruck, FaWarehouse, FaCheckCircle,
  FaGlobe, FaShieldAlt, FaHeadset, FaChartLine, FaArrowRight,
  FaSearch, FaBoxOpen, FaHandshake, FaAward, FaStar, FaQuoteLeft
} from 'react-icons/fa';
import AnimatedCard from '../components/animations/AnimatedCard';
import Icon from '../components/icons/Icon';

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

            <div className="relative flex items-center justify-center p-12">
              <div className="absolute inset-0 bg-eazypost-red/5 rounded-full blur-3xl"></div>
              <div className="relative z-10 p-16 border-l-8 border-eazypost-red bg-white/5 backdrop-blur-sm shadow-2xl">
                <Icon icon={FaGlobe} className="text-[200px] md:text-[300px] text-eazypost-red opacity-60 animate-pulse-slow" />
              </div>
            </div>
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-eazypost-blue uppercase">Global <span className="text-eazypost-red">Testimonials</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                text: "EazyPost LLC has transformed our international distribution. Their professionalism and adherence to timelines are unmatched in the industry.",
                author: "Jonathan Reed",
                role: "Director, Global Retail Inc."
              },
              {
                text: "The real-time tracking accuracy provided by EazyPost gives us and our clients true peace of mind. Truly a top-tier courier service.",
                author: "Sarah Jenkins",
                role: "Logistics Manager, TechFlow"
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-gray-50 p-12 relative border-l-8 border-eazypost-red">
                <Icon icon={FaQuoteLeft} className="text-4xl text-eazypost-blue opacity-10 absolute top-8 left-8" />
                <p className="text-xl italic text-gray-700 relative z-10 mb-8 leading-relaxed">"{t.text}"</p>
                <div>
                  <div className="font-bold text-eazypost-blue uppercase">{t.author}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest">{t.role}</div>
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