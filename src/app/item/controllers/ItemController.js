import { controller, injectable } from "snowball/app";
import { ScrollView } from "snowball/components";
import Item from "../containers/Item";
import ItemService from "../services/ItemService";
import ProductService from "../../../domain/services/ProductService";
import DistrictSelectService from "../../address/services/DistrictSelectService";
import CartService from "../../../domain/services/CartService";

@controller(Item)
class ItemController {
    @injectable mainScrollViewHandler = ScrollView.createHandler();
    @injectable itemService: ItemService;
    @injectable districtSelectService: DistrictSelectService;

    constructor(props) {
        this.spuId = Number(props.location.params.id);

        this.districtSelectService = new DistrictSelectService(
            this.ctx.service.address
        );

        this.itemService = new ItemService(
            new ProductService(),
            this.districtSelectService,
            new CartService()
        );
    }

    onInit() {
        this.itemService.init(this.spuId);
    }
}

export default ItemController;