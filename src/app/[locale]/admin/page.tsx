import EditUserForm from "../components/edit-user-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";

const AdminPage = async (params: { locale: string }) => {
  const { locale } = params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <EditUserForm user={session?.user} />
        </div>
      </section>
    </main>
  );
};

export default AdminPage;
