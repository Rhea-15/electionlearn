import app from './app';
import { env } from './config/env';
import { prisma } from './config/database';

const PORT = parseInt(env.PORT, 10);

async function start() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected');

    app.listen(PORT, () => {
      console.log(`\n🗳️  ElectionLearn API running on http://localhost:${PORT}`);
      console.log(`📊  Health check: http://localhost:${PORT}/health`);
      console.log(`🌍  Environment: ${env.NODE_ENV}\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

start();

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
