import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ReleaseTable from './components/ReleaseTable';
import ReleaseDetail from './components/ReleaseDetail';
import CreateReleaseForm from './components/CreateReleaseForm';
import type { Release, CreateReleaseDTO, UpdateReleaseDTO } from './types';
import * as api from './services/api';

const App: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    try {
      setLoading(true);
      const data = await api.getReleases();
      setReleases(data);
      setError(null);
    } catch (err) {
      setError('Failed to load releases. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRelease = async (data: CreateReleaseDTO) => {
    try {
      await api.createRelease(data);
      setIsCreating(false);
      fetchReleases();
    } catch (err) {
      alert('Error creating release');
    }
  };

  const handleUpdateRelease = async (id: string, data: UpdateReleaseDTO) => {
    try {
      await api.updateReleaseInfo(id, data);
      fetchReleases();
      setView('list');
      setSelectedRelease(null);
    } catch (err) {
      alert('Error updating release');
    }
  };

  const handleUpdateSteps = async (id: string, steps: boolean[]) => {
    try {
      await api.updateReleaseSteps(id, steps);
      setReleases(prev => prev.map(r => r.id === id ? { ...r, steps } : r));
    } catch (err) {
      alert('Error updating steps');
    }
  };

  const handleDeleteRelease = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this release?')) return;
    try {
      await api.deleteRelease(id);
      fetchReleases();
      setView('list');
      setSelectedRelease(null);
    } catch (err) {
      alert('Error deleting release');
    }
  };

  const openDetail = (release: Release) => {
    setSelectedRelease(release);
    setView('detail');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <Header />

        {loading && (
          <div className="text-center py-20 text-slate-400">Loading releases...</div>
        )}

        {error && (
          <div className="text-center py-20 text-red-500 bg-red-50 border border-red-100 rounded-sm">
            {error}
            <button onClick={fetchReleases} className="block mx-auto mt-4 text-indigo-600 font-medium underline">Retry</button>
          </div>
        )}

        {!loading && !error && view === 'list' && (
          <>
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => setIsCreating(true)}
                className="bg-indigo-600 text-white px-5 py-2 rounded-sm hover:bg-indigo-700 transition font-medium flex items-center gap-2"
              >
                New release <span className="text-xl">+</span>
              </button>
            </div>
            <ReleaseTable 
              releases={releases} 
              onView={openDetail}
              onDelete={handleDeleteRelease}
            />
          </>
        )}

        {!loading && !error && view === 'detail' && selectedRelease && (
          <ReleaseDetail 
            release={selectedRelease}
            onBack={() => setView('list')}
            onSave={handleUpdateRelease}
            onUpdateSteps={handleUpdateSteps}
            onDelete={handleDeleteRelease}
          />
        )}

        {isCreating && (
          <CreateReleaseForm 
            onSave={handleCreateRelease}
            onCancel={() => setIsCreating(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
