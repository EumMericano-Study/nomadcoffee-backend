-- DropForeignKey
ALTER TABLE "CoffeeShopPhoto" DROP CONSTRAINT "CoffeeShopPhoto_coffeeShopId_fkey";

-- AlterTable
ALTER TABLE "CoffeeShopPhoto" ALTER COLUMN "coffeeShopId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CoffeeShopPhoto" ADD CONSTRAINT "CoffeeShopPhoto_coffeeShopId_fkey" FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
