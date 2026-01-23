import { CreateBlogInputDto, ValidationErrorDto } from "./blogs.dto";

export const WEBSITE_URL_REGEX = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;

/*
name 	     string maxLength: 15
description	 string maxLength: 500
websiteUrl	 string maxLength: 100 pattern: ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
*/
export const blogsInputDtoValidation = (data: CreateBlogInputDto): ValidationErrorDto[] => {
    const errors: ValidationErrorDto[] = [];

    if(!data.name || typeof data.name !== 'string' || data.name.trim().length > 15) {
        errors.push({ field: 'name', message: 'Invalid name'});
    };

    if(!data.description || typeof data.description !== 'string' || data.description.trim().length > 500){
        errors.push({ field: 'description', message: 'invalid description'});
    };

    if(!data.websiteUrl || typeof data.websiteUrl !== 'string' || data.websiteUrl.trim().length > 100 || !WEBSITE_URL_REGEX.test(data.websiteUrl)){
        errors.push({ field: 'websiteUrl', message: 'invalid websiteUrl'});
    };

    return errors;
}