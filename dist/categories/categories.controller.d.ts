import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("./models/category.model").Category>;
    remove(id: string): any;
}
