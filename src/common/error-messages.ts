
export type ValidationErrorDto = {
    field: string;
    message: string;
}

export type ErrorResponseDto = {
  errorsMessages: ValidationErrorDto[];
};


export const createErrorResponse = (errors: ValidationErrorDto[]): ErrorResponseDto => {
    return { errorsMessages: errors };
}