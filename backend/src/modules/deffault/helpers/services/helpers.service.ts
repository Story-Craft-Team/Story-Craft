import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/deffault/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

/**
 * Options for retrieving an entity from Prisma.
 */
interface GetEntityOptions {
  /**
   * If true, returns an array using `findMany`.
   * If false or omitted, returns a single entity using `findUnique`.
   */
  isArray?: boolean;
}

@Injectable()
export class HelpersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves a single entity from the database using Prisma.
   * Throws a NotFoundException if the entity is not found.
   *
   * @template T - The expected return type of the entity.
   * @param model - The Prisma model key as defined in PrismaClient.
   * @param where - The `where` clause used for querying the entity.
   * @param entityName - A friendly name used in error messages.
   * @param options - Set `isArray: false` or leave undefined.
   * @returns A single entity of type T.
   */
  async getEntityOrThrow<T>(
    model: keyof PrismaClient,
    where: Record<string, any>,
    entityName: string,
    options?: { isArray?: false },
  ): Promise<T>;

  /**
   * Retrieves a list of entities from the database using Prisma.
   * Throws a NotFoundException if no entities are found.
   *
   * @template T - The expected return type of each entity.
   * @param model - The Prisma model key as defined in PrismaClient.
   * @param where - The `where` clause used for querying the entities.
   * @param entityName - A friendly name used in error messages.
   * @param options - Must include `isArray: true`.
   * @returns An array of T entities.
   */
  async getEntityOrThrow<T>(
    model: keyof PrismaClient,
    where: Record<string, any>,
    entityName: string,
    options: { isArray: true },
  ): Promise<T[]>;

  /**
   * Internal implementation of the method with runtime logic.
   */
  async getEntityOrThrow<T>(
    model: keyof PrismaClient,
    where: Record<string, any>,
    entityName = 'Entity',
    options: GetEntityOptions = {},
  ): Promise<T | T[]> {
    const { isArray = false } = options;
    const prismaModel = (this.prisma as any)[String(model)];
    const method = isArray ? 'findMany' : 'findUnique';

    if (!prismaModel || typeof prismaModel[method] !== 'function') {
      throw new InternalServerErrorException(
        `Model "${String(model)}" does not support "${method}".`,
      );
    }

    try {
      const result = await prismaModel[method]({ where });

      const notFound =
        (!isArray && !result) ||
        (isArray && Array.isArray(result) && result.length === 0);

      if (notFound) {
        throw new NotFoundException(
          `${entityName}${isArray ? 's' : ''} not found with: ${JSON.stringify(where)}`,
        );
      }

      return result as any;
    } catch (error) {
      throw new NotFoundException(
        `Failed to retrieve ${entityName}${isArray ? 's' : ''} with: ${JSON.stringify(where)}. ${error.message}`,
      );
    }
  }
}
