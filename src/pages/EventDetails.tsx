import { Link, useNavigate, useParams } from 'react-router-dom'
import { eventGuidelines, eventsData } from '../data/events';
import GradientText from '../components/GradientText';
import { useState, useEffect } from 'react';
import Watermark from '../components/Watermark';
import { useEventStatus } from '../hooks/useEventStatus';

const EventDetails = () => {

    const {id} = useParams<{id: string}>()
    const [copiedStudent, setCopiedStudent] = useState(false);
    const [copiedFaculty, setCopiedFaculty] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const { isEventOpen } = useEventStatus();


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
          <div onClick={() => navigate(-1)} className='fixed top-4 left-4 z-50 px-4 py-2 clash font-semibold text-white bg-black rounded-lg shadow-lg cursor-pointer'>
            ← Back
          </div>
          
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
            {id && !isEventOpen(id) ? (
              <div className='w-full bg-red-100 border-2 border-red-500 p-4 text-center rounded-xl mb-4'>
                <p className='clash font-bold text-red-800 text-lg mb-2'>Registration Closed</p>
                <p className='serif text-red-700 text-sm'>This event is currently full. Registration is no longer available.</p>
              </div>
            ) : (
              <Link 
                to="/register" 
                className='block w-full bg-black p-4 text-center text-white clash font-semibold text-xl rounded-xl shadow-lg hover:bg-gray-800 transition-colors'
              >
                Register Now
              </Link>
            )}
          </div>
        </div>
      );
    }

    // Desktop View
    return (
      <div>
        <div onClick={() => navigate(-1)} className='px-4 absolute top-8 left-8 clash font-semibold text-white bg-black p-2 cursor-pointer'>Go Back</div>
        
        {/* Registration Status Banner */}
        {id && !isEventOpen(id) && (
          <div className='fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border-2 border-red-500 rounded-lg shadow-lg p-4 max-w-md'>
            <div className='flex items-center gap-3'>
              <svg className='w-6 h-6 text-red-600 shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
              </svg>
              <div>
                <p className='clash font-bold text-red-800'>Registration Closed</p>
                <p className='serif text-sm text-red-700'>This event is currently full</p>
              </div>
            </div>
          </div>
        )}
        
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
            {id && !isEventOpen(id) ? (
              <div className='bg-red-100 border-2 border-red-500 p-4 px-8 rounded-full text-center'>
                <p className='clash font-bold text-red-800 text-xl'>Registration Full - Event Closed</p>
              </div>
            ) : (
              <Link to="/register" className='bg-black p-2 px-8 min-w-120 rounded-full text-center text-white clash font-semibold text-2xl hover:bg-gray-800'>
                Register Now
              </Link>
            )}
          </div>
        </div>
        <Watermark />
      </div>
    )
}

export default EventDetails