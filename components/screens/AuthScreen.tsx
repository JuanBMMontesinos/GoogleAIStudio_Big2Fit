import React, { useState, useContext } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
// FIX: Corrected import path for UserContext
import { UserContext } from '../../context/UserContext';

const AuthScreen: React.FC = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const { login, signup } = useContext(UserContext);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (isLoginView) {
            const success = login(email, password);
            if (!success) {
                setError('Email ou senha inválidos.');
            }
        } else {
            if (password !== confirmPassword) {
                setError('As senhas não coincidem.');
                return;
            }
            if(password.length < 6){
                setError('A senha deve ter pelo menos 6 caracteres.');
                return;
            }
            const success = signup(name, email, password);
            if (!success) {
                setError('Não foi possível criar a conta. O email pode já estar em uso.');
            }
        }
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setError('');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">
                        Big<span className="text-teal-400">2</span>Fit
                    </h1>
                    <p className="text-gray-400">Seu monitor diário de saúde e fitness</p>
                </div>
                <Card>
                    <h2 className="text-2xl font-bold text-center text-white mb-6">
                        {isLoginView ? 'Login' : 'Criar Conta'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLoginView && (
                             <Input label="Nome" id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                        )}
                        <Input label="Email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <Input label="Senha" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        {!isLoginView && (
                             <Input label="Confirmar Senha" id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                        )}
                        
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <Button type="submit" className="w-full">
                            {isLoginView ? 'Entrar' : 'Cadastrar'}
                        </Button>
                    </form>
                    <div className="mt-6 text-center">
                        <button onClick={toggleView} className="text-sm text-teal-400 hover:underline">
                            {isLoginView ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AuthScreen;