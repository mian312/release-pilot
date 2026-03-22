export type ReleaseStatus = 'planned' | 'ongoing' | 'done';

export interface Release {
  id: string;
  name: string;
  date: string;
  status: ReleaseStatus;
  additionalInfo?: string;
  steps: boolean[];
}

export interface CreateReleaseDTO {
  name: string;
  date: string;
  additionalInfo?: string;
}

export interface UpdateReleaseDTO {
  name?: string;
  date?: string;
  additionalInfo?: string;
}
