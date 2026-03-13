export interface BookBasicInfoSearchCriteria {
  id?: number,
  bookId?: string;
  title?: string;
  fromYear?: number;
  toYear?: number;
}

export interface BookBasicInfoDto {
  id: number;
  bookId: string;
  title: string;
  firstPublishDate: number;
}

export interface BookBasicInfoDetailsDto extends BookBasicInfoDto {
  description?: string;
  publishedYear?: number;
}
