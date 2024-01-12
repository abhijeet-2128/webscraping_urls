import { IsUrl, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContainsHtmlTags } from 'src/middleware/validate';

export class ScrapeUrlDto {
  @ApiProperty({ example: 'https://www.amazon.in/', description: 'URL to scrape' })
  @IsUrl({}, { message: 'Invalid URL provided' })
  url: string;

  @ApiProperty({ example: 'img', description: 'Selector for data extraction' })
  @IsString({ message: 'Selector must be a string' })
  @IsNotEmpty({ message: 'Selector must be provided' })
  @ContainsHtmlTags({ message: 'Selector should contain only alphabetic letters. Please provide a valid html tag' })
  selector: string;

  @ApiProperty({
    example: 'src',
    description: 'Attribute to extract from the selected elements',
  })
  @IsString({ message: 'Attribute must be a string' })
  @IsOptional()
  attribute: string;
}

