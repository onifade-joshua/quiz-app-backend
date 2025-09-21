"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting production database setup...');
    // Optional: you can ensure admin user exists, but no demo data
    // Remove or uncomment the section below if you want to seed an initial admin user
    /*
    const adminExists = await prisma.user.findUnique({
      where: { email: 'admin@example.com' }
    })
  
    if (!adminExists) {
      console.log('⚠️ Admin user not found. Please create one manually.')
    }
    */
    // No mock questions or quiz results
    console.log('✅ Database setup complete. No mock data inserted.');
}
main()
    .catch((e) => {
    console.error('❌ Error during production setup:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map