import { Category } from "../category.model";
import { SubCategory } from "../subCategory.model";




Category.hasMany(SubCategory, {
    foreignKey: "category"
})

SubCategory.belongsTo(Category, {
    foreignKey: "category"
})
