import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { ScrapeUrlDto, } from './dto/scrape.dto';

@Injectable()
export class ScraperService {
  async scrapeUrl({ url, selector ,attribute}: ScrapeUrlDto): Promise<string[] | { [key: string]: string | string[] }[]> {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const selectedElements = $(selector);

    if (attribute) {
      return selectedElements.toArray().map((element) => {
        const el = $(element);
        return el.attr(attribute) || '';
      }) as string[];
    }

    return selectedElements.toArray().map((element) => {
      const el = $(element);
      const attributes: { [key: string]: string | string[] } = el.attr() || {};
      attributes.text = el.text().trim();
      return attributes;
    });
  }


}
