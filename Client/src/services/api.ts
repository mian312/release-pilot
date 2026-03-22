import type { Release, CreateReleaseDTO, UpdateReleaseDTO } from '../types';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';

export const getReleases = async (): Promise<Release[]> => {
  const response = await fetch(`${API_URL}/api/releases`);
  if (!response.ok) throw new Error('Failed to fetch releases');
  return response.json();
};

export const createRelease = async (releaseData: CreateReleaseDTO): Promise<Release> => {
  const response = await fetch(`${API_URL}/api/releases`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: window.JSON.stringify(releaseData),
  });
  if (!response.ok) throw new Error('Failed to create release');
  return response.json();
};

export const updateReleaseInfo = async (id: string, data: UpdateReleaseDTO): Promise<Release> => {
  const response = await fetch(`${API_URL}/api/releases/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: window.JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update release info');
  return response.json();
};

export const updateReleaseSteps = async (id: string, steps: boolean[]): Promise<Release> => {
  const response = await fetch(`${API_URL}/api/releases/${id}/steps`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: window.JSON.stringify({ steps }),
  });
  if (!response.ok) throw new Error('Failed to update steps');
  return response.json();
};

export const deleteRelease = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/releases/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete release");
};
