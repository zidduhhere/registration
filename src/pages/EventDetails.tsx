import { Link, useParams } from 'react-router-dom'
import { eventGuidelines, eventsData } from '../data/events';
import GradientText from '../components/GradientText';
import { posterAssets } from '../assets/posters';
import { useState, useEffect } from 'react';

const EventDetails = () => {

    const {id} = useParams<{id: string}>()
    const [copiedStudent, setCopiedStudent] = useState(false);
    const [copiedFaculty, setCopiedFaculty] = useState(false);
    const [isMobile, setIsMobile] = useState(false);


    const copyToClipboard = async (text: string, type: 'student' | 'faculty') => {
      try {
        await navigator.clipboard.writeText(text);
      if (type === 'student') {
        setCopiedStudent(true);
      } else {
        setCopiedFaculty(true);
      }
      setTimeout(() => {
        if (type === 'student') {
          setCopiedStudent(false);
        } else {
          setCopiedFaculty(false);
        }
      }, 2000);
      }
      catch (err) {
        console.error('Failed to copy: ', err);
      }
    }

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const guidelines = eventGuidelines.find(event => event.eventId === id);
    const eventDetails = eventsData.find(event => event.id === id);

    // Mobile View
    if (isMobile) {
      return (
        <div className='min-h-screen bg-white pb-10 w-fit '>
          <Link to="/" className='fixed top-4 left-4 z-50 px-4 py-2 clash font-semibold text-white bg-black rounded-lg shadow-lg'>
            ← Back
          </Link>
          
          <div className='pt-20 px-5 flex flex-col items-center justify-center w-full'>
            <GradientText
              colors={[eventDetails?.color1 ?? "#FF1500", eventDetails?.color2 ?? "#890707"]}
              className="text-5xl clash font-black mb-4 text-center mx-auto">
              {eventDetails?.title}
            </GradientText>
            {/* Event Image */}
            <div className='w-full mb-6'>
              <img 
                src={eventDetails?.poster} 
                className="w-full rounded-2xl shadow-lg" 
                alt={eventDetails?.title}
              />
            </div>

            {/* Event Title */}
            

            {/* Event Description */}
            <p className='serif text-sm tracking-tighter mb-6 w-fit'>
              {eventDetails?.longDescription}
            </p>

            {/* Event Details Card */}
            <div className=' rounded-xl mb-6 '>
              <h3 className='clash text-2xl font-bold mb-3'>Event Details</h3>
              <div className='space-y-2'>
                <p className='clash text-lg'> <strong>Date:</strong> {eventDetails?.date}</p>
                <p className='clash text-lg'><strong>Duration:</strong> {eventDetails?.duration}</p>
                <p className='clash text-lg'><strong>Team Size:</strong> {guidelines?.minimumTeamSize} to {guidelines?.maximumTeamSize}</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className=' rounded-xl mb-6 '>
              <h3 className='clash text-xl font-bold mb-3'>Contact Details</h3>
              <div className='space-y-3'>
                <div>
                  <p className='clash text-sm text-gray-600 mb-1'>Student Contact</p>
                  <div className='flex items-center gap-2'>
                    <p className='clash text-lg flex-1'>{eventDetails?.contact1}</p>
                    <button
                      className='bg-black p-2 px-3 text-white clash text-xs font-semibold rounded-lg'
                      onClick={() => copyToClipboard(`${eventDetails?.contact1}`, 'student')}
                    >
                      {copiedStudent ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>
                <div>
                  <p className='clash text-sm text-gray-600 mb-1'>Faculty Contact</p>
                  <div className='flex items-center gap-2'>
                    <p className='clash text-base flex-1'>{eventDetails?.contact2}</p>
                    <button
                      className='bg-black p-2 px-3 text-white clash text-xs font-semibold rounded-lg'
                      onClick={() => copyToClipboard(`${eventDetails?.contact2}`, 'faculty')}
                    >
                      {copiedFaculty ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules Section */}
            {guidelines?.rules && guidelines.rules.length > 0 && (
              <div className=' rounded-xl mb-6 '>
                <h3 className='clash text-xl font-bold mb-3'>Rules & Guidelines</h3>
                <ul className='space-y-2 list-disc list-inside'>
                  {guidelines.rules.map((rule, index) => (
                    <li key={index} className='serif text-sm'>{rule}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Register Button */}
            <Link 
              to="/register" 
              className='block w-full bg-black p-4 text-center text-white clash font-semibold text-xl rounded-xl shadow-lg hover:bg-gray-800 transition-colors'
            >
              Register Now
            </Link>
          </div>
        </div>
      );
    }

    // Desktop View
    return (
      <div>
        <Link to="/" className='px-4 absolute top-8 left-8 clash font-semibold text-white bg-black p-2'>Back Home</Link>
        <div className='flex flex-col justify-center w-full h-screen'>
          <div className='details md:grid md:grid-cols-12 w-full px-[5vw]'>
            <div className='md:col-span-7 left gap-2 flex md:flex-col flex-col-reverse align-start text-start'>
              <GradientText
                colors={[eventDetails?.color1 ?? "#FF1500", eventDetails?.color2 ?? "#890707"]}
                className="text-4xl md:text-6xl clash font-black mb-4 min-w-full align-start text-start">
                {eventDetails?.title}
              </GradientText>

              <p className='serif h-fit text-md tracking-widest'>{eventDetails?.longDescription}</p>
              
              <div className='important-details mt-6'>
                <div className='block'>
                  <h3 className='clash text-lg'>Date: {eventDetails?.date}</h3>
                  <h3 className='clash text-lg'>Duration: {eventDetails?.duration}</h3>
                  <h3 className='clash text-lg'>Team Size: {guidelines?.minimumTeamSize} to {guidelines?.maximumTeamSize}</h3>
                  <h3 className='clash text-lg' itemType='tel'>Contact Details: {eventDetails?.contact1} , {eventDetails?.contact2}</h3>
                  
                  <div className='flex gap-2 mt-4 text-sm'>
                    <button
                      className='bg-black p-2 px-2 text-white clash font-semibold transition-all duration-2000'
                      onClick={() => copyToClipboard(`${eventDetails?.contact1}`, 'student')}
                    >
                      {copiedStudent ? "Copied!" : "Copy Student Contact"}
                    </button>
                    <button
                      className='bg-black p-2 px-4 text-white clash font-semibold transition-all duration-2000'
                      onClick={() => copyToClipboard(`${eventDetails?.contact2}`, 'faculty')}
                    >
                      {copiedFaculty ? "Copied!" : "Copy Faculty Contact"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='md:col-span-5 left flex flex-col items-start text-start'>
              <img src={eventDetails?.poster} className="w-96 rounded-2xl shadow-md mb-8" />
            </div>
          </div>
          <div className='w-full flex justify-center items-center mb-10'>
            <Link to="/register" className='bg-black p-2 px-8 min-w-120 text-center text-white clash font-semibold text-2xl hover:bg-gray-800'>
              Register Now
            </Link>
          </div>
        </div>
      </div>
    )
}

export default EventDetails