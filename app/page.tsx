import { getAllProductsAction } from "@/actions/menu.action";
import Footer from "@/components/Footer";
import HeaderClient from "@/components/HeaderClient";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";

export default async function Home() {
  const products = await getAllProductsAction();
  return (
    <div>
      <HeaderClient />
      <Hero />
      <Menu products={products} />
      {/* <Footer /> */}
    </div>
  );
}
