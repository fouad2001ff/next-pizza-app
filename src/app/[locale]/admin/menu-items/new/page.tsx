
import { getCategories } from "@/server/db/categories";
import Form from "../_components/Form";
import { redirect } from "next/navigation";
import { getCurrentLocale } from "@/lib/get-locale-in-server";
import { Pages, Routes } from "@/constants/enums";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

const NewProductPage = async () => {
    const locale = await getCurrentLocale();
  // const t = await getTranslations("");
  const categories = await getCategories()

  const session = await getServerSession(authOptions);

  if(!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
  }

  if(session && session.user.role !== UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.PROFILE}`)

  }

  if(!categories || categories.length === 0) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`)
  }
  return (
    <main>
        <section className="section-gap">
            <div className="container">
                <Form categories={categories}  />
            </div>
        </section>
    </main>
  )
}

export default NewProductPage