import { ChangeEventHandler, MouseEventHandler } from 'react';

export interface Content {
  full: string;
  full_image: string;
  half: string;
  half_image: string;
  icon_type: string;
  id: number;
  title: string;
}
export interface Themes {
  id: number;
  title: string;
  description: string;
  recipe_count: number;
  duration: number;
  tips: string;
  theme_type: number;
  recipes: [];
  landscape_image: string;
  portrait_image: string;
  save_count: number;
}

export interface BigThemes {
  id: number;
  title: string;
  themes: [];
}

export interface Recipes {
  id: number;
  video_id: string;
  title: string;
  time_taken: string;
  save_count: number;
  required_ingredients: [];
  theme: number;
  image: string;
}

export interface equipment {
  name: string;
}

export interface required {
  name: string;
  emoji: string;
  quantity: string;
  substitute: string;
}

export interface additional {
  name: string;
  emoji: string;
  quantity: string;
  substitute: string;
}

export interface sequence {
  image: string;
  long_desc: string;
  order: number;
  short_desc: string;
  time: string;
}

export interface Measure {
  id: number;
  title: string;
  icon_type: string;
  full: string;
  full_image: string;
  half: string;
  half_image: string;
}

export interface Container {
  pathName: string;
  href: string;
}

export interface propsType {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  reset: MouseEventHandler<HTMLDivElement> | undefined;
}
