'use client';

import { useState } from 'react';
import Link from 'next/link';
// app/auth/login/page.tsx

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Login:\nEmail: ${email}\nPassword: ${password}`);
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg">
                    Đăng nhập
                </button>
                <p className="text-center text-sm mt-2 text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/auth/register" className="text-indigo-600 hover:underline">
                        Đăng ký
                    </Link>
                </p>
            </form>
        </>
    );
}
