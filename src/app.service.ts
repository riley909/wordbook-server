import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SearchDto } from './search.dto';
import * as https from 'https';
import * as fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  async search(searchDto: SearchDto) {
    let { start, num, part, q, sort } = searchDto;
    start = start || 1;
    num = num || 10;
    q = q;
    part = part || 'word';
    sort = sort || 'dict';

    https.globalAgent.options.ca = fs.readFileSync(
      'node_modules/node_extra_ca_certs_mozilla_bundle/ca_bundle/ca_intermediate_root_bundle.pem',
    );

    const url = `https://krdict.korean.go.kr/api/search?key=${this.configService.get(
      'API_KEY',
    )}&start=${start}&num=${num}&part=${part}&q=${q}&sort=${sort}&translated=y&trans_lang=9`;

    const encodedURI = encodeURI(url);
    const response = await axios.get(encodedURI);
    const parser = new XMLParser();
    const result = parser.parse(response.data);
    return result;
  }
}
