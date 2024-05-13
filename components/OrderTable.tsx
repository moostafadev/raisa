"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cart, IMenu } from "@/interfaces";
import TableActions from "./TableActions";

export function OrderTable({
  products,
  orders,
}: {
  products: IMenu[];
  orders: Cart[];
}) {
  const headStyle = "text-right font-bold text-lg";
  const bodyStyle = "font-semibold text-base";

  const filteredMeals = ({ item }: { item: Cart }) => {
    return products.filter((meal) => meal?.id === item?.productId);
  };

  const timeSecond = 60;
  setTimeout(() => {
    window.location.reload();
  }, timeSecond * 1000);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={headStyle}>الاسم</TableHead>
          <TableHead className={headStyle}>رقم الهاتف</TableHead>
          <TableHead className={headStyle}>الوجبة</TableHead>
          <TableHead className={headStyle}>سعر الواحدة</TableHead>
          <TableHead className={headStyle}>الكمية</TableHead>
          <TableHead className={headStyle}>الحجم</TableHead>
          <TableHead className={headStyle}>التحكم</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((item) => (
          <TableRow key={item.id}>
            <TableCell className={bodyStyle}>{item.username}</TableCell>
            <TableCell className={bodyStyle}>{item.phone}</TableCell>
            <TableCell className={bodyStyle}>
              {filteredMeals({ item })[0].title}
            </TableCell>
            <TableCell className={bodyStyle}>
              {filteredMeals({ item })[0].price} ريال
            </TableCell>
            <TableCell className={bodyStyle}>{item.qyt}</TableCell>
            <TableCell className={bodyStyle}>
              {filteredMeals({ item })[0].size}
            </TableCell>
            <TableCell className={bodyStyle}>
              <TableActions type="order" id={item.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6} className={headStyle}>
            المجموع الطلبات
          </TableCell>
          <TableCell className={bodyStyle}>{orders.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
