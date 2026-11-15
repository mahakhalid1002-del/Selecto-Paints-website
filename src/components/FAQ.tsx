// import React, { useState } from "react";
// import { ChevronDown } from "lucide-react";

// const faqs = [
//   {
//     question: "Does weather sheet fade over time?",
//     answer: "No, Selecto Paints weather sheet is designed to withstand extreme weather conditions without fading."
//   },
//   {
//     question: "What is the quality of covering?",
//     answer: "We provide the best quality covering that ensures durability, smoothness, and long-lasting results."
//   },
//   {
//     question: "Does it compete with other multinational brands?",
//     answer: "Yes, Selecto Paints offers outstanding quality that competes with and often exceeds multinational standards."
//   },
//   {
//     question: "Does spilled tea or food on Selecto Premium Stain Guard remove easily?",
//     answer: "Yes, stains can be cleaned easily without tearing or damaging the paint surface."
//   },
//   {
//     question: "Is Selecto Paint eco-friendly?",
//     answer: "Absolutely. Our paints are formulated with low VOCs and sustainable practices to ensure environmental safety."
//   },
//   {
//     question: "How long does Selecto Paint last?",
//     answer: "Our paints are engineered to last for years while maintaining their fresh and vibrant finish."
//   },
//   {
//     question: "Can Selecto Paints be used on wood and metal?",
//     answer: "Yes, we have specialized solutions for wood, metal, and all surface applications."
//   },
//   {
//     question: "Does Selecto Paint prevent dampness or leakage?",
//     answer: "Yes, our waterproofing solutions and primers are specifically designed to resist dampness and leakage."
//   },
//   {
//     question: "Is Selecto Paint safe for indoor use?",
//     answer: "Yes, Selecto Paints are free from harmful chemicals and are perfectly safe for indoor environments."
//   },
//   {
//     question: "Do you provide professional application services?",
//     answer: "Yes, Selecto Paints offers expert painting and consultation services for flawless application."
//   }
// ];

// const FAQ: React.FC = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggleFAQ = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="max-w-4xl mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
//           Frequently Asked Questions
//         </h2>

//         <div className="space-y-4">
//           {faqs.map((faq, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-md overflow-hidden transition transform hover:scale-[1.01]"
//             >
//               <button
//                 className="w-full flex justify-between items-center px-6 py-4 text-left"
//                 onClick={() => toggleFAQ(index)}
//               >
//                 <span className="font-medium text-gray-800 text-lg">{faq.question}</span>
//                 <ChevronDown
//                   className={`h-6 w-6 text-gray-500 transition-transform ${
//                     openIndex === index ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>
//               {openIndex === index && (
//                 <div className="px-6 pb-4 text-gray-600 text-base leading-relaxed animate-fadeIn">
//                   {faq.answer}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQ;

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Does weather sheet fade over time?", a: "No, it is designed to withstand weather and retain color." },
  { q: "What is the quality of covering?", a: "We provide the best quality coverage with premium finish." },
  { q: "Does it compete with other multinational brands?", a: "Yes, our quality is outstanding and globally competitive." },
  { q: "Can spilled tea or food on Selecto Premium Stain Guard be removed easily?", a: "Yes, it can be cleaned without damaging the paint." },
  { q: "Is your paint eco-friendly?", a: "Yes, we use sustainable and eco-conscious formulations." },
  { q: "Does the paint resist cracking?", a: "Yes, it is formulated to resist cracking and peeling." },
  { q: "Do you offer anti-fungal or anti-bacterial paints?", a: "Yes, our advanced products include protective features." },
  { q: "Is your paint washable?", a: "Yes, many of our interior paints are fully washable." },
  { q: "How long does Selecto Paints last?", a: "Our paints are highly durable and long-lasting." },
  { q: "Do you offer warranty?", a: "Yes, we offer warranties on select premium products." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-12 md:py-14">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={faq.q} className="overflow-hidden rounded-xl border border-white/70 bg-white/60 shadow-sm backdrop-blur-md">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900"
              >
                {faq.q}
                <ChevronDown className={`h-4 w-4 shrink-0 text-gray-500 transition ${openIndex === index ? "rotate-180" : ""}`} />
              </button>
              {openIndex === index && (
                <p className="px-4 pb-3 text-sm leading-relaxed text-gray-600">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
