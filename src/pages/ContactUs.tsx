const ContactUs = () => {
  const contacts = [
    {
      name: "Abi Alif",
      role: "Student Lead",
      phone: "+91 7306522615",
      email: "abialifhere@gmail.com"
    },
    {
      name: "Vishnu M Nair ",
      role: "Technical Head",
      phone: "+91 90489 48248",
      email: "vishnu@acetvm.com"
    },
    {
      name: "Muhammed Adham ",
      role: "Student Co-Lead",
      phone: "+91 96334 49155",
      email: "muhammed.adham@acetvm.com"
    }
  ];

  return (
    <div className="w-screen min-h-screen relative" id="contact">
      

      <div className="flex flex-col items-center justify-center mt-20 px-4">
        <div className="heading flex flex-col justify-center items-center mb-16">
          <h2 className="clash text-5xl md:text-6xl font-black uppercase text-center mb-4">
            We'd Love to <span className="bg-red-700 text-white px-4">Hear From You</span>
          </h2>
          <p className="serif text-lg md:text-xl text-gray-700 text-center max-w-2xl mt-4">
            Have questions about the events? Need help with registration? Our team is here to assist you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-20">
          {contacts.map((contact, index) => (
            <div 
              key={index}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
            >
              <div className="flex flex-col items-start">
                <h3 className="clash text-2xl font-bold mb-1">{contact.name}</h3>
                <p className="serif tracking-wide text-red-700 font-semibold mb-4">{contact.role}</p>
                <div className="w-full border-t-2 border-black mb-4"></div>
                <div className="flex flex-col gap-2 w-full">
                  <a 
                    href={`tel:${contact.phone}`}
                    className="serif text-lg font-bold hover:bg-black hover:text-white p-2 transition-colors"
                  >
                    📞 {contact.phone}
                  </a>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="serif text-lg font-bold hover:bg-black hover:text-white p-2 transition-colors"
                  >
                    ✉️ {contact.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Section */}
        <div className="bg-black text-white w-full max-w-6xl p-12 mb-20">
          <h3 className="clash text-3xl font-bold text-center mb-8">Follow Us</h3>
          <div className="flex justify-center gap-8 flex-wrap">
            <a 
              href="https://www.instagram.com/iedc.iic_ace/" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 clash font-semibold text-xl hover:bg-red-700 hover:text-white transition-colors"
            >
              INSTAGRAM
            </a>
            <a 
              href="https://facebook.com"
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 clash font-semibold text-xl hover:bg-red-700 hover:text-white transition-colors"
            >
              FACEBOOK
            </a>
            <a 
              href="https://www.linkedin.com/company/innovation-and-entrepreneurship-devlopment-cell-ace-college-of-engineering-iedc-ace/"
              target="_blank"
              rel="noopener noreferrer" 
              className="bg-white text-black px-8 py-4 clash font-semibold text-xl hover:bg-red-700 hover:text-white transition-colors"
            >
              LINKEDIN
            </a>
          </div>
        </div>

        {/* Location Info */}
        <div className="w-full max-w-6xl mb-20">
          <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="clash text-3xl font-bold mb-4">📍 Visit Us</h3>
            <p className="serif text-xl mb-2">ACE College Of Engineering</p>
            <p className="serif text-lg text-gray-700">Thiruvallam, Thiruvananthapuram, India</p>
            <p className="serif text-lg text-gray-700 mt-4">Event Dates: February 2-4, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
