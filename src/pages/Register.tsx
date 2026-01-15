import Stepper, { Step } from "../components/Stepper";
import { eventGuidelines, type EventGuidelines } from "../data/events";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRegistration } from "../hooks/useRegistration";
import type { RegistrationData } from "../types/Registration";
import LeaderInformation from "../components/registration/LeaderInformation";
import EventSelection from "../components/registration/EventSelection";
import TeamMembers from "../components/registration/TeamMembers";
import PaymentStep from "../components/registration/PaymentStep";
import ScreenshotUpload from "../components/registration/ScreenshotUpload";

const Register = () => {

  const {register, handleSubmit, formState: {errors}, trigger, setValue, getValues} = useForm();
  const [eventSelected, setEventSelected] = useState<EventGuidelines | null>(null);
  const [showRetry, setShowRetry] = useState(false);
  const [savedFormData, setSavedFormData] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { register: registerUser, loading, error: registrationError } = useRegistration();

  // Load saved data from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('registrationFormData');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setSavedFormData(parsedData);
        
        // Restore form values
        Object.keys(parsedData).forEach(key => {
          if (key !== 'eventId') {
            setValue(key, parsedData[key]);
          }
        });
        
        // Restore event selection
        if (parsedData.eventId) {
          const event = eventGuidelines.find(e => e.eventId === parsedData.eventId);
          if (event) {
            setEventSelected(event);
          }
        }
      } catch (err) {
        console.error('Failed to load saved data:', err);
      }
    }
  }, [setValue]);
  
  const onSubmit = async (data: any) => {
    if (!eventSelected) {
      alert('Please select an event');
      return;
    }

    // Get the file from form data
    const fileInput = data.fileUpload?.[0];
    if (!fileInput) {
      alert('Please upload payment screenshot');
      return;
    }

    // Validate file format
    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedFormats.includes(fileInput.type)) {
      alert('Invalid file format! Please upload an image file (JPG, JPEG, PNG, or WEBP only).');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (fileInput.size > maxSize) {
      alert('File size too large! Please upload an image smaller than 5MB.');
      return;
    }

    // Prepare members array
    const members = [];
    for (let i = 1; i <= (eventSelected.maximumTeamSize || 0); i++) {
      const memberName = data[`nameMember${i}`];
      const memberPhone = data[`phoneNumber${i}`];
      if (memberName && memberPhone) {
        members.push({
          name: memberName,
          phone: memberPhone,
        });
      }
    }

    const registrationData: RegistrationData = {
      eventId: eventSelected.eventId,
      leaderName: data.name,
      leaderPhone: data.phone,
      email: data.email,
      college: data.college,
      members,
      screenshotFile: fileInput,
    };

    const result = await registerUser(registrationData);
    
    if (result.success) {
      // Clear sessionStorage on success
      sessionStorage.removeItem('registrationFormData');
      setShowSuccess(true);
    } else {
      // Show retry option on failure
      setShowRetry(true);
      setSavedFormData(data);
    }
  };

  const handleRetry = () => {
    setShowRetry(false);
    // Trigger form submission again with saved data
    handleSubmit(onSubmit)();
  };

  // Validate current step before allowing navigation
  const validateStep = async (step: number): Promise<boolean> => {
    switch(step) {
      case 1:
        // Validate step 1 fields
        return await trigger(['name', 'college', 'email', 'phone']);
      case 2:
        // Validate event selection
        return eventSelected !== null;
      case 3:
        // Validate team members
        const memberFields: string[] = [];
        for(let i = 0; i < (eventSelected?.minimumTeamSize || 0); i++) {
          memberFields.push(`nameMember${i + 1}`, `phoneNumber${i + 1}`);
        }
        return memberFields.length > 0 ? await trigger(memberFields) : true;
      case 4:
        // Payment step - no validation needed
        return true;
      case 5:
        // Validate file upload
        return await trigger(['fileUpload']);
      default:
        return true;
    }
  };

  const handleStepChange = async (newStep: number, currentStepParam: number): Promise<boolean> => {
    // If moving forward, validate current step
    if(newStep > currentStepParam) {
      const isValid = await validateStep(currentStepParam);
      if(!isValid) {
        console.log(`Step ${currentStepParam} validation failed`);
        return false; // Prevent step change
      }
      
      // Save form data to sessionStorage after successful validation
      const currentFormData = getValues();
      const dataToSave = {
        ...currentFormData,
        eventId: eventSelected?.eventId,
      };
      sessionStorage.setItem('registrationFormData', JSON.stringify(dataToSave));
    }
    return true; // Allow step change
  };

  const handleFinalSubmit = async () => {
    const isValid = await validateStep(5);
    if(isValid) {
      handleSubmit(onSubmit)();
    } else {
      console.log('Final step validation failed');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-12 w-screen">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg clash text-center shadow-2xl border-2 border-gray-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Submitting registration...</p>
            <p className="text-sm text-gray-600 mt-2">Please wait, uploading your data</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {registrationError && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg z-50 max-w-md">
          <strong className="font-bold clash">Error: </strong>
          <span className="block sm:inline serif">{registrationError}</span>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded clash text-sm hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Retry Modal */}
      {showRetry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg clash max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Upload Failed</h2>
            <p className="mb-4 serif">
              Your registration could not be completed. Would you like to retry with your saved details?
            </p>
            <p className="text-sm text-gray-600 mb-6 serif">
              All your entered information has been saved. You can retry the submission without re-entering your details.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleRetry}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
              >
                Retry Submission
              </button>
              <button
                onClick={() => setShowRetry(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 font-semibold"
              >
                Edit Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg clash max-w-md text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-green-600">Registration Successful! 🎉</h2>
            <p className="mb-2 serif text-lg">
              Your registration has been submitted successfully.
            </p>
            <p className="text-sm text-gray-600 mb-6 serif">
              You will receive a confirmation email shortly at <strong>{savedFormData?.email}</strong>
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                navigate('/');
              }}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold text-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

      {/* Saved Data Notification */}
      {savedFormData && (
        <div className="fixed top-20 right-4 bg-blue-100 border-2 border-blue-400 text-blue-700 px-6 py-4 rounded-lg shadow-lg z-40 max-w-sm">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <strong className="font-bold clash">Previous Data Restored</strong>
              <p className="text-sm mt-1 serif">Your previously entered information has been loaded.</p>
              <button
                onClick={() => {
                  sessionStorage.removeItem('registrationFormData');
                  window.location.reload();
                }}
                className="text-xs underline mt-2 hover:text-blue-900"
              >
                Clear saved data
              </button>
            </div>
          </div>
        </div>
      )}

      <div onClick={() => navigate(-1)}  className="w-40 text-center clash font-semibold bg-black absolute left-7 top-10 px-4 py-2  text-white cursor-pointer hover:bg-gray-800">Back</div>

      <div className="clash header">
        <h1 className="text-7xl font-bold mt-30">Register</h1>
      </div>

      <div className="body w-full mx-auto">
        <Stepper
          initialStep={1}
          onStepChange={handleStepChange}
          onFinalStepCompleted={handleFinalSubmit}
          className="h-fit mx-auto w-full"
          backButtonText="Back"
          contentClassName="h-50 m-8"
          footerClassName=""
          nextButtonText="Next"
        stepCircleContainerClassName="h-fit px-0"
          backButtonProps={{
            className: "bg-black text-white px-4 py-2 rounded-md clash hover:bg-gray-800",
          }}
          nextButtonProps={{
            className:
              "bg-green-700 text-white px-4 py-2 h-fit rounded-md clash font-bold hover:bg-green-800",
          }}
          finalButtonProps={{
            className:
              "bg-green-700 text-white px-4 py-2 h-fit rounded-md clash font-bold hover:bg-green-800",
          }}
          stepContainerClassName="text-white"
        >
          <Step>
            <LeaderInformation register={register} errors={errors} />
          </Step>
          
          <Step>
            <EventSelection 
              eventSelected={eventSelected} 
              setEventSelected={setEventSelected} 
            />
          </Step>
          
          <Step>
            <TeamMembers 
              register={register} 
              errors={errors} 
              eventSelected={eventSelected} 
            />
          </Step>
          
          <Step>
            <PaymentStep eventSelected={eventSelected} />
          </Step>
          
          <Step>
            <ScreenshotUpload register={register} errors={errors} />
          </Step>
        </Stepper>
      </div>
      
    </div>
  );
};

export default Register;
