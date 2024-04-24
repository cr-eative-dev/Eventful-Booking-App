import Footer from "@/app/components/shared/Footer";
import Header from "@/app/components/shared/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 p-2 bg-slate-500">{children}</main>
      <Footer />
    </div>
  );
}
