import React, { useState, useContext } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
// FIX: Corrected import path for UserContext
import { UserContext } from '../../context/UserContext';

const ChangePassword = () => {
    const { updatePassword } = useContext(UserContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        if (newPassword !== confirmPassword) {
            setMessage('As novas senhas não coincidem.');
            setIsError(true);
            return;
        }
        if (newPassword.length < 6) {
            setMessage('A nova senha deve ter pelo menos 6 caracteres.');
            setIsError(true);
            return;
        }

        const success = updatePassword(currentPassword, newPassword);

        if (success) {
            setMessage('Senha alterada com sucesso!');
            setIsError(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setMessage('A senha atual está incorreta.');
            setIsError(true);
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input 
                    label="Senha Atual" 
                    id="currentPassword" 
                    type="password" 
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                />
                <Input 
                    label="Nova Senha" 
                    id="newPassword" 
                    type="password" 
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />
                <Input 
                    label="Confirmar Nova Senha" 
                    id="confirmPassword" 
                    type="password" 
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
                <div className="flex items-center justify-end space-x-4">
                    {message && (
                        <span className={isError ? 'text-red-400' : 'text-green-400'}>
                            {message}
                        </span>
                    )}
                    <Button type="submit">Alterar Senha</Button>
                </div>
            </form>
        </Card>
    );
};

export default ChangePassword;