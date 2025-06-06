'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import * as AuthService from '@/services/auth.service';
export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const mutateRegister = useMutation({
        mutationFn: async (data: any) => AuthService.register(data),
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        mutateRegister.mutate(form, {
            onSuccess: (data) => {
                router.push('/auth/login');
                // Redirect to login or home page
            },
            onError: (error: any) => {
                alert(error.response?.data?.message || 'Registration failed');
            },
        });
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg">
                    Register
                </button>
                <p className="text-center text-sm mt-2 text-gray-600">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-purple-600 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </>
    );
}
