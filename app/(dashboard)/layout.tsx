import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main className='flex flex-col bg-background w-full h-full min-h-screen'>
      {children}
    </main>
  );
}
