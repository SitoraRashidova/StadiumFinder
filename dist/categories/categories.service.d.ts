import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';
export declare class CategoriesService {
    private categoryModel;
    constructor(categoryModel: typeof Category);
    create(createCategoryDto: CreateCategoryDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: number): any;
}
