import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

const htmlTagsRegex = /^[a-z]+[^\s>\/]*$/i

export function ContainsHtmlTags(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'containsHtmlTags',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return htmlTagsRegex.test(value);
                },
            },
        });
    };
}
