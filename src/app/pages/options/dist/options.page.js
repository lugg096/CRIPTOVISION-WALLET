"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OptionsPage = void 0;
var core_1 = require("@angular/core");
var OptionsPage = /** @class */ (function () {
    function OptionsPage(router) {
        this.router = router;
    }
    OptionsPage.prototype.ngOnInit = function () {
    };
    OptionsPage.prototype.goInicio = function () {
        this.router.navigate(['/inicio']);
    };
    OptionsPage.prototype.goWallets = function () {
        this.router.navigate(['/wallets']);
    };
    OptionsPage.prototype.goData = function () {
        this.router.navigate(['/data-wallet']);
    };
    OptionsPage = __decorate([
        core_1.Component({
            selector: 'app-options',
            templateUrl: './options.page.html',
            styleUrls: ['./options.page.scss']
        })
    ], OptionsPage);
    return OptionsPage;
}());
exports.OptionsPage = OptionsPage;
