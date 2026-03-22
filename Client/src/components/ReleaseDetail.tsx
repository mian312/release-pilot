import React, { useState, useEffect } from 'react';
import type { Release, UpdateReleaseDTO } from '../types';

const STEPS = [
  'All relevant GitHub pull requests have been merged',
  'CHANGELOG.md files have been updated',
  'All tests are passing',
  'Releases in GitHub created',
  'Deployed in demo',
  'Tested thoroughly in demo',
  'Deployed in production'
];

interface ReleaseDetailProps {
  release: Release;
  onBack: () => void;
  onSave: (id: string, data: UpdateReleaseDTO) => void;
  onUpdateSteps: (id: string, steps: boolean[]) => void;
  onDelete: (id: string) => void;
}

const ReleaseDetail: React.FC<ReleaseDetailProps> = ({ release, onBack, onSave, onUpdateSteps, onDelete }) => {
  const [formData, setFormData] = useState<UpdateReleaseDTO>({
    name: release.name,
    date: new Date(release.date).toISOString().split('T')[0],
    additionalInfo: release.additionalInfo || ''
  });

  const [steps, setSteps] = useState<boolean[]>(release.steps || Array(STEPS.length).fill(false));

  useEffect(() => {
    setFormData({
      name: release.name,
      date: new Date(release.date).toISOString().split('T')[0],
      additionalInfo: release.additionalInfo || ''
    });
    setSteps(release.steps || Array(STEPS.length).fill(false));
  }, [release]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStepToggle = (index: number) => {
    const newSteps = [...steps];
    newSteps[index] = !newSteps[index];
    setSteps(newSteps);
    onUpdateSteps(release.id, newSteps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(release.id, formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <nav className="text-sm font-medium">
          <button onClick={onBack} className="text-indigo-600 hover:text-indigo-800">All releases</button>
          <span className="mx-2 text-slate-400">&gt;</span>
          <span className="text-slate-500">{release.name}</span>
        </nav>
        <button 
          onClick={() => onDelete(release.id)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-sm hover:bg-indigo-700 transition font-medium flex items-center gap-2"
        >
          Delete <span className="text-xl">🗑️</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-sm p-8 shadow-sm">
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Release</label>
            <input 
              type="text" 
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-sm px-3 py-2 outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
            <input 
              type="date" 
              name="date"
              value={formData.date || ''}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-sm px-3 py-2 outline-none focus:border-indigo-500 transition"
            />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {STEPS.map((step, index) => (
            <label key={index} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={steps[index] || false}
                onChange={() => handleStepToggle(index)}
                className="w-5 h-5 border-slate-300 rounded-sm text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className="text-slate-600 group-hover:text-slate-900 transition">{step}</span>
            </label>
          ))}
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Additional remarks / tasks</label>
          <textarea 
            name="additionalInfo"
            value={formData.additionalInfo || ''}
            onChange={handleChange}
            placeholder="Please enter any other important notes for the release"
            className="w-full border border-slate-200 rounded-sm px-3 py-2 h-32 outline-none focus:border-indigo-500 transition resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            className="bg-indigo-600 text-white px-10 py-2 rounded-sm hover:bg-indigo-700 transition font-medium flex items-center gap-2"
          >
            Save <span className="text-xl">✓</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReleaseDetail;
