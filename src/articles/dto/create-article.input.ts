import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateArticleInput {
  @Field(() => String, { description: "Titre de l'article" })
  title: string;

  @Field(() => String, { description: "Contenu de l'article" })
  content: string;

  @Field(() => String, { description: "Auteur de l'article" })
  author: string;
}
