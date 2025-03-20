import { Category } from "@prisma/client"
import EditCategory from "./EditCategory"
import DeleteCategory from "./DeleteCategory"


const CategoryItem = ({category}: {category: Category}) => {
  return (
    <li className="bg-gray-300 p-2 mb-4 rounded-md flex-between">
        <h3 className="text-black font-medium text-lg flex-1">{category.name}</h3>
        <div className="flex-between gap-4">
           <EditCategory category={category} />
           <DeleteCategory id={category.id} />
        </div>
    </li>
  )
}

export default CategoryItem