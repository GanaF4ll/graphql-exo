import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArticleInput: CreateArticleInput) {
    const { title, content, author } = createArticleInput;
    const article = await this.prisma.articles.create({
      data: {
        title,
        content,
        author,
      },
    });

    return article;
  }

  async findAll() {
    const articles = await this.prisma.articles.findMany();

    return articles;
  }

  findOne(id: string) {
    const article = this.prisma.articles.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException('No articles found');
    }

    return article;
  }

  update(id: number, updateArticleInput: UpdateArticleInput) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
