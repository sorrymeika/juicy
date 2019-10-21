import { controller, injectable } from "snowball/app";
import { ScrollView } from "snowball/components";
import Item from "../containers/Item";
import ItemService from "../services/ItemService";
import ProductService from "../../../shared/services/ProductService";
import DistrictSelectService from "../../address/services/DistrictSelectService";
import AddressSelectService from "../../address/services/AddressSelectService";

@controller(Item)
class ItemController {
    @injectable mainScrollViewHandler = ScrollView.createHandler();
    @injectable itemService: ItemService;
    @injectable districtSelectService: DistrictSelectService;
    @injectable addressSelectService: AddressSelectService;

    @injectable get currentAddress() {
        return this.addressSelectService.currentAddress;
    }

    @injectable get cartNum() {
        return this.ctx.service.cartNum.total;
    }

    constructor(props) {
        this.spuId = Number(props.location.params.id);

        this.districtSelectService = new DistrictSelectService(
            this.ctx.service.address
        );

        this.addressSelectService = new AddressSelectService(
            this.ctx.service.address,
            this.districtSelectService
        );

        this.cartNumService = this.ctx.service.cartNum;

        this.itemService = new ItemService(
            new ProductService(),
            this.addressSelectService,
            this.ctx.service.cart,
            this.cartNumService
        );
    }

    onInit() {
        this.itemService.init(this.spuId);
        this.cartNumService.pull();
    }
}

export default ItemController;