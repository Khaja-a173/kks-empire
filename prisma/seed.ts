
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  for (let i = 1; i <= 20; i++) {
    await prisma.diningTable.upsert({
      where: { number: i },
      update: {},
      create: { number: i, qrSlug: `t${i.toString().padStart(2,'0')}` },
    })
  }

  const catNames = ['Starters','Main Course','Desserts','Drinks','Soups','Tandoori','Curries','Biryani','Breads']
  const cats = await Promise.all(catNames.map((name, idx) =>
    prisma.menuCategory.upsert({ where:{ name }, update:{ sortOrder: idx }, create:{ name, sortOrder: idx } })
  ))
  const find = (n:string)=> cats.find(c=>c.name===n)!

  await prisma.menuItem.createMany({ data: [
    { name:'Chicken Tikka', description:'Chargrilled, smoky, tender', priceCents: 1499, categoryId: find('Tandoori').id },
    { name:'Paneer Butter Masala', description:'Creamy tomato gravy', priceCents: 1299, categoryId: find('Curries').id },
    { name:'Hyderabadi Biryani', description:'Fragrant basmati, slow-cooked', priceCents: 1699, categoryId: find('Biryani').id },
    { name:'Garlic Naan', description:'Tandoor baked', priceCents: 399, categoryId: find('Breads').id },
    { name:'Gulab Jamun', description:'Warm syrupy dumplings', priceCents: 599, categoryId: find('Desserts').id },
    { name:'Masala Soda', description:'Tangy & refreshing', priceCents: 299, categoryId: find('Drinks').id },
  ]})
}

main().finally(()=>prisma.$disconnect())
