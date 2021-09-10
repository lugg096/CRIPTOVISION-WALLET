"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransferirPageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var transferir_routing_module_1 = require("./transferir-routing.module");
var transferir_page_1 = require("./transferir.page");
var components_module_1 = require("src/app/components/components.module");
var TransferirPageModule = /** @class */ (function () {
    function TransferirPageModule() {
    }
    TransferirPageModule = __decorate([
        core_1.NgModule({
            imports: [
                components_module_1.ComponentsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                transferir_routing_module_1.TransferirPageRoutingModule
            ],
            declarations: [transferir_page_1.TransferirPage]
        })
    ], TransferirPageModule);
    return TransferirPageModule;
}());
exports.TransferirPageModule = TransferirPageModule;
