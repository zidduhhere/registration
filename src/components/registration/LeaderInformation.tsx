import { ArrowDownCircle } from "lucide-react";
import { getAllCollegeNames } from "../../data/collegeUnits";
import {type  UseFormRegister, type FieldErrors } from "react-hook-form";

interface LeaderInformationProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const LeaderInformation = ({ register, errors }: LeaderInformationProps) => {
  const colleges: string[] = getAllCollegeNames();

  return (
    <form className="h-fit py-4 mx-2" id="leaderInformation">
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
        className="bg-gray-100 px-4 py-2 text-sm rounded-md clash w-fit"
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
        className="bg-gray-100 w-fit px-4 py-2 rounded-md text-sm text-black clash"
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
        className="bg-gray-100 px-4 py-2 rounded-md text-sm text-black clash w-fit"
      />
      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
    </form>
  );
};

export default LeaderInformation;
