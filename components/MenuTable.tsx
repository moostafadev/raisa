import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMenu } from "@/interfaces";
import Image from "next/image";
import TableActions from "./TableActions";

export function MenuTable({ products }: { products: IMenu[] }) {
  const headStyle = "text-right font-bold text-lg";
  const bodyStyle = "font-semibold text-base";
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={headStyle}>الاسم</TableHead>
          <TableHead className={headStyle}>السعر</TableHead>
          <TableHead className={headStyle}>القسم</TableHead>
          <TableHead className={headStyle}>السعرات</TableHead>
          <TableHead className={headStyle}>الصورة</TableHead>
          <TableHead className={headStyle}>التحكم</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((item) => (
          <TableRow key={item.id}>
            <TableCell className={bodyStyle}>{item.title}</TableCell>
            <TableCell className={bodyStyle}>{item.price} ريال</TableCell>
            <TableCell className={bodyStyle}>
              {item.category ? item.category.title : "لم ينضنم الي قسم"}
            </TableCell>
            <TableCell className={bodyStyle}>{item.kcal} كالوري</TableCell>
            <TableCell className={bodyStyle}>
              <Image
                src={
                  item.image
                    ? item.image
                    : "https://res.cloudinary.com/dvtmqtcyl/image/upload/v1715305184/image-not-found_ieiasm.png"
                }
                alt="meal image"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />
            </TableCell>
            <TableCell className={bodyStyle}>
              <TableActions type="product" id={item.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className={headStyle}>
            المجموع الاكلات
          </TableCell>
          <TableCell className={bodyStyle}>{products.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
