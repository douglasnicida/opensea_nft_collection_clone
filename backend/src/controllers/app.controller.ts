import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('collection')
export class AppController {
    constructor(private appService: AppService) {}

  @Get()
  async findCollection() {
    console.log(this.appService.findCollection())
    return this.appService.findCollection();
  }

  @Get('/nfts')
  async findCollectionNFTs() {
    console.log(this.appService.findAll())
    return this.appService.findAll();
  }

  @Get('/nfts/:id')
  async findNFT(@Param() params: any) {
    console.log(this.appService.findAll())
    return this.appService.findNFT(params.id);
  }
}