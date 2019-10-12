import { controller, injectable } from "snowball/app";
import { ScrollView } from "snowball/components";
import Item from "../containers/Item";
import ItemService from "../services/ItemService";
import ProductService from "../../../domain/services/ProductService";
import DistrictSelectService from "../../address/services/DistrictSelectService";
import AddressService from "../../../domain/services/AddressService";

@controller(Item)
class ItemController {
    @injectable mainScrollViewHandler = ScrollView.createHandler();
    @injectable itemService: ItemService;
    @injectable addressSelectService: DistrictSelectService;

    constructor(props) {
        this.spuId = Number(props.location.params.id);

        this.addressSelectService = new DistrictSelectService(
            new AddressService()
        );

        this.itemService = new ItemService(
            new ProductService(),
            this.addressSelectService
        );
    }

    onInit() {
        this.itemService.init(this.spuId);
    }
}

export default ItemController;