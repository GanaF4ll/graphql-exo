import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Articles } from '@prisma/client';
import { Article } from 'src/articles/entities/article.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  firstname: string;

  @Field(() => String, { nullable: true })
  lastname: string;

  @Field(() => Date, { nullable: true })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;

  @Field(() => [Article], { nullable: true })
  articles: Articles[];
}
