import { IsUrl, IsArray, ArrayNotEmpty, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContainsOnlyAlphabetic } from 'src/middleware/validate';

export class ScrapeUrlDto {
  @ApiProperty({ example: 'https://en.wikipedia.org/wiki/English_Wikipedia', description: 'URL to scrape' })
  @IsUrl({}, { message: 'Invalid URL provided' })
  url: string;

  @ApiProperty({ example: 'img', description: 'Selector for data extraction' })
  @IsString({ message: 'Selector must be a string' })
  @IsNotEmpty({ message: 'Selector must be provided' })
  @ContainsOnlyAlphabetic({ message: 'Selector should contain only alphabetic letters. Please provide a valid html tag' })
  selector: string;

  @ApiProperty({
    example: 'src',
    description: 'Attribute to extract from the selected elements',
  })
  @IsString({ message: 'Attribute must be a string' })
  @IsNotEmpty({ message: 'Attribute must be provided' })
  @ContainsOnlyAlphabetic({ message: 'Attribute should contain only alphabetic letters. Please provide a valid attribute' })
  attribute: string;
}

