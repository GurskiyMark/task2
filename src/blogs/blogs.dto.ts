
export type BlogOutputDto = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
}

export type CreateBlogInputDto = {
  name: string;
  description: string;
  websiteUrl: string;
};

export type UpdateBlogInputDto = {
  name : string;
  description: string;
  websiteUrl: string;
}


export type ValidationErrorDto = {
  message: string;
  field: string;
};

export type ErrorResponseDto = {
  errorsMessages: ValidationErrorDto[];
};
