export type PersonalityCategory = 'femboy' | 'femgirl' | 'normal' | 'abnormal' | 'jujur_cewek' | 'jujur_cowok';
export type TasteCategory = 'manis' | 'asin' | 'pedas' | 'asam' | 'pahit' | 'gurih';
export type Category = PersonalityCategory | TasteCategory;

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
  tooltip?: string;
  color: string;
  imageUrl: string;
}
