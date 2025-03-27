import { getCategories } from "@/server/db/categories";
import Form from "../../_components/Form";
import { getProduct, getProducts } from "@/server/db/product";
import { redirect } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/get-locale-in-server";
export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({ productId: product.id }));
}
const EditProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const locale = await getCurrentLocale();
  const product = await getProduct(productId);
  const categories = await getCategories();
  if (!product) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.MENUITEMS}`);
  }
  return (
    <main>
      <section>
        <div className="container my-8">
          <Form categories={categories} product={product} />
        </div>
      </section>
    </main>
  );
};

export default EditProductPage;
