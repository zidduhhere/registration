import { ArrowDownCircle } from "lucide-react";
import Stepper, { Step } from "../components/Stepper";
import { getAllCollegeNames } from "../data/collegeUnits";
import { eventGuidelines, type EventGuidelines } from "../data/events";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {useForm} from "react-hook-form";

const Register = () => {

  const {register, handleSubmit, formState: {errors}, trigger} = useForm();
  const colleges: string[] = getAllCollegeNames();
  const [eventSelected, setEventSelected] = useState<EventGuidelines | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  
  const onSubmit = (data: any) => {
    console.log("Form Submitted:");
    console.log(data);
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

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if(isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if(currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = async () => {
    const isValid = await validateStep(5);
    if(isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-12 w-screen">
      <div onClick={() => navigate(-1)}  className="w-40 text-center clash font-semibold bg-black absolute left-7 top-10 px-4 py-2  text-white cursor-pointer hover:bg-gray-800">Back</div>

      <div className="clash header">
        <h1 className="text-7xl font-bold mt-30">Register</h1>
      </div>

      <div className="body w-full mx-auto">
        <Stepper
          initialStep={currentStep}
          onStepChange={(newStep) => {
            setCurrentStep(newStep);
          }}
          onFinalStepCompleted={handleFinalSubmit}
          className="h-fit mx-auto w-full"
          backButtonText="Back"
          contentClassName="h-50 m-8"
          footerClassName=""
          nextButtonText="Next"
          stepCircleContainerClassName="h-fit px-0"
          backButtonProps={{
            className: "bg-black text-white px-4 py-2 rounded-md clash hover:bg-gray-800",
            onClick: handleBack
          }}
          nextButtonProps={{
            className:
              "bg-green-700 text-white px-4 py-2 h-fit rounded-md clash font-bold hover:bg-green-800",
            onClick: handleNext
          }}
          finalButtonProps={{
            className:
              "bg-green-700 text-white px-4 py-2 h-fit rounded-md clash font-bold hover:bg-green-800",
            onClick: handleFinalSubmit
          }}
          stepContainerClassName="text-white"
        >
          <Step>
            <form
              className="h-fit py-4 mx-2"
              id="leaderInformation"
            >
              <label
                htmlFor="name"
                className="block clash text-sm font-semibold mb-2"
              >
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                type="text"
                placeholder="Name"
                className="bg-gray-100 px-4 py-2 text-sm rounded-md clash w-full"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}

              <div className="max-w-fit relative mt-4">
                <ArrowDownCircle className="inline-block absolute w-4 top-1/2 right-2" />

                <label
                  htmlFor="college"
                  className="block clash text-sm font-semibold mb-2"
                >
                  Your College <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('college', { required: 'College selection is required' })}
                  className="bg-gray-100 px-4 py-2 rounded-md clash max-w-120 text-sm"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your college
                  </option>
                  {colleges.map((college, index) => (
                    <option key={index} value={college.toUpperCase()}>
                      {college.toUpperCase()}
                    </option>
                  ))}
                  <option value="other" className="font-bold">College Not Listed</option>
                </select>
                {errors.college && <p className="text-red-500 text-xs mt-1">{errors.college.message as string}</p>}
              </div>

              <label
                htmlFor="email"
                className="block clash text-sm font-semibold mb-2 mt-4"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                placeholder="Email"
                className="bg-gray-100 px-4 py-2 rounded-md text-sm text-black clash w-full"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}

              <label
                htmlFor="phone"
                className="block clash text-sm font-semibold mb-2 mt-4"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                {...register('phone', { 
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be 10 digits'
                  }
                })}
                type="tel"
                placeholder="Phone Number"
                className="bg-gray-100 px-4 py-2 rounded-md text-sm text-black clash w-full"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
            </form>
          </Step>
          
          <Step>
            <form
              className="h-fit py-4 mx-2"
              id="eventSelection"
            >
              <div className="max-w-fit relative">
                <ArrowDownCircle className="inline-block absolute w-4 top-1/2 right-2" />
                <label
                  htmlFor="eventSelection"
                  className="block clash text-sm font-semibold mb-2 mt-4"
                >
                  Select The Event <span className="text-red-500">*</span>
                </label>
                <select
                  value={eventSelected?.eventName || ""}
                  onChange={(e) => {
                    const selected = eventGuidelines.find(eg => eg.eventName === e.target.value) || null;
                    setEventSelected(selected);
                  }}
                  className="bg-gray-100 px-4 py-2 min-w-50 rounded-md clash text-sm overflow-hidden"
                  name="event"
                  id="eventSelection"
                >
                  <option value="" disabled>
                    Select an event
                  </option>
                  {eventGuidelines.map((event, index) => (
                    <option key={index} value={event.eventName}>
                      {event.eventName}
                    </option>
                  ))}
                </select>
                {!eventSelected && (
                  <p className="text-red-500 text-xs mt-1">Please select an event</p>
                )}
              </div>
            </form>

            {eventSelected && (
              <Link
                to={`/events/${eventSelected.eventId}`}
                className="clash text-sm underline leading-2 mx-2 text-[#5227FF]"
              >
                Check {eventSelected?.eventName} details
              </Link>
            )}
          </Step>
          
          <Step>
            <form
              className="h-fit py-1 mx-2"
              id="finalForm"
            >
              <h3 className="clash font-semibold tracking-normal">
                {eventSelected?.maximumTeamSize === 1
                  ? "This is an individual event."
                  : `You need ${eventSelected?.minimumTeamSize} to ${eventSelected?.maximumTeamSize} members to register a team.`}
              </h3>

              {Array.from({length: eventSelected ? eventSelected.maximumTeamSize : 0}).map((_, i) => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <div>
                    <label
                      htmlFor={`nameMember${i + 1}`}
                      className="block clash text-sm mb-2 mt-4"
                    >
                      Member {i + 1} Name
                      <span className="text-red-500">{i < (eventSelected?.minimumTeamSize || 0) ? "*" : ""}</span>
                    </label>
                    <input
                      type="text"
                      placeholder={`Member ${i + 1} Name`}
                      {...register(`nameMember${i + 1}`, { 
                        required: i < (eventSelected?.minimumTeamSize || 0) ? 'This field is required' : false 
                      })}
                      className="bg-gray-100 px-4 py-2 rounded-md text-sm max-w-[40vw] text-black clash"
                    />
                    {errors[`nameMember${i + 1}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {(errors[`nameMember${i + 1}`] as any)?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor={`phoneNumber${i + 1}`}
                      className="block clash text-sm mb-2 mt-4"
                    >
                      Phone {i + 1} Number
                      <span className="text-red-500">{i < (eventSelected?.minimumTeamSize || 0) ? "*" : ""}</span>
                    </label>
                    <input
                      type="text"
                      placeholder={`Phone ${i + 1} Number`}
                      {...register(`phoneNumber${i + 1}`, { 
                        required: i < (eventSelected?.minimumTeamSize || 0) ? 'This field is required' : false,
                        pattern: i < (eventSelected?.minimumTeamSize || 0) ? {
                          value: /^[0-9]{10}$/,
                          message: 'Must be 10 digits'
                        } : undefined
                      })}
                      className="bg-gray-100 px-4 py-2 rounded-md text-sm max-w-[40vw] text-black clash"
                    />
                    {errors[`phoneNumber${i + 1}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {(errors[`phoneNumber${i + 1}`] as any)?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </form>
          </Step>
          
          <Step>
            <div className="flex flex-col justify-center items-center gap-8 py-4 mx-2">
              <img src={eventSelected?.price} className="w-100 rounded-2xl shadow-md" />

              <label className="clash text-lg font-semibold">
                Scan the QR code to complete the payment.
              </label>
              <label className="clash text-md text-center max-w-md">
                After completing the payment, please save the payment receipt
                and upload it in the next step.
              </label>
            </div>
          </Step>
          
          <Step>
            <div className="flex flex-col justify-center items-center gap-8 py-4 mx-2 screenshot">
              <label className="clash font-semibold" htmlFor="fileUpload">
                Upload the screenshot <span className="text-red-500">*</span>
              </label>
              <input 
                {...register('fileUpload', { 
                  required: 'Payment screenshot is required',
                  validate: {
                    fileSize: (files) => {
                      if(!files || files.length === 0) return true;
                      return files[0].size < 5000000 || 'File size must be less than 5MB';
                    },
                    fileType: (files) => {
                      if(!files || files.length === 0) return true;
                      return ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0].type) || 'Only JPG, JPEG, PNG allowed';
                    }
                  }
                })}
                className="bg-gray-100 p-2 rounded-md clash text-black" 
                type="file" 
                id="fileUpload" 
                accept="image/*" 
              />
              {errors.fileUpload && (
                <p className="text-red-500 text-xs mt-1">{errors.fileUpload.message as string}</p>
              )}
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );
};

export default Register;
