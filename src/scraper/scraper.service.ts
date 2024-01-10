import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { ScrapeUrlDto, } from './dto/scrape.dto';

@Injectable()
export class ScraperService {
  async scrapeUrl({ url, selector, attribute }: ScrapeUrlDto): Promise<string[]> {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    return $(selector).toArray().map((element) => $(element).attr(attribute)) as string[];
  }

}
