import Header from "@/components/Header";
import MoblieNavigation from "@/components/MoblieNavigation";
import SideBar from "@/components/SideBar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) return redirect("/sign-in");

  return (
    <main className="flex h-screen">
      <SideBar {...user} />
      <section className="flex h-screen flex-1 flex-col">
        <MoblieNavigation {...user} />
        <Header userId={user.$id} accountId={user.accountId} />
        <div className="mt-4 p-4 h-full bg-[#F4F5F8] rounded-2xl">
          {children}
        </div>
      </section>
    </main>
  );
};

export default layout;
