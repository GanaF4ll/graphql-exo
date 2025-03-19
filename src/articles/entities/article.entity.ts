import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Article {
  @Field(() => String, { description: 'id' })
  id: string;

  @Field(() => String, { description: "Titre de l'article" })
  title: string;

  @Field(() => String, { description: "Contenu de l'article" })
  content: string;

  @Field(() => String, { description: "Nom de l'auteur" })
  author: string;

  @Field(() => Date, { description: "Date de création de l'article" })
  createdAt: Date;

  @Field(() => Date, { description: "Date de mise à jour de l'article" })
  updatedAt: Date;
}
