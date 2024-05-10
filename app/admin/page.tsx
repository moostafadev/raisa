import { getAllCategories, getAllProducts } from "@/actions/menu.action";
import HeadingAdmin from "@/components/AdminHeading";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <HeadingAdmin title="لوحة التحكم" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">
            أهلا بيك أ/ {user?.firstName} 🫡
          </h1>
          <p className="text-lg font-semibold">
            انت الان تستطيع فعل ما تريده في منيو مطعم رايسه.
          </p>
        </div>
        <div className="flex gap-8 text-lg font-semibold">
          <p className="px-3 py-2 rounded-md bg-orange-600 dark:bg-orange-700 text-white">
            <span className="text-xl font-bold">عدد الاكلات: </span>
            <span>{products.length} اكله</span>
          </p>
          <p className="px-3 py-2 rounded-md bg-orange-600 dark:bg-orange-700 text-white">
            <span className="text-xl font-bold">عدد الاقسام: </span>
            <span>{categories.length} قسم</span>
          </p>
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
    </div>
  );
}
