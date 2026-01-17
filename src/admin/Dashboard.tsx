import { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase';
import Statistics from './components/Statistics';
import RegistrationsTable from './components/RegistrationsTable';
import EventFilter from './components/EventFilter';

const events = [
  { id: 'business-pitching', name: 'Business Pitching' },
  { id: 'ai-sprint-workshop', name: 'AI Sprint Workshop' },
  { id: 'rc-car', name: 'RC Car' },
  { id: 'drone-race', name: 'Drone Race' },
  { id: 'code-debugging', name: 'Code Debugging' },
  { id: 'circuit-debugging', name: 'Circuit Debugging' },
  { id: 'web-development', name: 'Web Development' },
  { id: 'design-for-the-sky', name: 'Design for the Sky' },
  { id: 'design-for-civil', name: 'Design for Civil' },
  { id: 'figma-sdp', name: 'Student Dev UI/UX' },
  { id: 'drone-making-workshop', name: 'Drone Making Workshop' },
  { id: 'robotics-workshop', name: 'Robotics Workshop' },
];

const Dashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [selectedEvent]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (selectedEvent === 'all') {
        await fetchAllRegistrations();
      } else {
        await fetchEventRegistrations(selectedEvent);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllRegistrations = async () => {
    let allRegs: any[] = [];
    let stats: any = {
      total: 0,
      byEvent: {},
      recent: 0,
    };

    for (const event of events) {
      try {
        const { data, error } = await supabase
          .from(event.id)
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error(`Error fetching ${event.id}:`, error);
          continue;
        }

        if (data) {
          const enrichedData = data.map(reg => ({
            ...reg,
            eventId: event.id,
            eventName: event.name,
          }));
          
          allRegs = [...allRegs, ...enrichedData];
          stats.byEvent[event.name] = data.length;
          stats.total += data.length;

          // Count registrations from last 24 hours
          const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
          const recentCount = data.filter(reg => 
            new Date(reg.created_at) > yesterday
          ).length;
          stats.recent += recentCount;
        }
      } catch (err) {
        console.error(`Error processing ${event.id}:`, err);
      }
    }

    // Sort all registrations by created_at
    allRegs.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    setRegistrations(allRegs);
    setStatistics(stats);
  };

  const fetchEventRegistrations = async (eventId: string) => {
    const { data, error } = await supabase
      .from(eventId)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const eventName = events.find(e => e.id === eventId)?.name || eventId;
    const enrichedData = data?.map(reg => ({
      ...reg,
      eventId,
      eventName,
    })) || [];

    setRegistrations(enrichedData);

    // Calculate statistics for this event
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = enrichedData.filter(reg => 
      new Date(reg.created_at) > yesterday
    ).length;

    setStatistics({
      total: enrichedData.length,
      byEvent: { [eventName]: enrichedData.length },
      recent: recentCount,
    });
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleExport = () => {
    // Convert registrations to CSV
    if (registrations.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(registrations[0]);
    const csvContent = [
      headers.join(','),
      ...registrations.map(row => 
        headers.map(header => {
          const value = row[header] || '';
          // Escape commas and quotes
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${selectedEvent}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 clash">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1 serif">Event Registration Management System</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 clash font-semibold flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 clash font-semibold flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Filter */}
        <EventFilter
          events={events}
          selectedEvent={selectedEvent}
          onEventChange={setSelectedEvent}
        />

        {/* Statistics */}
        {statistics && <Statistics statistics={statistics} selectedEvent={selectedEvent} />}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <strong className="font-bold clash">Error: </strong>
            <span className="serif">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 clash">Loading registrations...</p>
          </div>
        ) : (
          <RegistrationsTable registrations={registrations} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
