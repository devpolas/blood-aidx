import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className='flex justify-center items-center h-full min-h-screen'>
      {children}
    </main>
  );
}
