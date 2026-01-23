import { CreatePostInputDto } from '../posts/posts.dto'
import { ValidationErrorDto } from '../common/error-messages'

/*
  title: string; maxLength: 30
  shortDescription: string; maxLength: 100
  content: string; maxLength: 1000
  blogId: string;
*/
export const postsInputDtoValidation = (data: CreatePostInputDto): ValidationErrorDto[] => {
    const errors: ValidationErrorDto[] = [];

    if(!data.title || typeof data.title !== 'string' || data.title.trim().length > 30) {
        errors.push({ field: 'title', message: 'Invalid title'});
    };

    if(!data.shortDescription || typeof data.shortDescription !== 'string' || data.shortDescription.trim().length > 100){
        errors.push({ field: 'shortDescription', message: 'invalid shortDescription'});
    };

    if(!data.content || typeof data.content !== 'string' || data.content.trim().length > 1000 ){
        errors.push({ field: 'content', message: 'invalid content'});
    };

    if(!data.blogId || typeof data.blogId !== 'string') {
        errors.push({ field: 'blogid', message: 'invalid blogId'})
    }

    return errors;
}