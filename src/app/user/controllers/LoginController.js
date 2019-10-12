import { controller, injectable } from "snowball/app";
import Login from "../containers/Login";
import LoginService from "../services/LoginService";
// import { request } from "./jkGateway";

@controller(Login)
class LoginController {
    @injectable loginService: LoginService;

    constructor() {
        this.loginService = new LoginService();
    }

    onInit() {
        // this.ctx.service.user.getUserInfo();

        // this.initData();
    }

    // initData() {
    //     const sql = [];

    //     request('address.getAllProvinces', false)
    //         .then(res => {
    //             let cityId = 0;
    //             let districtId = 0;

    //             return Promise.all(
    //                 res.data.value.map(({ provinceCode, provinceName }, i) => {
    //                     const provinceId = i + 1;
    //                     sql.push(`insert into provice (id,name,areaCode) values (${provinceId},'${provinceName}','${provinceCode}');`);

    //                     return request('address.getAllCitiesByProvinceCode', false, {
    //                         provinceCode
    //                     })
    //                         .then((cityRes) => {
    //                             if (!cityRes.data.value) {
    //                                 console.log('no city:', provinceCode, provinceName);
    //                                 return;
    //                             }

    //                             return Promise.all(
    //                                 cityRes.data.value.map(({ cityCode, cityName, initial }) => {
    //                                     ++cityId;

    //                                     const currentCityId = cityId;

    //                                     sql.push(`insert into city (id,name,areaCode,initial,provinceId,provinceCode) values (${currentCityId},'${cityName}','${cityCode}','${initial}',${provinceId},'${provinceCode}');`);

    //                                     return request('address.getAllDistrictsByCityCode', false, {
    //                                         cityCode
    //                                     })
    //                                         .then(districtRes => {
    //                                             if (!districtRes.data.value) {
    //                                                 console.log('no district:', cityCode, cityName);
    //                                                 return;
    //                                             }
    //                                             districtRes.data.value.forEach(({ districtCode, districtName }) => {
    //                                                 sql.push(`insert into district (id,name,areaCode,cityId,cityCode) values (${++districtId},'${districtName}','${districtCode}',${currentCityId},'${cityCode}');`);
    //                                             });
    //                                         });

    //                                 })
    //                             );
    //                         });
    //                 })
    //             );
    //         })
    //         .then(() => {
    //             console.log(sql.join('\n'));
    //         });
    // }
}

export default LoginController;