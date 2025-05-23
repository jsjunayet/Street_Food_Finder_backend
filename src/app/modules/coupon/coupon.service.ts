import { Coupon } from "@prisma/client";
import { prisma } from "../../share/prismaClient";

const couponCreateData = async (payload: Coupon) => {
  const { code, discountPercentage, validUntil } = payload;
  const result = await prisma.coupon.create({
    data: {
      code: code.toUpperCase(),
      discountPercentage,
      validFrom: new Date(),
      validUntil: new Date(validUntil),
      isActive: true,
      usageCount: 0,
    },
  });
  return result;
};
const couponGetData = async () => {
  const result = await prisma.coupon.findMany();
  return result;
};

const couponUpdateGetData = async (id: string) => {
  const coupon = await prisma.coupon.findUniqueOrThrow({ where: { id } });
  const result = await prisma.coupon.update({
    where: { id },
    data: { isActive: !coupon?.isActive, updatedAt: new Date() },
  });
  return result;
};
const couponDeletedGetData = async (id: string) => {
  const result = await prisma.coupon.delete({ where: { id: id } });
  return result;
};
export const couponService = {
  couponCreateData,
  couponGetData,
  couponDeletedGetData,
  couponUpdateGetData,
};
