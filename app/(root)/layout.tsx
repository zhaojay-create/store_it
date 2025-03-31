import Header from "@/components/Header";
import MoblieNavigation from "@/components/MoblieNavigation";
import SideBar from "@/components/SideBar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  console.log("user: ", user);

  if (!user) return redirect("/sign-in");

  return (
    <main className="flex h-screen">
      <SideBar {...user} />
      <section className="flex h-screen flex-1 flex-col">
        <MoblieNavigation {...user} />
        <Header userId={user.$id} accountId={user.accountId} />
        <div className="p-4">{children}</div>
      </section>
    </main>
  );
};

export default layout;
