
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { UserProfile, Gender, ActivityLevel, Goal } from '../../types';
import { ACTIVITY_LEVELS, GOALS, GENDERS } from '../../constants';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Card from '../ui/Card';

const ProfileScreen: React.FC = () => {
  const { userProfile, saveUserProfile } = useContext(UserContext);
  const [profileData, setProfileData] = useState<UserProfile>({
    name: '',
    height: 0,
    weight: 0,
    gender: Gender.MALE,
    age: 0,
    activityLevel: ActivityLevel.MODERATE,
    goal: Goal.MAINTAIN_WEIGHT,
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setProfileData(userProfile);
    }
  }, [userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: name === 'age' || name === 'height' || name === 'weight' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserProfile(profileData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <Card title="Meu Perfil">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Nome" id="name" name="name" type="text" value={profileData.name} onChange={handleChange} required />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Idade" id="age" name="age" type="number" value={profileData.age || ''} onChange={handleChange} required min="1" />
            <Select label="Sexo" id="gender" name="gender" value={profileData.gender} onChange={handleChange} required>
              {GENDERS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Altura (cm)" id="height" name="height" type="number" value={profileData.height || ''} onChange={handleChange} required min="1" />
            <Input label="Peso (kg)" id="weight" name="weight" type="number" value={profileData.weight || ''} onChange={handleChange} required min="1" step="0.1" />
          </div>

          <Select label="Nível de Atividade" id="activityLevel" name="activityLevel" value={profileData.activityLevel} onChange={handleChange} required>
            {ACTIVITY_LEVELS.map(level => (
              <option key={level.id} value={level.id}>{level.label}</option>
            ))}
          </Select>

          <Select label="Objetivo" id="goal" name="goal" value={profileData.goal} onChange={handleChange} required>
            {GOALS.map(goal => (
              <option key={goal.id} value={goal.id}>{goal.label}</option>
            ))}
          </Select>

          <div className="flex items-center justify-end space-x-4">
             {isSaved && <span className="text-green-400">Perfil salvo com sucesso!</span>}
            <Button type="submit">Salvar Perfil</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfileScreen;
