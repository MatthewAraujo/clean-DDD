import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];
  async create(question: Question) {
    this.items.push(question);
  }

  async findBySlug(slug: string) {
    const question = this.items.find(
      (question) => question.slug.value === slug
    );

    if (!question) return null;

    return question;
  }

  async delete(question: Question) {
    const index = this.items.findIndex(
      (item) => item.id === question.id
    );

    this.items.splice(index, 1);
  }

  async findById(id: string) {
    const question = this.items.find((question) => question.id.toString() === id);

    if (!question) return null;

    return question;
  }

  async save(question: Question) {
    const index = this.items.findIndex(
      (item) => item.id === question.id
    );

    this.items[index] = question;
  }

  async findManyRecent({page}: PaginationParams) {
    const questions = this.items
      .sort((a,b)=> b.createdAt.getTime()- a.createdAt.getTime())
      .slice((page-1)* 20, page* 20)

    return questions
  }
}
