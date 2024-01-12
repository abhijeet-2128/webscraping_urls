import { Controller, Post, Body, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ScrapeUrlDto } from './dto/scrape.dto';
import { SCRAP_MSG, SCRAP_RESPONSE } from './common/responses/sraper.response';

@ApiTags('Scraper')
@Controller('scraper')
export class ScraperController {
  constructor(
    private readonly scraperService: ScraperService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Scrape data from a given URL' })
  @ApiResponse({ status: SCRAP_RESPONSE.SUCCESS.httpCode, description: SCRAP_RESPONSE.SUCCESS.message })
  @ApiResponse({ status: SCRAP_RESPONSE.NO_DATA.httpCode, description: SCRAP_RESPONSE.NO_DATA.message })
  @ApiResponse({ status: SCRAP_RESPONSE.FORBIDDEN.httpCode, description: SCRAP_RESPONSE.FORBIDDEN.message })
  @ApiResponse({ status: SCRAP_RESPONSE.NOT_FOUND.httpCode, description: SCRAP_RESPONSE.NOT_FOUND.message })
  @ApiResponse({ status: SCRAP_RESPONSE.ERROR.httpCode, description: SCRAP_RESPONSE.ERROR.message })
  @ApiBadRequestResponse({ status: SCRAP_RESPONSE.INVALID_URL.httpCode, description: SCRAP_RESPONSE.INVALID_URL.message })

  async scrapeUrl(
    @Body(new ValidationPipe({ transform: true })) body: ScrapeUrlDto,
  ): Promise<any> {
    try {
      const data = await this.scraperService.scrapeUrl(body);

      if (data.length > 0) {
        return { ...SCRAP_RESPONSE.SUCCESS, data };
      } else {
        return SCRAP_RESPONSE.NO_DATA;
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        throw new HttpException(SCRAP_MSG.FORBIDDEN, HttpStatus.FORBIDDEN);
      } else if (error.response && error.response.status === 404) {
        throw new HttpException(SCRAP_MSG.NOT_FOUND, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(SCRAP_MSG.ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
