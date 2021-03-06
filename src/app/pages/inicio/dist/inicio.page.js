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
exports.InicioPage = void 0;
var core_1 = require("@angular/core");
var generar_code_qr_component_1 = require("src/app/components/generar-code-qr/generar-code-qr.component");
var InicioPage = /** @class */ (function () {
    function InicioPage(_modal, router, _data, _comp, _onboarding, _storage) {
        this._modal = _modal;
        this.router = router;
        this._data = _data;
        this._comp = _comp;
        this._onboarding = _onboarding;
        this._storage = _storage;
        this.listMonedas = [
            {
                name: 'Criptovision',
                nameAbrev: 'VSION',
                monto: 0,
                tipoCambio: 10,
                porcentaje: '- 0.32%',
                logo: {
                    tipo: 'img',
                    icon: null,
                    color: 'mediumturquoise',
                    img: '../../../assets/images/LOGO-ICONO2.png'
                }
            },
            {
                name: 'Binance',
                nameAbrev: 'BNB',
                monto: 0,
                tipoCambio: 120,
                porcentaje: '- 0.59%',
                logo: {
                    tipo: 'img',
                    icon: null,
                    color: 'coral',
                    img: '../../../assets/images/Binance-icon.png'
                }
            }
        ];
        this.nameWallet = '';
        this.moneda = {
            name: '',
            nameAbrev: '',
            monto: 0,
            tipoCambio: 0,
            porcentaje: '',
            logo: {
                tipo: '',
                icon: null,
                color: '#000',
                img: ''
            }
        };
    }
    InicioPage.prototype.ngOnInit = function () {
        this.moneda = this.listMonedas[0];
        this.insertWallet();
    };
    InicioPage.prototype.insertWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wallets, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._storage.getLocalStorage('WALLETS')];
                    case 1:
                        wallets = (_a.sent()) || [];
                        if (!(wallets.length == 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._storage.getLocalStorage('DATA')];
                    case 2:
                        data = _a.sent();
                        wallets.push(data);
                        return [4 /*yield*/, this._storage.setLocalStorage('WALLETS', wallets)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InicioPage.prototype.goOptions = function () {
        this.router.navigate(['/options']);
    };
    InicioPage.prototype.getCoins = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pk;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('DATA')];
                    case 1:
                        _a.data = _b.sent();
                        pk = this.data.publicKey;
                        this.nameWallet = this.data.NAME;
                        this._onboarding.getCoinVision(pk).subscribe(function (res) {
                            _this.listMonedas[0].monto = res.balance / 100000000;
                        }, function (err) {
                            _this._comp.presentToast('Error con CoinVision', 'danger', 2000);
                        });
                        this._onboarding.getCoinBNB(pk).subscribe(function (res) {
                            _this.listMonedas[1].monto = res / 1000000000000000000;
                        }, function (err) {
                            _this._comp.presentToast('Error con BNB', 'danger', 2000);
                        });
                        if (event)
                            event.target.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    InicioPage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getCoins();
                return [2 /*return*/];
            });
        });
    };
    InicioPage.prototype.goWallets = function () {
        this.router.navigate(['/wallets']);
    };
    InicioPage.prototype.verToken = function (item) {
        this.moneda = item;
    };
    InicioPage.prototype.recibir = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._modal.create({
                    component: generar_code_qr_component_1.GenerarCodeQRComponent,
                    componentProps: {
                        codeQR: this.data.publicKey,
                        texto: 'Direcci??n de la cuenta',
                        title: 'Recibir'
                    }
                }).then(function (modal) { return modal.present(); });
                return [2 /*return*/];
            });
        });
    };
    InicioPage.prototype.transactions = function (moneda) {
        return __awaiter(this, void 0, void 0, function () {
            var monedaName;
            return __generator(this, function (_a) {
                monedaName = encodeURIComponent(moneda.nameAbrev);
                this.router.navigateByUrl("/transactions/" + monedaName);
                return [2 /*return*/];
            });
        });
    };
    InicioPage.prototype.transaction = function (moneda) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._data.changeMessage(moneda);
                this.router.navigate(['/transferir']);
                return [2 /*return*/];
            });
        });
    };
    InicioPage = __decorate([
        core_1.Component({
            selector: 'app-inicio',
            templateUrl: './inicio.page.html',
            styleUrls: ['./inicio.page.scss']
        })
    ], InicioPage);
    return InicioPage;
}());
exports.InicioPage = InicioPage;
