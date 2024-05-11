import { getAllProductsAction } from "@/actions/menu.action";
import Footer from "@/components/Footer";
import HeaderClient from "@/components/HeaderClient";
import Menu from "@/components/Menu";

export default async function Page() {
  const products = await getAllProductsAction();
  return (
    <div>
      <HeaderClient />
      <Menu products={products} />
      {/* <Footer /> */}
    </div>
  );
}
