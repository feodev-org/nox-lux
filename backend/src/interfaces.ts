import { IsNumber, IsOptional } from 'class-validator';

export class MongoQueryFilters {
  @IsOptional()
  @IsNumber()
  offset = 0;

  @IsOptional()
  @IsNumber()
  limit = 10;
}

export class MongoCount {
  count: number;
}
