import { Injectable } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './models/comfort.model';

@Injectable()
export class ComfortService {
  constructor(@InjectModel(Comfort) private comfortModels:typeof Comfort){}
  create(createComfortDto: CreateComfortDto) {
    return this.comfortModels.create(createComfortDto);
  }

  findAll() {
    return this.comfortModels.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.comfortModels.findByPk(id,{include:{all:true}});
  }

  update(id: number, updateComfortDto: UpdateComfortDto) {
    return this.comfortModels.update(updateComfortDto,{where:{id}});
  }

  remove(id: number) {
    return this.comfortModels.destroy({where:{id}})};
  }

