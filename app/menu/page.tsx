import {
  getAllCategoriesAction,
  getAllProductsAction,
} from "@/actions/menu.action";
import Menu from "@/components/Menu";

export default async function Page() {
  const products = await getAllProductsAction();
  const categories = await getAllCategoriesAction();

  return (
    <div>
      <Menu products={products} categories={categories} />
    </div>
  );
}
