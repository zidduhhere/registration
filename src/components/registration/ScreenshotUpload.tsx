import { type UseFormRegister, type FieldErrors } from "react-hook-form";

interface ScreenshotUploadProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  onFileValidityChange: (isValid: boolean) => void;
  watch: any; // Using any to avoid complex generic typing for now, or UseFormWatch<any>
  setValue: any; // UseFormSetValue<any>
}

const ScreenshotUpload = ({
  register,
  errors,
  onFileValidityChange,
  watch,
  setValue,
}: ScreenshotUploadProps) => {
  const isOffline = watch("offlinePayment");

  // Update validity when offline mode changes
  if (isOffline) {
    onFileValidityChange(true);
  } else {
    // Re-check file validity if switching back to online
    const file = watch("fileUpload");
    if (file && file.length > 0) {
      // Simple check (could replicate the detailed check if needed, or rely on onChange to trigger it)
      // But handleFileChange checks event target.
      // We can trigger validation or just rely on form state?
      // Let's just trust the user re-selecting or the form state.
      // Actually, easier to just re-validate or set validity based on current file value.
      const currentFile = file[0];
      if (currentFile) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        const isValidType = allowedTypes.includes(currentFile.type);
        const isValidSize = currentFile.size < 5000000;
        onFileValidityChange(isValidType && isValidSize);
      } else {
        onFileValidityChange(false);
      }
    } else {
      onFileValidityChange(false);
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      onFileValidityChange(false);
      return;
    }

    const file = files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const isValidType = allowedTypes.includes(file.type);
    const isValidSize = file.size < 5000000; // 5MB

    onFileValidityChange(isValidType && isValidSize);
  };

  // Effect to handle offline toggle validity updates
  // We can't use useEffect here easily if we don't import it, but we can handle it in the render or onChange
  // Better to just handle it in the checkbox onChange actually.

  return (
    <div className="flex flex-col justify-center items-center gap-8 py-4 mx-2 screenshot">
      <h4 className="clash text-red-500">
        The screenshot size shouuld be less than 2MB
      </h4>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          {...register("offlinePayment", {
            onChange: (e) => {
              const checked = e.target.checked;
              if (checked) {
                onFileValidityChange(true);
                setValue("fileUpload", null); // Clear file provided
              } else {
                onFileValidityChange(false);
              }
            },
          })}
          className="w-5 h-5 accent-black"
        />
        <span className="clash text-lg">Offline Payment</span>
      </label>

      {!isOffline && (
        <>
          <label className="clash font-semibold" htmlFor="fileUpload">
            Upload the screenshot <span className="text-red-500">*</span>
          </label>
          <input
            {...register("fileUpload", {
              required: !isOffline ? "Payment screenshot is required" : false,
              validate: {
                fileSize: (files) => {
                  if (isOffline) return true;
                  if (!files || files.length === 0) return true; // Handled by required
                  return (
                    files[0].size < 5000000 || "File size must be less than 5MB"
                  );
                },
                fileType: (files) => {
                  if (isOffline) return true;
                  if (!files || files.length === 0) return true; // Handled by required
                  return (
                    ["image/jpeg", "image/png", "image/jpg"].includes(
                      files[0].type,
                    ) || "Only JPG, JPEG, PNG allowed"
                  );
                },
              },
              onChange: handleFileChange,
            })}
            className="bg-gray-100 p-2 rounded-md clash text-black"
            type="file"
            id="fileUpload"
            accept="image/*"
          />
        </>
      )}
      {errors.fileUpload && (
        <p className="text-red-500 text-xs mt-1">
          {errors.fileUpload.message as string}
        </p>
      )}
    </div>
  );
};

export default ScreenshotUpload;
