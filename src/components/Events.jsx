import React from 'react';

export default function Events() {
  const events = [
    { title: "Independence Day", desc: "Celebrated on 15th August with flag hoisting and speeches.", img: "/images/ip.jpg" },
    { title: "Ganesh Chathurthi", desc: "Celebrated grandly by keeping a Ganesh idol. Donors and old boarders are invited.", img: "/images/gan.jpg" },
    { title: "Republic Day", desc: "Celebrated on 26th Jan with free Eye/Dental checkups and blood donation camps.", img: "/images/ip.jpg" },
    { title: "Macrito", desc: "Annual cricket tournament hosted by Malakala Hostel for different teams.", img: "/images/cricket.jpg" },
    { title: "Hostel Day", desc: "A grand celebration at Malakala Convention Center with donors and past residents.", img: "/images/mal2.jpg" },
    { title: "Smriti", desc: "Indoor games competition (TT, Carrom, Chess, Treasure Hunt) played with different hostels.", img: "/images/smriti.jpg" }
  ];

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Events</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((evt, idx) => (
            <div 
              key={idx} 
              data-aos="fade-up" 
              data-aos-delay={idx * 100}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={evt.img} 
                  alt={evt.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=Event+Image" }}
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{evt.title}</h3>
                <p className="text-gray-600 text-sm">{evt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
