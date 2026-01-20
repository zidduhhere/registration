import { isDebugMode, supabaseAdmin } from '../../supabase/supabase';

/**
 * Debug Mode Indicator Component
 * Shows the current debug mode status and configuration
 */
const DebugModeIndicator = () => {
  if (!isDebugMode) {
    return null; // Don't show anything in production mode
  }

  const hasServiceKey = !!supabaseAdmin;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex items-start">
        <div className="shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-semibold text-yellow-800 clash flex items-center gap-2">
            🔧 Debug Mode Active
            {hasServiceKey && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                Service Key Connected
              </span>
            )}
          </h3>
          <div className="mt-2 text-sm text-yellow-700 serif">
            <ul className="list-disc list-inside space-y-1">
              <li>Delete functionality is enabled for registrations</li>
              <li>Screenshots will be permanently removed from storage</li>
              <li>All deletions are irreversible - use with caution</li>
              {!hasServiceKey && (
                <li className="text-red-600 font-semibold">
                  ⚠️ Service key not configured - delete functionality unavailable
                </li>
              )}
            </ul>
          </div>
          <div className="mt-3 text-xs text-yellow-600 serif italic">
            ⚠️ Never enable debug mode in production environments
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugModeIndicator;
