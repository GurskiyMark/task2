
export type PostOutputDto = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
}

export type CreatePostInputDto = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
};

export type UpdatePostInputDto = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}


export type ValidationErrorDto = {
  message: string;
  field: string;
};

export type ErrorResponseDto = {
  errorsMessages: ValidationErrorDto[];
};
