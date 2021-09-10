"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.WalletsPage = void 0;
var core_1 = require("@angular/core");
var WalletsPage = /** @class */ (function () {
    function WalletsPage(router, _storage, alertController, _comp, location, loadingController) {
        this.router = router;
        this._storage = _storage;
        this.alertController = alertController;
        this._comp = _comp;
        this.location = location;
        this.loadingController = loadingController;
        this.wallets = [];
    }
    WalletsPage.prototype.ngOnInit = function () { };
    WalletsPage.prototype.myBackButton = function () {
        this.location.back();
    };
    WalletsPage.prototype.selectWallet = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var textHeader, textMessage, alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.data.publicKey == data.publicKey) {
                            this._comp.presentToast('Wallet en uso', 'danger', 300);
                            return [2 /*return*/];
                        }
                        textHeader = 'Usar wallet!';
                        textMessage = 'Quiere usar esta wallet?';
                        return [4 /*yield*/, this.alertController.create({
                                cssClass: 'my-custom-class',
                                header: textHeader,
                                message: textMessage,
                                buttons: [
                                    {
                                        text: 'Cancelar',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function (blah) {
                                        }
                                    }, {
                                        text: 'Aceptar',
                                        handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this._storage.setLocalStorage('DATA', data)];
                                                    case 1:
                                                        _a.sent();
                                                        this.router.navigate(['/inicio']);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }
                                    }
                                ]
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WalletsPage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getData();
                return [2 /*return*/];
            });
        });
    };
    WalletsPage.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Por favor espere...',
                            backdropDismiss: false,
                            showBackdrop: true,
                            spinner: "bubbles"
                        })];
                    case 1:
                        loading = _c.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _c.sent();
                        _a = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('WALLETS')];
                    case 3:
                        _a.wallets = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('DATA')];
                    case 4:
                        _b.data = _c.sent();
                        loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    WalletsPage.prototype.eliminarWallet = function (wallet) {
        return __awaiter(this, void 0, void 0, function () {
            var textHeader, textMessage, alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.data.publicKey == wallet.publicKey) {
                            this._comp.presentToast('Wallet en uso', 'danger', 300);
                            return [2 /*return*/];
                        }
                        textHeader = 'Eliminar wallet!';
                        textMessage = 'Quiere <strong>eliminar</strong> wallet de dispositivo?';
                        return [4 /*yield*/, this.alertController.create({
                                cssClass: 'my-custom-class',
                                header: textHeader,
                                message: textMessage,
                                buttons: [
                                    {
                                        text: 'Cancelar',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function (blah) {
                                        }
                                    }, {
                                        text: 'Aceptar',
                                        handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                            var u;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        u = this.wallets.findIndex(function (d) { return d.publicKey == wallet.publicKey; });
                                                        if (!(u == -1)) return [3 /*break*/, 1];
                                                        this._comp.presentToast('Error al eliminar wallet', 'danger', 2000);
                                                        return [3 /*break*/, 3];
                                                    case 1:
                                                        this.wallets.splice(u, 1);
                                                        return [4 /*yield*/, this._storage.setLocalStorage('WALLETS', this.wallets)];
                                                    case 2:
                                                        _a.sent();
                                                        this.getData();
                                                        this._comp.presentToast('Wallet se eliminó con éxito', 'success', 2500);
                                                        _a.label = 3;
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        }); }
                                    }
                                ]
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WalletsPage.prototype.goConfig = function () {
        this.router.navigate(['/options']);
    };
    WalletsPage.prototype.goHome = function () {
        this.router.navigate(['/home']);
    };
    WalletsPage = __decorate([
        core_1.Component({
            selector: 'app-wallets',
            templateUrl: './wallets.page.html',
            styleUrls: ['./wallets.page.scss']
        })
    ], WalletsPage);
    return WalletsPage;
}());
exports.WalletsPage = WalletsPage;
