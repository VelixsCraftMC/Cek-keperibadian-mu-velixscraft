export type Category = 'femboy' | 'femgirl' | 'normal' | 'abnormal' | 'jujur_cewek' | 'jujur_cowok';

export interface Answer {
  text: string;
  scores: Record<Category, number>;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export interface SurveyResult {
  category: Category;
  title: string;
  description: string;
  color: string;
  imageUrl: string;
}
