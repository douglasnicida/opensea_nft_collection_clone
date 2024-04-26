import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  findCollection() {
    return this.httpService.get('https://api.opensea.io/api/v2/collections/mystical-wizards',{
      headers: {
        "X-API-KEY": process.env.X_API_KEY
      }
    }).pipe(map((res) => res.data))
    .pipe(
      catchError((err) => {
        throw new BadRequestException(err.message)
      }),
    );
  }
  
  findAll() {
    return this.httpService.get('https://api.opensea.io/api/v2/collection/mystical-wizards/nfts',{
      headers: {
        "X-API-KEY": process.env.X_API_KEY
      }
    }).pipe(map((res) => res.data))
    .pipe(
      catchError((err) => {
        throw new BadRequestException(err.message)
      }),
    );
  }

  findNFT(id: string) {
    return this.httpService.get(`https://api.opensea.io/api/v2/chain/ethereum/contract/0x74cb5611e89078b2e5cb638a873cf7bddc588659/nfts/${id}`,{
      headers: {
        "X-API-KEY": process.env.X_API_KEY
      }
    }).pipe(map((res) => res.data))
    .pipe(
      catchError((err : AxiosError) => {
        throw new BadRequestException(err.message);
      }),
    );
  }
}