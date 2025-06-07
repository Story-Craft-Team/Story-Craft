import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExcludePasswordInterceptor } from './common/interceptors/excludePassword.interceptor';

// Load environment variables
dotenv.config();

// Function to create Swagger configuration
function createSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Story Craft API') // Set API title
    .setDescription('Documentation for Story Craft API') // Set API description
    .setVersion('1.0') // Set API version
    .addBearerAuth()
    .build();
}

// Main function to bootstrap the application
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule); // Create NestJS app
    app.useGlobalInterceptors(new ExcludePasswordInterceptor(new Reflector()));

    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });

    // Create and configure Swagger
    const swaggerConfig = createSwaggerConfig();
    const document = SwaggerModule.createDocument(app, swaggerConfig, {
      deepScanRoutes: true,
      ignoreGlobalPrefix: true,
    });

    // Setup Swagger UI at /api-docs path
    SwaggerModule.setup('api-docs', app, document);

    // Start the app and listen on the specified port (defaults to 3001)
    const port = process.env.PORT ?? 3001;
    await app.listen(port, '0.0.0.0', () => {
      console.log(`App is running on http://0.0.0.0:${port}`);
    });
  } catch (error) {
    console.error('Error during application startup', error); // Log any error during app startup
    process.exit(1); // Exit the process with an error code
  }
}

bootstrap();
