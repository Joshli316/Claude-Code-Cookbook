// Recipe data model

export type Category = 'workflow' | 'code' | 'design';
export type Difficulty = 'starter' | 'intermediate' | 'advanced';

export interface Recipe {
  slug: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  category: Category;
  tags: string[];
  difficulty: Difficulty;
  author: string;
  updatedAt: string;
  content: string;
  contentZh: string;
}
