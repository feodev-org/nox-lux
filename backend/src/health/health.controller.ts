import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { PrismaHealthIndicator } from '../prisma-health.indicator';

@Controller({
  version: '1',
  path: 'health',
})
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private prismaHealthIndicator: PrismaHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator,
    private memoryHealthIndicator: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.prismaHealthIndicator.isHealthy('database'),
      () =>
        this.diskHealthIndicator.checkStorage('storage', {
          path: '/',
          thresholdPercent: 0.5,
        }),
      () =>
        this.memoryHealthIndicator.checkHeap('memory_heap', 1024 * 1024 * 150),
      () =>
        this.memoryHealthIndicator.checkRSS('memory_rss', 1024 * 1024 * 150),
    ]);
  }
}
