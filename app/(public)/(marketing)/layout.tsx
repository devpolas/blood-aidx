import { Footer } from "@/components/footer/footer";
import Navbar from "@/components/shared/navbar/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex flex-col bg-background w-full h-full min-h-screen'>
      <Navbar />
      <div className='flex-1 mx-auto px-4 w-full lg:max-w-11/12'>
        {children}
      </div>
      <Footer />
    </main>
  );
}
