import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

const alphabeticRegex = /^[a-zA-Z]+$/;

export function ContainsOnlyAlphabetic(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'containsOnlyAlphabetic',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return alphabeticRegex.test(value);
                },
            },
        });
    };
}
