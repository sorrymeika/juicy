import { controller, injectable } from "snowball/app";
import { ScrollView } from "snowball/components";
import Item from "../containers/Item";
import ItemService from "../services/ItemService";
import ItemShopService from "../services/ItemShopService";
import ProductService from "../../../shared/services/ProductService";
import DistrictSelectService from "../../address/services/DistrictSelectService";
import AddressSelectService from "../../address/services/AddressSelectService";
import SearchService from "../../../shared/services/SearchService";

@controller(Item)
class ItemController {
    @injectable mainScrollViewHandler = ScrollView.createHandler();
    @injectable itemService: ItemService;
    @injectable districtSelectService: DistrictSelectService;
    @injectable addressSelectService: AddressSelectService;
    @injectable itemShopService: ItemShopService;
    @injectable searchService: SearchService;

    @injectable get currentAddress() {
        return this.addressSelectService.currentAddress;
    }

    @injectable get cartNum() {
        return this.ctx.service.cartNum.total;
    }

    constructor(props) {
        this.spuId = Number(props.location.params.id);

        this.searchService = new SearchService();

        this.districtSelectService = new DistrictSelectService(
            this.ctx.service.address
        );

        this.addressSelectService = new AddressSelectService(
            this.ctx.service.address,
            this.districtSelectService
        );

        this.cartNumService = this.ctx.service.cartNum;

        this.itemShopService = new ItemShopService(
            this.searchService
        );

        this.itemService = new ItemService(
            new ProductService(),
            this.addressSelectService,
            this.ctx.service.cart,
            this.cartNumService,
            this.itemShopService
        );
    }

    onInit() {
        this.itemService.init(this.spuId);
        this.cartNumService.pull();
    }
}

export default ItemController;