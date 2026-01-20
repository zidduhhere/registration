import { useState } from 'react';
import { supabaseAdmin, isDebugMode } from '../../supabase/supabase';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface Registration {
  id: number;
  eventId: string;
  eventName: string;
  leader_name: string;
  leader_phone: string;
  email?: string;
  college?: string;
  screenshot_url: string;
  created_at: string;
  [key: string]: any;
}

interface RegistrationsTableProps {
  registrations: Registration[];
  onDelete?: () => void;
}

const RegistrationsTable = ({ registrations, onDelete }: RegistrationsTableProps) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState<Registration | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const itemsPerPage = 20;

  // Filter registrations based on search term
  const filteredRegistrations = registrations.filter(reg => {
    const searchLower = searchTerm.toLowerCase();
    return (
      reg.leader_name?.toLowerCase().includes(searchLower) ||
      reg.leader_phone?.toLowerCase().includes(searchLower) ||
      reg.email?.toLowerCase().includes(searchLower) ||
      reg.eventName?.toLowerCase().includes(searchLower) ||
      reg.college?.toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRegistrations = filteredRegistrations.slice(startIndex, endIndex);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getMemberInfo = (reg: Registration) => {
    const members = [];
    for (let i = 1; i <= 4; i++) {
      const name = reg[`member${i}_name`];
      const phone = reg[`member${i}_phone`];
      if (name || phone) {
        members.push({ name, phone, number: i });
      }
    }
    return members;
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleDeleteClick = (reg: Registration) => {
    if (!isDebugMode || !supabaseAdmin) {
      showToast('Delete function is only available in debug mode with service key configured.', 'error');
      return;
    }
    setRegistrationToDelete(reg);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!registrationToDelete) return;

    setDeletingId(registrationToDelete.id);

    try {
      // Extract screenshot file path from URL
      let screenshotPath = null;
      if (registrationToDelete.screenshot_url) {
        const url = new URL(registrationToDelete.screenshot_url);
        const pathMatch = url.pathname.match(/\/storage\/v1\/object\/public\/registration-screenshots\/(.+)/);
        if (pathMatch) {
          screenshotPath = pathMatch[1];
        }
      }

      // Delete screenshot from storage if exists
      if (screenshotPath && supabaseAdmin) {
        const { error: storageError } = await supabaseAdmin
          .storage
          .from('registration-screenshots')
          .remove([screenshotPath]);

        if (storageError) {
          console.error('Error deleting screenshot:', storageError);
          // Continue with registration deletion even if screenshot deletion fails
        }
      }

      // Delete registration from database
      if (supabaseAdmin) {
        const { error: dbError } = await supabaseAdmin
          .from(registrationToDelete.eventId)
          .delete()
          .eq('id', registrationToDelete.id);

        if (dbError) {
          throw new Error(`Failed to delete registration: ${dbError.message}`);
        }
      }

      showToast(`Registration #${registrationToDelete.id} deleted successfully!`, 'success');
      setDeleteModalOpen(false);
      setRegistrationToDelete(null);
      
      // Call onDelete callback to refresh data
      if (onDelete) {
        onDelete();
      }
    } catch (error: any) {
      console.error('Delete error:', error);
      showToast(`Failed to delete registration: ${error.message}`, 'error');
    } finally {
      setDeletingId(null);
    }
  };

  if (registrations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 clash mb-2">No Registrations Found</h3>
        <p className="text-gray-500 serif">There are no registrations for the selected event.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, phone, email, event, or college..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none serif"
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-sm text-gray-600 mt-2 serif">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredRegistrations.length)} of {filteredRegistrations.length} registrations
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider clash">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider clash">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider clash">
                Leader Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider clash">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider clash">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider clash">
                Registered At
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider clash">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isDebugMode && (
              <tr className="bg-yellow-50 border-yellow-200">
                <td colSpan={7} className="px-6 py-2 text-center text-sm font-semibold text-yellow-800 clash">
                  🔧 DEBUG MODE - Delete functionality enabled
                </td>
              </tr>
            )}
            {currentRegistrations.map((reg) => {
              const uniqueKey = `${reg.eventId}-${reg.id}`;
              return (
                <>
                  <tr key={uniqueKey} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      #{reg.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 clash">
                        {reg.eventName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 serif">
                      {reg.leader_name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {reg.leader_phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 serif">
                      {reg.email || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 serif">
                      {formatDate(reg.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleRow(reg.id)}
                          className="text-blue-600 hover:text-blue-800 font-semibold clash"
                        >
                          {expandedRow === reg.id ? 'Hide Details' : 'View Details'}
                        </button>
                        {isDebugMode && supabaseAdmin && (
                          <button
                            onClick={() => handleDeleteClick(reg)}
                            disabled={deletingId === reg.id}
                            className="text-red-600 hover:text-red-800 font-semibold clash disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                            title="Delete registration and screenshot"
                          >
                            {deletingId === reg.id ? (
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
                                Delete
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Row */}
                  {expandedRow === reg.id && (
                    <tr key={`${uniqueKey}-expanded`} className="bg-gray-50">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 clash mb-3">Basic Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex">
                                <span className="w-24 text-gray-600 serif">College:</span>
                                <span className="text-gray-900 serif">{reg.college || 'N/A'}</span>
                              </div>
                              <div className="flex">
                                <span className="w-24 text-gray-600 serif">Event ID:</span>
                                <span className="text-gray-900 font-mono text-xs">{reg.eventId}</span>
                              </div>
                            </div>
                          </div>

                          {/* Team Members */}
                          {getMemberInfo(reg).length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 clash mb-3">Team Members</h4>
                              <div className="space-y-2">
                                {getMemberInfo(reg).map((member) => (
                                  <div key={member.number} className="bg-white p-3 rounded border border-gray-200">
                                    <p className="text-xs text-gray-500 clash mb-1">Member {member.number}</p>
                                    <p className="text-sm text-gray-900 serif font-semibold">{member.name || 'N/A'}</p>
                                    <p className="text-sm text-gray-600 font-mono">{member.phone || 'N/A'}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right Column - Screenshot */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 clash mb-3">Payment Screenshot</h4>
                          {reg.screenshot_url ? (
                            <a
                              href={reg.screenshot_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <img
                                src={reg.screenshot_url}
                                alt="Payment Screenshot"
                                className="w-full h-auto rounded-lg border border-gray-300 hover:shadow-lg transition cursor-pointer"
                              />
                              <p className="text-xs text-blue-600 mt-2 clash">Click to open in new tab</p>
                            </a>
                          ) : (
                            <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                              <p className="text-gray-500 serif">No screenshot available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold clash disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 serif">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold clash disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}

      {/* Toast Notifications */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`rounded-lg shadow-lg p-4 flex items-center gap-3 ${
            toast.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            {toast.type === 'success' ? (
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <p className={`text-sm font-semibold serif ${
              toast.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>{toast.message}</p>
            <button
              onClick={() => setToast(null)}
              className={`ml-4 ${
                toast.type === 'success' ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        registration={registrationToDelete}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalOpen(false);
          setRegistrationToDelete(null);
        }}
        isDeleting={deletingId !== null}
      />
    </div>
  );
};

export default RegistrationsTable;
