import { getTranslations } from "next-intl/server";
import EditUserForm from "../components/edit-user-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";

export default async function ProfilePage(params: { locale: string }) {
  const { locale } = params;
  const t = await getTranslations("profile");
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <h1 className=" text-primary text-4xl text-center font-bold italic mb-8">
            {t("title")}
          </h1>

          <EditUserForm user={session.user} />
        </div>
      </section>
    </main>
  );
}
