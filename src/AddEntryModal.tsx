import React, { useState } from 'react';

interface AddEntryModalProps {
  projects: string[];
  typesOfWork: string[];
  onSubmit: (entry: { project: string; typeOfWork: string; description: string; hours: number }) => void;
  onCancel: () => void;
}

export default function AddEntryModal({ projects, typesOfWork, onSubmit, onCancel }: AddEntryModalProps) {
  const [project, setProject] = useState('');
  const [typeOfWork, setTypeOfWork] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!project) newErrors.project = 'Project is required.';
    if (!typeOfWork) newErrors.typeOfWork = 'Type of work is required.';
    if (!description.trim()) newErrors.description = 'Task description is required.';
    if (!hours || hours < 1) newErrors.hours = 'Hours must be at least 1.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ project, typeOfWork, description, hours });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={onCancel}>
          <span className="sr-only">Close</span>
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Project *</label>
            <select
              className="w-full border p-2 rounded"
              value={project}
              onChange={e => setProject(e.target.value)}
            >
              <option value="">Project Name</option>
              {projects.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.project && <div className="text-red-500 text-sm mt-1">{errors.project}</div>}
          </div>
          {/* Type of Work */}
          <div>
            <label className="block text-sm font-medium mb-1">Type of Work *</label>
            <select
              className="w-full border p-2 rounded"
              value={typeOfWork}
              onChange={e => setTypeOfWork(e.target.value)}
            >
              <option value="">Select type</option>
              {typesOfWork.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.typeOfWork && <div className="text-red-500 text-sm mt-1">{errors.typeOfWork}</div>}
          </div>
          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Task description *</label>
            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              placeholder="Write text here ..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <div className="text-xs text-gray-400 mt-1">A note for extra info</div>
            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
          </div>
          {/* Hours */}
          <div>
            <label className="block text-sm font-medium mb-1">Hours *</label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="px-2 py-1 border rounded"
                onClick={() => setHours(h => Math.max(1, h - 1))}
              >-</button>
              <input
                type="number"
                className="w-16 border p-2 rounded text-center"
                min={1}
                value={hours}
                onChange={e => setHours(Number(e.target.value))}
              />
              <button
                type="button"
                className="px-2 py-1 border rounded"
                onClick={() => setHours(h => h + 1)}
              >+</button>
            </div>
            {errors.hours && <div className="text-red-500 text-sm mt-1">{errors.hours}</div>}
          </div>
          {/* Buttons */}
          <div className="flex space-x-2 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Add entry
            </button>
            <button
              type="button"
              className="flex-1 border border-gray-300 text-gray-700 font-bold py-2 rounded hover:bg-gray-100"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 