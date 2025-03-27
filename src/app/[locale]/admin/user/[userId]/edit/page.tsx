import { redirect } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/get-locale-in-server";
import { getUser, getUsers } from "@/server/db/users";
import EditUserForm from "@/app/[locale]/components/edit-user-form";
export async function generateStaticParams() {
  const users = await getUsers();

  return users.map((user) => ({ userId: user.id }));
}
const EditUserPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const locale = await getCurrentLocale();
  const user = await getUser(userId);
  if (!user) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
  }
  return (
    <main>
      <section>
        <div className="container my-8">
            <EditUserForm user={user} />
        </div>
      </section>
    </main>
  );
};

export default EditUserPage;
