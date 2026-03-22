import React from 'react';
import type { Release } from '../types';

interface ReleaseTableProps {
  releases: Release[];
  onView: (release: Release) => void;
  onDelete: (id: string) => void;
}

const ReleaseTable: React.FC<ReleaseTableProps> = ({ releases, onView, onDelete }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 font-semibold text-slate-700">Release</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Date</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
            <th className="px-4 py-3 font-semibold text-slate-700 text-right w-32"></th>
            <th className="px-4 py-3 font-semibold text-slate-700 text-right w-32"></th>
          </tr>
        </thead>
        <tbody>
          {releases.map((release) => (
            <tr key={release.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <td className="px-4 py-4 text-slate-600 font-medium">{release.name}</td>
              <td className="px-4 py-4 text-slate-500">
                {new Date(release.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </td>
              <td className="px-4 py-4">
                <span className={`capitalize ${
                  release.status === 'done' ? 'text-slate-600' : 
                  release.status === 'ongoing' ? 'text-amber-600' : 'text-slate-400'
                }`}>
                  {release.status}
                </span>
              </td>
              <td className="px-4 py-4 text-right">
                <button 
                  onClick={() => onView(release)}
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium"
                >
                  View <span className="text-xl">👁️</span>
                </button>
              </td>
              <td className="px-4 py-4 text-right">
                <button 
                  onClick={() => onDelete(release.id)}
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium"
                >
                  Delete <span className="text-xl">🗑️</span>
                </button>
              </td>
            </tr>
          ))}
          {releases.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-slate-400 italic">No releases found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReleaseTable;
