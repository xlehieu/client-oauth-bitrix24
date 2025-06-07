// app/auth/layout.tsx
'use client';
import { Suspense } from 'react';
export default function BitrixLayout({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
