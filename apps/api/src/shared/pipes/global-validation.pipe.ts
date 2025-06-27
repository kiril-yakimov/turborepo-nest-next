import {
    ValidationPipe,
    ArgumentMetadata,
    Injectable,
    BadRequestException,
    HttpStatus,
} from '@nestjs/common';

@Injectable()
export class GlobalValidationPipe extends ValidationPipe {
    async transform(value: any, metadata: ArgumentMetadata) {
        // Parse JSON from query parameters before validation
        if (metadata.type === 'query' && value && typeof value === 'object') {
            Object.keys(value).forEach((key) => {
                const paramValue = value[key];

                if (typeof paramValue === 'string') {
                    const trimmed = paramValue.trim();
                    if (
                        (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
                        (trimmed.startsWith('[') && trimmed.endsWith(']'))
                    ) {
                        try {
                            value[key] = JSON.parse(trimmed);
                        } catch {
                            throw new BadRequestException({
                                errors: {
                                    [key]: `Invalid JSON format in query parameter '${key}'`,
                                },
                                error: 'Bad Request',
                                statusCode: HttpStatus.BAD_REQUEST,
                            });
                        }
                    }
                }
            });
        }

        // Proceed with default validation behavior
        return super.transform(value, metadata);
    }
}
