"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransferirPageRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var transferir_page_1 = require("./transferir.page");
var routes = [
    {
        path: '',
        component: transferir_page_1.TransferirPage
    }
];
var TransferirPageRoutingModule = /** @class */ (function () {
    function TransferirPageRoutingModule() {
    }
    TransferirPageRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], TransferirPageRoutingModule);
    return TransferirPageRoutingModule;
}());
exports.TransferirPageRoutingModule = TransferirPageRoutingModule;
