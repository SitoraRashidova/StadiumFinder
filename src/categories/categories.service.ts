import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel:typeof Category){}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.categoryModel.findByPk(id,{include:{all:true}});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto):Promise<Category> {
    const categories=await this.categoryModel.update(updateCategoryDto,{
      where:{id},
      returning:true,
    });
    return categories[1][0]
   ;
  }

  remove(id: number) {
    return this.categoryModel.destroy({where:{id}});
  }
}
