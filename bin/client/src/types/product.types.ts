import { z } from 'zod';
import { BaseProduct } from '../schema';

export interface ProductTypes {
  title: string;
  description: string;
  id: number;
  image: string;
  category: string;
  subCategory: string;
}

export interface VariationType {
  variations: Array<{
    name: string;
    values: Array<string>;
  }>;
}

export interface ImageType {
  images: Array<string>;
}

export interface ProductInformation {
  description: string;
  variations: Array<{
    name: string;
    values: Array<string>;
  }>;
}

export type BaseProductTypes = z.infer<typeof BaseProduct>;
