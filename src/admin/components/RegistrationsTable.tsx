import { useState } from 'react';

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
}

const RegistrationsTable = ({ registrations }: RegistrationsTableProps) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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
                      <button
                        onClick={() => toggleRow(reg.id)}
                        className="text-blue-600 hover:text-blue-800 font-semibold clash"
                      >
                        {expandedRow === reg.id ? 'Hide Details' : 'View Details'}
                      </button>
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
    </div>
  );
};

export default RegistrationsTable;
