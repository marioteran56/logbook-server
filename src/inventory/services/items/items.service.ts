import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from 'src/inventory/models/item.model';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
    constructor(@InjectRepository(Items) private itemsRepository: Repository<Items>){

    }

    async findAll(): Promise<Items[]>{
        return await this.itemsRepository.findBy({status: true});
    }

    async findById(id: number): Promise<Items[]>{
        return await this.itemsRepository.findBy({id: id, status: true});
    }

    async create(item: Items): Promise<Items>{
        return await this.itemsRepository.save(item);
    }

    async update(item: Items): Promise<Items>{
        return await this.itemsRepository.save(item);
    }

    async delete(id: number): Promise<string>{
        await this.itemsRepository.delete(id);

        return 'OK'
    }
}
