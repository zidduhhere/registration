import { type UseFormRegister, type FieldErrors } from "react-hook-form";

interface ScreenshotUploadProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const ScreenshotUpload = ({ register, errors }: ScreenshotUploadProps) => {
  return (
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
  );
};

export default ScreenshotUpload;
