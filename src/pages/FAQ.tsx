import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import Icon from '../components/icons/Icon';
import AnimatedCard from '../components/animations/AnimatedCard';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "How can I track my shipment?",
      answer: "You can track your shipment by entering your tracking number in our Track Package page. The tracking number is provided to you when you book a shipment. Our real-time tracking system will show you the current status and location of your package."
    },
    {
      question: "What shipping services do you offer?",
      answer: "We offer a comprehensive range of shipping services including Air Freight, Ocean Freight, and Ground Transport. We also provide additional services such as warehousing, customs clearance, and cargo insurance to meet all your logistics needs."
    },
    {
      question: "How are shipping rates calculated?",
      answer: "Shipping rates are calculated based on several factors including: weight and dimensions of the package, shipping distance, delivery speed, and type of service selected. For accurate pricing, please use our Get a Quote feature or contact our customer service team."
    },
    {
      question: "What is the estimated delivery time?",
      answer: "Delivery times vary depending on the service selected and destination. Generally, air freight takes 1-3 business days, ground transport 2-5 business days, and sea freight 10-30 days. Specific delivery estimates will be provided when booking."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, EazyPost LLC offers international shipping services to over 150 countries worldwide. Our global network ensures reliable and efficient delivery of your shipments across borders, with full customs clearance support."
    },
    {
      question: "What items are prohibited for shipping?",
      answer: "Prohibited items include but are not limited to: dangerous goods, illegal substances, firearms, explosives, and perishable goods without proper packaging. Please contact us for a complete list of restricted items."
    },
    {
      question: "How do I prepare my package for shipping?",
      answer: "Ensure your package is properly sealed with appropriate packaging materials. Include complete and accurate shipping labels. For fragile items, use bubble wrap or similar protective materials. Contact us for specific packaging guidelines."
    },
    {
      question: "What if my package is lost or damaged?",
      answer: "We offer cargo insurance to protect against loss or damage. If an issue occurs, please contact our customer service immediately. We'll investigate the situation and process any claims according to our insurance policy."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-eazypost-blue py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="FAQ"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl">
            Frequently Asked <span className="text-eazypost-red">Questions</span>
          </h1>
          <div className="w-20 h-1 bg-eazypost-red mx-auto mt-6"></div>
          <p className="mt-8 text-xl text-gray-200 max-w-3xl mx-auto">
            Get quick answers to common inquiries about EazyPost LLC logistics and shipping operations.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <AnimatedCard key={index} animation="fade" delay={`${index * 50}ms`}>
              <div
                className={`border-b border-gray-100 transition-all duration-300 ${openIndex === index ? 'bg-gray-50' : 'bg-white'}`}
              >
                <button
                  className="w-full py-6 flex justify-between items-center focus:outline-none group"
                  onClick={() => toggleQuestion(index)}
                >
                  <h3 className={`text-left font-bold uppercase tracking-wide text-sm md:text-base ${openIndex === index ? 'text-eazypost-red' : 'text-eazypost-blue group-hover:text-eazypost-red'}`}>
                    {item.question}
                  </h3>
                  <span className={`ml-4 flex-shrink-0 ${openIndex === index ? 'text-eazypost-red' : 'text-eazypost-blue'}`}>
                    {openIndex === index ? <Icon icon={FaChevronUp} /> : <Icon icon={FaChevronDown} />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 pb-8' : 'max-h-0'}`}
                >
                  <div className="text-gray-600 leading-relaxed text-lg border-l-4 border-eazypost-red pl-6">
                    {item.answer}
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-eazypost-blue py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Icon icon={FaQuestionCircle} className="text-5xl text-eazypost-red mx-auto mb-6 opacity-80" />
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-300 mb-10 max-w-xl mx-auto uppercase tracking-widest text-xs font-bold">
            Our specialized support team is available 24/7 to assist with complex inquiries.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-10 py-4 bg-eazypost-red text-white font-black uppercase tracking-widest text-sm rounded-sm hover:translate-y-[-2px] transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;