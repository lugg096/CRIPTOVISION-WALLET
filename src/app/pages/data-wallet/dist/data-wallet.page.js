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
exports.DataWalletPage = void 0;
var core_1 = require("@angular/core");
var generar_code_qr_component_1 = require("src/app/components/generar-code-qr/generar-code-qr.component");
var js_sha256_1 = require("js-sha256");
var core_2 = require("@capacitor/core");
var Camera = core_2.Plugins.Camera, Filesystem = core_2.Plugins.Filesystem;
var DataWalletPage = /** @class */ (function () {
    function DataWalletPage(_storage, _modal, router, _comp, alertController) {
        this._storage = _storage;
        this._modal = _modal;
        this.router = router;
        this._comp = _comp;
        this.alertController = alertController;
        this.data = {
            ADDRESS: '',
            DID: '',
            NAME: '',
            PHOTO: '',
            PHOTO_MIN: '',
            privateKey: '',
            publicKey: ''
        };
        this.imagen = '';
        this.fotoSeguridad = false;
        this.slideOpts = {
            allowSlideNext: false,
            allowSlidePrev: false,
            slidesPerView: 1,
            initialSlide: 0,
            speed: 400
        };
        this.wallets = [];
        this.photoSegure = false;
        /* PIN */
        this.dataSlideValid = {
            titulo: "",
            subTitulo: "Ingresar ePIN",
            texto: "Ingrese ePIN de 6 dígitos de Vsion Wallet"
        };
        this.pin = '';
    }
    DataWalletPage.prototype.ngOnInit = function () { };
    DataWalletPage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getDataStorage();
                return [2 /*return*/];
            });
        });
    };
    DataWalletPage.prototype.cambiarNombre = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Nombre de cuenta',
                            inputs: [
                                {
                                    name: 'nombre',
                                    id: 'nombre',
                                    type: 'textarea',
                                    placeholder: 'Ingrese nombre de cuenta para actualizar',
                                    value: this.data.NAME
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (res) { return __awaiter(_this, void 0, void 0, function () {
                                        var index;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    index = this.wallets.findIndex(function (d) { return d.publicKey == _this.data.publicKey; });
                                                    if (!(index == -1)) return [3 /*break*/, 1];
                                                    this._comp.presentToast('Error al editar wallet', 'danger', 2000);
                                                    return [3 /*break*/, 4];
                                                case 1:
                                                    this.wallets[index].NAME = res.nombre;
                                                    return [4 /*yield*/, this._storage.setLocalStorage('DATA', this.wallets[index])];
                                                case 2:
                                                    _a.sent();
                                                    return [4 /*yield*/, this._storage.setLocalStorage('WALLETS', this.wallets)];
                                                case 3:
                                                    _a.sent();
                                                    this.getDataStorage();
                                                    this._comp.presentToast('Se actualizo nombre con éxito', 'success', 2500);
                                                    _a.label = 4;
                                                case 4: return [2 /*return*/];
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
    DataWalletPage.prototype.getDataStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('DATA')];
                    case 1:
                        _a.data = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('WALLETS')];
                    case 2:
                        _b.wallets = _c.sent();
                        if (this.data.PHOTO != '') {
                            if (this.data.PHOTO.substring(0, 4) == 'data')
                                this.imagen = this.data.PHOTO;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DataWalletPage.prototype.goConfig = function () {
        this.router.navigate(['/options']);
    };
    DataWalletPage.prototype.verPk = function () {
        this.nextSlidePadre();
    };
    DataWalletPage.prototype.fotoSeg = function () {
        this.fotoSeguridad = true;
        this.nextSlidePadre();
    };
    DataWalletPage.prototype.downloadPhoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path, result, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        path = "seguridad/token20_" + Date.now() + ".jpeg";
                        return [4 /*yield*/, Filesystem.writeFile({
                                path: path,
                                data: this.imagen,
                                directory: core_2.FilesystemDirectory.Documents,
                                recursive: true
                            }).then(function (res) {
                                _this._comp.presentToast('Descarga completa', 'primary', 1000);
                                _this._storage.datos.PHOTO = _this.imagen;
                            })];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error('Unable to write file ', e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DataWalletPage.prototype.cancelFotoSeg = function () {
        this.backSlidePadre();
        this.backSlidePadre();
        this.fotoSeguridad = false;
    };
    DataWalletPage.prototype.generarQR = function (data) {
        this._modal.create({
            component: generar_code_qr_component_1.GenerarCodeQRComponent,
            componentProps: {
                codeQR: data.value,
                texto: data.text
            }
        }).then(function (modal) { return modal.present(); });
    };
    DataWalletPage.prototype.nextSlidePadre = function () {
        this.slidesPadre.lockSwipeToNext(false);
        this.slidesPadre.slideNext();
        this.slidesPadre.lockSwipeToNext(true);
    };
    DataWalletPage.prototype.backSlidePadre = function () {
        this.fotoSeguridad = false;
        this.slidesPadre.lockSwipeToPrev(false);
        this.slidesPadre.slidePrev();
        this.slidesPadre.lockSwipeToPrev(true);
    };
    DataWalletPage.prototype.getClave = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var hash_PINsha256, position, n1, n2, dataSegure, number01, number02, privateKey;
            return __generator(this, function (_a) {
                this.pin = $event;
                hash_PINsha256 = js_sha256_1.sha256(js_sha256_1.sha256(this.pin.toString()));
                if (hash_PINsha256 == this.data.PIN) {
                    position = Number(this.pin.substr(0, 2));
                    if (position > 62)
                        position = position - 62;
                    if (position == 0)
                        position = 2;
                    n1 = Number(this.pin.substr(2, 2));
                    n2 = Number(this.pin.substr(4, 2));
                    dataSegure = this.data.privateKey.substr(62, this.data.privateKey.length);
                    number01 = Number(dataSegure.split("G")[0]) - n1;
                    number02 = Number(dataSegure.split("G")[1]) - n2;
                    privateKey = this.data.privateKey.substr(0, position)
                        + number01.toString(16) + number02.toString(16) + this.data.privateKey.substring(position, 62);
                    if (!this.fotoSeguridad) {
                        this.generarQR({ value: privateKey, text: 'Llave privada' });
                        this.backSlidePadre();
                    }
                    else
                        this.nextSlidePadre();
                }
                else
                    this._comp.presentToast('Clave no es la misma', 'danger', 1000);
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        core_1.ViewChild('slidesPadre', { static: false })
    ], DataWalletPage.prototype, "slidesPadre");
    DataWalletPage = __decorate([
        core_1.Component({
            selector: 'app-data-wallet',
            templateUrl: './data-wallet.page.html',
            styleUrls: ['./data-wallet.page.scss']
        })
    ], DataWalletPage);
    return DataWalletPage;
}());
exports.DataWalletPage = DataWalletPage;
