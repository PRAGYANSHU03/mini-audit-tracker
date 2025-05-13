export type Severity = 'High' | 'Medium' | 'Low';
export type Status = 'Open' | 'In Progress' | 'Closed';

export interface Observation {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: Status;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  evidence?: string; // base64 string for file
  evidenceName?: string;
}

export interface User {
  id: string;
  name: string;
} 