import { controller, injectable } from "snowball/app";
import { ScrollView } from "snowball/components";
import Item from "../containers/Item";
import ItemService from "../services/ItemService";
import ProductService from "../../../domain/services/ProductService";

@controller(Item)
class ItemController {
    @injectable mainScrollViewHandler = ScrollView.createHandler();
    @injectable itemService: ItemService;

    constructor(props) {
        this.spuId = Number(props.location.params.id);
        this.itemService = new ItemService(
            new ProductService()
        );
    }

    onInit() {
        this.itemService.init(this.spuId);
    }
}

export default ItemController;