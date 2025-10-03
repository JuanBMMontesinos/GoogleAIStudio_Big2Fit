
import React, { useState, useMemo, useContext } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { UserContext } from '../../context/UserContext';
import { EXERCISE_LIST } from '../../constants';
import { Exercise } from '../../types';

interface AddExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddExerciseModal: React.FC<AddExerciseModalProps> = ({ isOpen, onClose }) => {
  const { addExercise } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [duration, setDuration] = useState(30); // in minutes

  const filteredExercises = useMemo(() => {
    if (!searchTerm) return EXERCISE_LIST;
    return EXERCISE_LIST.filter(ex =>
      ex.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const resetState = () => {
    setSearchTerm('');
    setSelectedExercise(null);
    setDuration(30);
  };

  const handleAddClick = () => {
    if (selectedExercise && duration > 0) {
      addExercise(selectedExercise, duration);
      onClose();
      resetState();
    }
  };
  
  const handleClose = () => {
      onClose();
      resetState();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Adicionar Exercício">
      <div className="space-y-4">
        <Input label="Buscar Exercício" id="search-exercise" type="text" placeholder="Ex: Corrida" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
          {filteredExercises.map(ex => (
            <div key={ex.id} onClick={() => setSelectedExercise(ex)} className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedExercise?.id === ex.id ? 'bg-teal-500/20 ring-2 ring-teal-500' : 'bg-gray-700 hover:bg-gray-600'}`}>
              <p className="font-semibold text-white">{ex.name}</p>
              <p className="text-xs text-gray-400">{ex.caloriesBurned} kcal/min</p>
            </div>
          ))}
        </div>
        {selectedExercise && (
          <div className="mt-4 flex items-center space-x-4">
            <Input label="Duração (min)" id="duration" type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-24" min="1"/>
            <Button onClick={handleAddClick} className="self-end">Adicionar</Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddExerciseModal;
