import React from 'react';
import { FaBookReader, FaTableTennis, FaDumbbell } from 'react-icons/fa';

export default function Facilities() {
  const facilitiesList = [
    {
      id: 1,
      title: "Library (Vidyodaya Sangha)",
      icon: <FaBookReader className="text-4xl mb-4 text-secondary drop-shadow-md" />,
      desc: "Our library hosts over 3000 reference books to aid students in achieving academic excellence across various disciplines."
    },
    {
      id: 2,
      title: "Sports & Recreation",
      icon: <FaTableTennis className="text-4xl mb-4 text-secondary drop-shadow-md" />,
      desc: "Relax and compete with indoor games including Chess, Carrom, Table Tennis, Cricket gear and more available for all students."
    },
    {
      id: 3,
      title: "Gymnasium",
      icon: <FaDumbbell className="text-4xl mb-4 text-secondary drop-shadow-md" />,
      desc: "A healthy mind resides in a healthy body. Our well-equipped gym helps students maintain their physical fitness and wellbeing."
    }
  ];

  return (
    <section id="facilities" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 drop-shadow-md">Our Facilities</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">Providing everything a student needs to study, stay fit, and relax.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {facilitiesList.map((item, index) => (
            <div 
              key={item.id} 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
              className="glass p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover-glow"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
