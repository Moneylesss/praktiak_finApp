import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(url, formData);

      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        onLogin(response.data.user);
      } else {
        // После регистрации автоматически логиним
        localStorage.setItem('token', response.data.token);
        onLogin(response.data.user);
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Ошибка аутентификации');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Есть аккаунт? Войдите'}
      </button>
    </form>
  );
};

export default Auth;
