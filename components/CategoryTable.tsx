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
import { Category } from "@/interfaces";
import Image from "next/image";

export function CategoryTable({ categories }: { categories: Category[] }) {
  const headStyle = "text-right font-bold text-lg";
  const bodyStyle = "font-semibold text-base";
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={headStyle}>الاسم</TableHead>
          <TableHead className={headStyle}>الاكلات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((item) => (
          <TableRow key={item.id}>
            <TableCell className={bodyStyle}>{item.title}</TableCell>
            <TableCell className={bodyStyle}>
              {item.products?.length} اكله
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={1} className={headStyle}>
            المجموع الاقسام
          </TableCell>
          <TableCell className={bodyStyle}>{categories.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
