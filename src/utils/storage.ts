import { Observation } from '../types';

const STORAGE_KEY = 'audit-observations';

const dummyData: Observation[] = [
  {
    id: '1',
    title: 'Sample Observation 1',
    description: 'This is a test observation.',
    severity: 'High',
    status: 'Open',
    assignedTo: 'Alice',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    evidence: undefined,
    evidenceName: undefined,
  },
  {
    id: '2',
    title: 'Sample Observation 2',
    description: 'Another test observation.',
    severity: 'Medium',
    status: 'In Progress',
    assignedTo: 'Bob',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    evidence: undefined,
    evidenceName: undefined,
  },
];

export const getObservations = (): Observation[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
  return dummyData;
};

export const saveObservation = (observation: Observation): void => {
  const observations = getObservations();
  const index = observations.findIndex(o => o.id === observation.id);
  
  if (index >= 0) {
    observations[index] = observation;
  } else {
    observations.push(observation);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(observations));
};

export const deleteObservation = (id: string): void => {
  const observations = getObservations().filter(o => o.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(observations));
};

export const getObservationById = (id: string): Observation | undefined => {
  return getObservations().find(o => o.id === id);
}; 