interface StatisticsProps {
  statistics: {
    total: number;
    byEvent: { [key: string]: number };
    recent: number;
  };
  selectedEvent: string;
}

const Statistics = ({ statistics, selectedEvent }: StatisticsProps) => {
  const eventEntries = Object.entries(statistics.byEvent).sort((a, b) => b[1] - a[1]);

  return (
    <div className="mb-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Registrations */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm clash mb-1">Total Registrations</p>
              <p className="text-4xl font-bold clash">{statistics.total}</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className="text-blue-100 text-xs mt-3 serif">
            {selectedEvent === 'all' ? 'Across all events' : 'For selected event'}
          </p>
        </div>

        {/* Recent Registrations */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm clash mb-1">Last 24 Hours</p>
              <p className="text-4xl font-bold clash">{statistics.recent}</p>
            </div>
            <div className="bg-green-400 bg-opacity-30 rounded-full p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-green-100 text-xs mt-3 serif">New registrations today</p>
        </div>

        {/* Active Events */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm clash mb-1">Active Events</p>
              <p className="text-4xl font-bold clash">{eventEntries.length}</p>
            </div>
            <div className="bg-purple-400 bg-opacity-30 rounded-full p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <p className="text-purple-100 text-xs mt-3 serif">With registrations</p>
        </div>
      </div>

      {/* Event Breakdown */}
      {selectedEvent === 'all' && eventEntries.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 clash mb-4">Registrations by Event</h3>
          <div className="space-y-3">
            {eventEntries.map(([eventName, count]) => {
              const percentage = (count / statistics.total) * 100;
              return (
                <div key={eventName}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-gray-700 clash">{eventName}</span>
                    <span className="text-sm text-gray-600 serif">{count} registrations</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
