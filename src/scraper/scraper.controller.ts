import { Controller, Post, Body, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ScrapeUrlDto } from './dto/scrape.dto';
import { CHATRESPONSE, SCRAP_MSG } from './common/responses/sraper.response';

@ApiTags('Scraper')
@Controller('scraper')
export class ScraperController {
  constructor(
    private readonly scraperService: ScraperService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Scrape data from a given URL' })
  @ApiResponse({ status: CHATRESPONSE.SUCCESS.httpCode, description: CHATRESPONSE.SUCCESS.message })
  @ApiResponse({ status: CHATRESPONSE.NO_DATA.httpCode, description: CHATRESPONSE.NO_DATA.message })
  @ApiResponse({ status: CHATRESPONSE.FORBIDDEN.httpCode, description: CHATRESPONSE.FORBIDDEN.message })
  @ApiResponse({ status: CHATRESPONSE.NOT_FOUND.httpCode, description: CHATRESPONSE.NOT_FOUND.message })
  @ApiResponse({ status: CHATRESPONSE.ERROR.httpCode, description: CHATRESPONSE.ERROR.message })
  @ApiBadRequestResponse({ status: CHATRESPONSE.INVALID_URL.httpCode, description: CHATRESPONSE.INVALID_URL.message })

  async scrapeUrl(
    @Body(new ValidationPipe({ transform: true })) body: ScrapeUrlDto,
  ): Promise<any> {
    try {
      const data = await this.scraperService.scrapeUrl(body);

      if (data.length > 0) {
        return { ...CHATRESPONSE.SUCCESS, data };
      } else {
        return CHATRESPONSE.NO_DATA;
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
