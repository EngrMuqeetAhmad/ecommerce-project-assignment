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
    values: Array<string>
  }>


}

export interface ImageType {
  images: Array<string>

}