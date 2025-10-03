import React, { useState, useContext, useMemo } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
// FIX: Corrected import path for UserContext
import { UserContext } from '../../context/UserContext';
// FIX: Corrected import path for types
import { MealType, Food } from '../../types';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: MealType;
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({ isOpen, onClose, mealType }) => {
  const { foodList, addFoodToMeal, addCustomFood } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState<'search' | 'create'>('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [grams, setGrams] = useState(100);
  const [customFood, setCustomFood] = useState({
    name: '', calories: 0, protein: 0, carbs: 0, fat: 0, grams: 100
  });

  const filteredFoods = useMemo(() => {
    if (!searchTerm) return foodList;
    return foodList.filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, foodList]);

  const handleAddClick = () => {
    if (selectedFood && grams > 0) {
      addFoodToMeal(mealType, selectedFood, grams);
      onClose();
      resetState();
    }
  };

  const handleCreateCustomFood = () => {
    if (customFood.name && customFood.calories >= 0 && customFood.grams > 0) {
      const { grams, ...foodData } = customFood;
      addCustomFood(foodData);
      // Temporarily create a full food object to pass to addFoodToMeal, as the context will handle the real ID
      const newFoodForLog: Food = { ...foodData, id: `temp-${Date.now()}`, isCustom: true };
      addFoodToMeal(mealType, newFoodForLog, grams);
      onClose();
      resetState();
    }
  };

  const resetState = () => {
    setSearchTerm('');
    setSelectedFood(null);
    setGrams(100);
    setCustomFood({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0, grams: 100 });
    setActiveTab('search');
  };

  const handleCustomFoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCustomFood(prev => ({...prev, [name]: name === 'name' ? value : Number(value) }));
  }
  
  const handleClose = () => {
      resetState();
      onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Adicionar em ${mealType}`}>
      <div className="flex border-b border-gray-700 mb-4">
        <button onClick={() => setActiveTab('search')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'search' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}>Buscar</button>
        <button onClick={() => setActiveTab('create')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'create' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400'}`}>Criar Novo</button>
      </div>

      {activeTab === 'search' && (
        <div className="space-y-4">
          <Input label="Buscar Alimento" id="search" type="text" placeholder="Ex: Peito de Frango" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
            {filteredFoods.map(food => (
              <div key={food.id} onClick={() => setSelectedFood(food)} className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedFood?.id === food.id ? 'bg-teal-500/20 ring-2 ring-teal-500' : 'bg-gray-700 hover:bg-gray-600'}`}>
                <p className="font-semibold text-white">{food.name}</p>
                <p className="text-xs text-gray-400">{food.calories} kcal, P:{food.protein}g, C:{food.carbs}g, F:{food.fat}g por 100g</p>
              </div>
            ))}
          </div>
          {selectedFood && (
            <div className="mt-4 flex items-center space-x-4">
              <Input label="Quantidade (g)" id="grams" type="number" value={grams} onChange={e => setGrams(Number(e.target.value))} className="w-24" />
              <Button onClick={handleAddClick} className="self-end">Adicionar</Button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'create' && (
        <div className="space-y-4">
          <Input label="Nome do Alimento" id="customName" name="name" type="text" value={customFood.name} onChange={handleCustomFoodChange}/>
          <Input label="Calorias (por 100g)" id="customCalories" name="calories" type="number" value={customFood.calories || ''} onChange={handleCustomFoodChange}/>
          <Input label="Proteínas (por 100g)" id="customProtein" name="protein" type="number" value={customFood.protein || ''} onChange={handleCustomFoodChange}/>
          <Input label="Carboidratos (por 100g)" id="customCarbs" name="carbs" type="number" value={customFood.carbs || ''} onChange={handleCustomFoodChange}/>
          <Input label="Gorduras (por 100g)" id="customFat" name="fat" type="number" value={customFood.fat || ''} onChange={handleCustomFoodChange}/>
          <Input label="Quantidade (g)" id="customGrams" name="grams" type="number" value={customFood.grams || ''} onChange={handleCustomFoodChange}/>
          <Button onClick={handleCreateCustomFood} className="w-full">Criar e Adicionar</Button>
        </div>
      )}
    </Modal>
  );
};

export default AddFoodModal;