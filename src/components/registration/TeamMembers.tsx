import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import type { EventGuidelines } from "../../data/events";

interface TeamMembersProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  eventSelected: EventGuidelines | null;
}

const TeamMembers = ({ register, errors, eventSelected }: TeamMembersProps) => {
  return (
    <form className="h-fit py-1 mx-2" id="finalForm">
      <h3 className="clash font-semibold tracking-normal">
        {eventSelected?.maximumTeamSize === 1
          ? "This is an individual event."
          : `You need ${eventSelected?.minimumTeamSize} to ${eventSelected?.maximumTeamSize} members to register a team.`}
      </h3>

      {eventSelected?.maximumTeamSize === 1 ? (
        <p className="clash mt-4">No additional members needed for this event.</p>
      ) : (
        Array.from({length: eventSelected ? eventSelected.maximumTeamSize - 1 : 0}).map((_, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor={`nameMember${i + 1}`}
                className="block clash text-sm mb-2 mt-4"
              >
                Member {i + 1} Name
                <span className="text-red-500">{i < ((eventSelected?.maximumTeamSize ?? 2) - 2 || 0) ? "*" : ""}</span>
              </label>
              <input
                type="text"
                placeholder={`Member ${i + 1} Name`}
                {...register(`nameMember${i + 1}`, { 
                  required: i < ((eventSelected?.maximumTeamSize ?? 2) - 2 || 0) ? 'This field is required' : false
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
                <span className="text-red-500">{i < ((eventSelected?.maximumTeamSize ?? 2) - 2 || 0) ? "*" : ""}</span>
              </label>
              <input
                type="text"
                placeholder={`Phone ${i + 1} Number`}
                {...register(`phoneNumber${i + 1}`, { 
                  required: i < ((eventSelected?.maximumTeamSize ?? 2) - 2 || 0) ? 'This field is required' : false,
                  pattern: i < ((eventSelected?.maximumTeamSize ?? 2) - 2 || 0) ? {
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
        ))
      )}
    </form>
  );
};

export default TeamMembers;
