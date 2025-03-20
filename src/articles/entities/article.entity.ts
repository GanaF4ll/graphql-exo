import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Article {
  @Field(() => String, { description: 'id' })
  id: string;

  @Field(() => String, { description: "Titre de l'article" })
  title: string;

  @Field(() => String, { description: "Contenu de l'article" })
  content: string;

  @Field(() => User, { description: "Nom de l'auteur" })
  author: User;

  @Field(() => Date, {
    nullable: true,
    description: "Date de création de l'article",
  })
  createdAt?: Date;

  @Field(() => Date, {
    nullable: true,
    description: "Date de mise à jour de l'article",
  })
  updatedAt?: Date;
}
