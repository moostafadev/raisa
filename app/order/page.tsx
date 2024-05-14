import {
  getCartConditionAction,
  getProductAction,
} from "@/actions/menu.action";
import ClientHeading from "@/components/ClientHeading";
import { Cart } from "@/interfaces";
import EmptyCartSvg from "@/public/svg/empty-cart";
import { currentUser } from "@clerk/nextjs/server";
import { CircleDollarSign, CookingPot, Utensils } from "lucide-react";
import React from "react";

const page = async () => {
  const user = await currentUser();
  const order = await getCartConditionAction({
    condition: true,
    email: user?.emailAddresses[0].emailAddress as string,
  });

  // console.log(order);
  const meals = await Promise.all(
    order.map(async (item) => getProductAction({ id: item.productId }))
  );

  console.log(meals);

  const filteredMeals = ({ item }: { item: Cart }) => {
    return meals.filter((meal) => meal?.id === item?.productId);
  };

  return (
    <div className="container py-10">
      <ClientHeading title="طلباتك" />
      <div className="flex flex-col gap-4">
        {order.length ? (
          <>
            {order.map((item) => (
              <div
                key={item.id}
                className="flex flex-col p-4 bg-zinc-200 dark:bg-zinc-900 rounded-md gap-2 sm:text-lg"
              >
                <div className="flex justify-between flex-col gap-2 sm:flex-row sm:gap-0">
                  <p className="flex gap-2">
                    <span>أسم الاكلة:</span>
                    <span>
                      {filteredMeals({ item: item as Cart })[0]?.title}
                    </span>
                  </p>
                  <p className="flex gap-2">
                    <span>القسم:</span>
                    <span>
                      {
                        filteredMeals({ item: item as Cart })[0]?.category
                          ?.title
                      }
                    </span>
                  </p>
                  <p className="flex gap-2">
                    <span>السعر الكلي:</span>
                    <span>
                      {(filteredMeals({ item: item as Cart })[0]
                        ?.price as number) * (item.qyt as number)}{" "}
                      ريال
                    </span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="flex gap-2">
                    <span>الكمية:</span>
                    <span>{item.qyt}</span>
                  </p>
                  <p className="flex gap-2">
                    <span>الحجم:</span>
                    <span>
                      {filteredMeals({ item: item as Cart })[0]?.size}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <EmptyCartSvg className="max-w-[600px] mx-auto" />
        )}
      </div>
    </div>
  );
};

export default page;
