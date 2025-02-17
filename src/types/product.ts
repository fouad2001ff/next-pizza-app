import { Prisma } from "@prisma/client";

//type that includes the Product model with its related sizes and extras

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    sizes: true;
    extras: true;
  };
}>;