import Header from "@/components/Header";
import MoblieNavigation from "@/components/MoblieNavigation";
import SideBar from "@/components/SideBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen">
      <SideBar />
      <section className="flex h-screen flex-1 flex-col">
        <MoblieNavigation />
        <Header />
        <div className="p-4">{children}</div>
      </section>
    </main>
  );
};

export default layout;
