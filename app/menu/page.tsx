import { getAllProductsAction } from "@/actions/menu.action";
import Menu from "@/components/Menu";

export default async function Page() {
  const products = await getAllProductsAction();
  return (
    <div>
      <Menu products={products} />
    </div>
  );
}
