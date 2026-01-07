import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaUser, FaPaperPlane, FaSpinner, FaHeadset } from 'react-icons/fa';
import AnimatedCard from '../components/animations/AnimatedCard';
import Icon from '../components/icons/Icon';
import { sendContactFormEmail } from '../services/emailService';

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Required fields missing');
      return;
    }
    setLoading(true);

    try {
      await sendContactFormEmail(formData);
      toast.success('Communication dispatched successfully');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send contact form:', error);
      toast.error('Dispatch failed. Retry terminal connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-eazypost-blue pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Contact"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight sm:text-5xl">
            CONTACT <span className="text-eazypost-red">LOGISTICS</span>
          </h1>
          <div className="w-20 h-1 bg-eazypost-red mx-auto mt-6"></div>
          <p className="mt-8 text-xl text-gray-300 max-w-3xl mx-auto uppercase tracking-widest font-bold text-xs">
            Direct Line to EazyPost LLC Global Operations & Support
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-black text-eazypost-blue uppercase tracking-tight mb-4">Send Dispatch</h2>
              <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Inquiry Response Window: 12-24 Hours</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Icon icon={FaUser} /></span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="FULL NAME"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-b-2 border-gray-200 focus:border-eazypost-red focus:outline-none font-bold uppercase text-sm tracking-wide transition-colors"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Icon icon={FaEnvelope} /></span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="EMAIL ADDRESS"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-b-2 border-gray-200 focus:border-eazypost-red focus:outline-none font-bold uppercase text-sm tracking-wide transition-colors"
                  />
                </div>
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="SUBJECT / MANIFEST NUMBER"
                className="w-full px-4 py-4 bg-gray-50 border-b-2 border-gray-200 focus:border-eazypost-red focus:outline-none font-bold uppercase text-sm tracking-wide transition-colors"
              />
              <textarea
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="DETAILED INQUIRY"
                className="w-full px-4 py-4 bg-gray-50 border-b-2 border-gray-200 focus:border-eazypost-red focus:outline-none font-bold uppercase text-sm tracking-wide transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-10 py-5 bg-eazypost-blue text-white font-black uppercase tracking-widest text-sm hover:bg-eazypost-red transition-all shadow-xl disabled:opacity-70 group"
              >
                {loading ? (
                  <Icon icon={FaSpinner} className="animate-spin mr-3 text-xl" />
                ) : (
                  <Icon icon={FaPaperPlane} className="mr-3 group-hover:translate-x-2 transition-transform" />
                )}
                Initialize Communication
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-black text-eazypost-blue uppercase tracking-tight mb-8">GLOBAL CONTACTS</h2>
              <div className="space-y-8">
                <AnimatedCard animation="fade">
                  <div className="flex items-start gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center text-eazypost-red group-hover:bg-eazypost-blue group-hover:text-white transition-all">
                      <Icon icon={FaEnvelope} className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-black text-eazypost-blue uppercase tracking-widest text-xs mb-1">Electronic Mail</h4>
                      <p className="text-lg font-bold text-gray-700">support@eazypost.com</p>
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard animation="fade" delay="100ms">
                  <div className="flex items-start gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center text-eazypost-red group-hover:bg-eazypost-blue group-hover:text-white transition-all">
                      <Icon icon={FaHeadset} className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-black text-eazypost-blue uppercase tracking-widest text-xs mb-1">Global Support</h4>
                      <p className="text-lg font-bold text-gray-700">Available 24/7 via Portal</p>
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard animation="fade" delay="200ms">
                  <div className="flex items-start gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center text-eazypost-red group-hover:bg-eazypost-blue group-hover:text-white transition-all">
                      <Icon icon={FaClock} className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-black text-eazypost-blue uppercase tracking-widest text-xs mb-1">Main Headquarters</h4>
                      <p className="text-gray-600 font-bold text-sm">MON - FRI: 08:00 - 20:00 GMT</p>
                      <p className="text-gray-600 font-bold text-sm">SAT: 09:00 - 15:00 GMT</p>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </div>

            {/* Visual Callout */}
            <div className="relative group overflow-hidden bg-eazypost-blue">
              <img
                src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Logistics Operations"
                className="w-full h-[300px] object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-white bg-gradient-to-t from-eazypost-blue to-transparent">
                <div>
                  <Icon icon={FaMapMarkerAlt} className="text-4xl text-eazypost-red mx-auto mb-4" />
                  <p className="font-black uppercase tracking-[0.3em] text-xs">Global Hub Network</p>
                  <p className="mt-2 text-sm text-gray-300 font-medium">Over 2,500 strategic logistics points worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;