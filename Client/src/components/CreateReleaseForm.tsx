import React, { useState } from 'react';
import type { CreateReleaseDTO } from '../types';

interface CreateReleaseFormProps {
  onSave: (data: CreateReleaseDTO) => void;
  onCancel: () => void;
}

const CreateReleaseForm: React.FC<CreateReleaseFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<CreateReleaseDTO>({
    name: '',
    date: new Date().toISOString().split('T')[0],
    additionalInfo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return alert('Name is required');
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-slate-200 rounded-sm p-8 shadow-xl max-w-xl w-full">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Create New Release</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Release Name *</label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Version 1.0.1"
              className="w-full border border-slate-200 rounded-sm px-3 py-2 outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Date *</label>
            <input 
              type="date" 
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-sm px-3 py-2 outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Info</label>
            <textarea 
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Optional notes..."
              className="w-full border border-slate-200 rounded-sm px-3 py-2 h-24 outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button 
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-slate-500 hover:text-slate-800 font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-indigo-600 text-white px-8 py-2 rounded-sm hover:bg-indigo-700 transition font-medium"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReleaseForm;
