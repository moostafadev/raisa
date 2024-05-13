import {
  getAllCategoriesAction,
  getAllProductsAction,
  getDeliveryAction,
} from "@/actions/menu.action";
import HeadingAdmin from "@/components/AdminHeading";
import AdminSvg from "@/public/svg/admin-svg";
import { currentUser } from "@clerk/nextjs/server";
import { ShoppingBag, SquarePen } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const user = await currentUser();
  const products = await getAllProductsAction();
  const categories = await getAllCategoriesAction();
  const deliveryService = await getDeliveryAction();

  return (
    <div>
      <HeadingAdmin title="لوحة التحكم" />
      <div className="flex flex-col lg:flex-row gap-10 mt-4">
        <div className="flex flex-col gap-5 order-2 lg:order-1">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">
              أهلا بيك أ/ {user?.firstName} 🫡
            </h1>
            <p className="text-lg font-semibold">
              انت الان تستطيع فعل ما تريده في منيو مطعم رايسه.
            </p>
          </div>
          <div className="text-lg font-semibold flex flex-col gap-6">
            <div className="flex gap-6">
              <p className="px-3 py-2 rounded-md bg-orange-600 dark:bg-orange-700 text-white flex flex-col">
                <span className="text-lg sm:text-xl font-bold">
                  عدد الاكلات:{" "}
                </span>
                <span>{products.length} اكله</span>
              </p>
              <p className="px-3 py-2 rounded-md bg-orange-600 dark:bg-orange-700 text-white flex flex-col">
                <span className="text-lg sm:text-xl font-bold">
                  عدد الاقسام:{" "}
                </span>
                <span>{categories.length} قسم</span>
              </p>
            </div>
            <div className="w-fit flex gap-2 items-center">
              <p className="px-3 py-2 rounded-md bg-orange-600 dark:bg-orange-700 text-white flex gap-1">
                <ShoppingBag />
                <span className="flex gap-2">
                  <span className="text-lg sm:text-xl font-bold">التوصيل:</span>
                  {deliveryService[0]?.available === "NO" ? (
                    <span>مجاناً</span>
                  ) : (
                    <span>{deliveryService[0]?.price} ريال</span>
                  )}
                </span>
              </p>
              <Link
                href={`/admin/changeDelivary/${deliveryService[0]?.id}`}
                className="px-3 py-2 rounded-md bg-blue-800 dark:bg-blue-900 text-white"
              >
                <SquarePen size={28} />
              </Link>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-3">ألافعال المتاحه اليك:</h1>
            <div className="text-lg font-semibold flex flex-col gap-1">
              <p>1: نظرة عامة علي المنيو.</p>
              <p>2: اضافة وجبة جديدة.</p>
              <p>3: اضافة قسم جديد.</p>
              <p>4: تعديل علي وجبة موجودة بالفعل.</p>
              <p>5: تعديل علي قسم موجود.</p>
              <p>6: حذف وجبة من المنيو.</p>
              <p>7: حذف قسم من المنيو.</p>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:mt-7 lg:w-[50%]">
          <AdminSvg className="hover:scale-105 duration-300" />
        </div>
      </div>
    </div>
  );
}
