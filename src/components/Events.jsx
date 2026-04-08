import React from 'react';

export default function Events() {
  const events = [
    { title: "Independence Day", desc: "Celebrated on 15th August with flag hoisting and speeches.", img: "/images/independence_new.jpeg" },
    { title: "Ganesh Chathurthi", desc: "Celebrated grandly by keeping a Ganesh idol. Donors and old boarders are invited.", img: "/images/gan.jpeg" },
    { title: "Republic Day", desc: "Celebrated on 26th Jan with free Eye/Dental checkups and blood donation camps.", img: "/images/republic.jpeg" },
    { title: "Hostel Day", desc: "A grand celebration at Malkala Convention Center with donors and past residents.", img: "/images/mal2.jpg" },
    { title: "Smriti & Macrito  ", desc: "Annual sports tournament featuring outdoor cricket (Macrito) and indoor competitions like TT, Carrom, and Chess.", img: "/images/smriti.jpg" },
    { title: "Sri Ram Navami", desc: "Grand celebration of Sri Ram Navami with auspicious prayers and cultural festivities.", img: "/images/ram (1).jpeg" },
    { title: "Lakshmi Satyanarayana Pooja ", desc: "A traditional pooja performed within the hostel seeking blessings and prosperity.", img: "/images/lakshmi.jpeg" }
  ];

  return (
    <section id="events" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 drop-shadow-md">Our Events</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((evt, idx) => (
            <div 
              key={idx} 
              data-aos="fade-up" 
              data-aos-delay={idx * 100}
              className="glass rounded-2xl overflow-hidden hover-glow transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={evt.img} 
                  alt={evt.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=Event+Image" }}
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-3">{evt.title}</h3>
                <p className="text-gray-300 text-sm">{evt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
