import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Observation, Status } from '../types';
import { getObservationById, saveObservation } from '../utils/storage';

const ObservationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [observation, setObservation] = useState<Observation | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedObservation, setEditedObservation] = useState<Partial<Observation>>({});

  useEffect(() => {
    if (id) {
      const obs = getObservationById(id);
      if (obs) {
        setObservation(obs);
        setEditedObservation(obs);
      } else {
        navigate('/observations');
      }
    }
  }, [id, navigate]);

  const handleStatusChange = (newStatus: Status) => {
    if (observation) {
      const updatedObservation = {
        ...observation,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };
      saveObservation(updatedObservation);
      setObservation(updatedObservation);
      setEditedObservation(updatedObservation);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedObservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (observation) {
      const updatedObservation = {
        ...observation,
        ...editedObservation,
        updatedAt: new Date().toISOString(),
      };
      saveObservation(updatedObservation);
      setObservation(updatedObservation);
      setIsEditing(false);
    }
  };

  if (!observation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Observation Details</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/observations')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to List
          </button>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={editedObservation.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ) : (
              <p className="mt-1 text-lg">{observation.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            {isEditing ? (
              <textarea
                name="description"
                rows={4}
                value={editedObservation.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ) : (
              <p className="mt-1 whitespace-pre-wrap">{observation.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Severity</label>
              {isEditing ? (
                <select
                  name="severity"
                  value={editedObservation.severity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              ) : (
                <span
                  className={`mt-1 inline-flex px-2 py-1 text-sm font-semibold rounded-full ${
                    observation.severity === 'High'
                      ? 'bg-red-100 text-red-800'
                      : observation.severity === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {observation.severity}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              {isEditing ? (
                <select
                  name="status"
                  value={editedObservation.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              ) : (
                <div className="mt-1 space-x-2">
                  <span
                    className={`inline-flex px-2 py-1 text-sm font-semibold rounded-full ${
                      observation.status === 'Closed'
                        ? 'bg-green-100 text-green-800'
                        : observation.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {observation.status}
                  </span>
                  {!isEditing && (
                    <div className="mt-2 space-x-2">
                      {observation.status !== 'Open' && (
                        <button
                          onClick={() => handleStatusChange('Open')}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          Mark as Open
                        </button>
                      )}
                      {observation.status !== 'In Progress' && (
                        <button
                          onClick={() => handleStatusChange('In Progress')}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          Mark as In Progress
                        </button>
                      )}
                      {observation.status !== 'Closed' && (
                        <button
                          onClick={() => handleStatusChange('Closed')}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          Mark as Closed
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Assigned To</label>
              {isEditing ? (
                <input
                  type="text"
                  name="assignedTo"
                  value={editedObservation.assignedTo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <p className="mt-1">{observation.assignedTo}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Created</label>
              <p className="mt-1">{new Date(observation.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {observation.evidence && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Supporting Evidence</label>
              <div className="mt-2">
                <img
                  src={observation.evidence}
                  alt="Evidence"
                  className="max-w-lg rounded-lg shadow"
                />
                <p className="mt-1 text-sm text-gray-500">{observation.evidenceName}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObservationDetail; 