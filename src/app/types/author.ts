export interface AuthorSearchCriteria {
  name?: string;
  // Add other search criteria fields as needed
}

export interface AuthorDto {
  id: string;
  publicId: string;
  name: string;
  // Add other common author fields as needed
}

export interface AuthorDetailsDto extends AuthorDto {
  bio?: string;
  birthDate?: string; // Assuming ISO date string
  // Add other detailed author fields as needed
}
