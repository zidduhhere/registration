interface DeleteConfirmationModalProps {
  isOpen: boolean;
  registration: {
    id: number;
    leader_name: string;
    eventName: string;
  } | null;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

/**
 * Delete Confirmation Modal Component
 * Provides a better UX than browser alerts for delete confirmations
 */
const DeleteConfirmationModal = ({
  isOpen,
  registration,
  onConfirm,
  onCancel,
  isDeleting,
}: DeleteConfirmationModalProps) => {
  if (!isOpen || !registration) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={isDeleting ? undefined : onCancel}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          {/* Icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 clash mb-2">
              Delete Registration?
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500 serif mb-4">
                Are you sure you want to permanently delete this registration?
              </p>
              <div className="bg-gray-50 rounded-lg p-3 text-left space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 serif">ID:</span>
                  <span className="font-mono text-gray-900">#{registration.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 serif">Leader:</span>
                  <span className="font-semibold text-gray-900 serif">{registration.leader_name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 serif">Event:</span>
                  <span className="text-gray-900 serif">{registration.eventName}</span>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-left">
                <p className="text-xs text-red-800 serif font-semibold mb-2">
                  ⚠️ This will permanently delete:
                </p>
                <ul className="text-xs text-red-700 serif space-y-1 list-disc list-inside">
                  <li>Registration record from database</li>
                  <li>Payment screenshot from storage</li>
                  <li>All associated team member data</li>
                </ul>
                <p className="text-xs text-red-800 serif font-semibold mt-2">
                  This action cannot be undone!
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold clash disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold clash disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Permanently
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
