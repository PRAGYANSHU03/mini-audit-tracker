import { Observation } from '../types';

const STORAGE_KEY = 'audit-observations';

export const getObservations = (): Observation[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
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