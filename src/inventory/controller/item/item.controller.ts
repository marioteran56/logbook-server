import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Items } from 'src/inventory/models/item.model';
import { ItemsService } from 'src/inventory/services/items/items.service';

@Controller('item')
export class ItemController {
    constructor(private itemsService: ItemsService){

    }

    @Get()
    get(){
        return this.itemsService.findAll().then(res=>{
            return {success: true, data: res}
        }).catch(error=>{
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        })
    }

    @Post()
    save(@Body() item: Items){
        return this.itemsService.create(item).then(res=>{
            return {success: true, data: res}
        }).catch(error=>{
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        })
    }

    @Post('/update')
    update(@Body() item: Items){
        return this.itemsService.update(item).then(res=>{
            return {success: true, data: res}
        }).catch(error=>{
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        })
    }

    @Get('/delete/:id')
    delete(@Param('id') id){
        return this.itemsService.delete(id).then(res=>{
            return {success: true, data: res}
        }).catch(error=>{
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        })
    }
}
