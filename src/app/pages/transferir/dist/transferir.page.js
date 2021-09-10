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
exports.TransferirPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var js_sha256_1 = require("js-sha256");
var TransferirPage = /** @class */ (function () {
    function TransferirPage(formBuilder, _comp, barcodeScanner, _storage, router, alertController, _data, _onboarding, loadingController) {
        this.formBuilder = formBuilder;
        this._comp = _comp;
        this.barcodeScanner = barcodeScanner;
        this._storage = _storage;
        this.router = router;
        this.alertController = alertController;
        this._data = _data;
        this._onboarding = _onboarding;
        this.loadingController = loadingController;
        this.submitAttempt = false;
        this.data = { publicKey: '' };
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
        this.divisor = 0;
        this.change = new core_1.EventEmitter();
        this.digitos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        this.pin = "";
        this.slideOpts = {
            allowSlideNext: false,
            allowSlidePrev: false,
            slidesPerView: 1,
            initialSlide: 0,
            speed: 400
        };
        /* publicKey=''; */
        this.p1 = '';
        this.p2 = '';
        this.center = '';
        this.p1Des = '';
        this.p2Des = '';
        this.centerDes = '';
        /* PIN */
        this.dataSlideValid = {
            titulo: "",
            subTitulo: "Ingresar ePIN",
            texto: "Ingrese ePIN de 6 dígitos de Vsion Wallet"
        };
        this.transferForm = formBuilder.group({
            publicKey: ['', forms_1.Validators.required],
            monto: [0, forms_1.Validators.required]
        });
    }
    TransferirPage.prototype.ngOnInit = function () {
        var _this = this;
        this._data.currentMessage.subscribe(function (moneda) {
            _this.moneda = moneda;
            if (_this.moneda.nameAbrev == 'VSION') {
                _this.divisor = 100000000;
            }
            if (_this.moneda.nameAbrev == 'BNB') {
                _this.divisor = 1000000000000000000;
            }
        });
        this.getData();
    };
    TransferirPage.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('DATA')];
                    case 1:
                        _a.data = _b.sent();
                        this.p1 = this.data.publicKey.substring(0, 6);
                        this.p2 = this.data.publicKey.substring(this.data.publicKey.length - 4, this.data.publicKey.length);
                        this.center = this.data.publicKey.substring(6, this.data.publicKey.length - 4);
                        return [2 /*return*/];
                }
            });
        });
    };
    TransferirPage.prototype.scan = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.barcodeScanner.scan({ prompt: "Lee la llave publica" }).then(function (publicKey) { return __awaiter(_this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        if (publicKey) {
                            if (publicKey.text.indexOf(":") != -1) {
                                data = publicKey.text.split(":");
                                this.transferForm.controls['publicKey'].setValue(data[1]);
                            }
                            else
                                this.transferForm.controls['publicKey'].setValue(publicKey.text);
                        }
                        return [2 /*return*/];
                    });
                }); })["catch"](function (err) {
                    _this._comp.presentToast('Error en lector QR', 'danger', 3000);
                    console.log('Error', err);
                });
                return [2 /*return*/];
            });
        });
    };
    TransferirPage.prototype.continuar = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.submitAttempt = true;
                this.p1Des = this.transferForm.value.publicKey.substring(0, 6);
                this.p2Des = this.transferForm.value.publicKey.substring(this.transferForm.value.publicKey.length - 4, this.transferForm.value.publicKey.length);
                this.centerDes = this.transferForm.value.publicKey.substring(6, this.transferForm.value.publicKey.length - 4);
                if (this.transferForm.valid) {
                    if (this.moneda.monto < this.transferForm.value.monto) {
                        this._comp.presentToast('Cantidad excedida', 'danger', 3000);
                        return [2 /*return*/];
                    }
                    if (this.transferForm.value.monto <= 0) {
                        this._comp.presentToast('Cantidad incorrecta', 'danger', 3000);
                        return [2 /*return*/];
                    }
                    this.nextSlidePadre();
                }
                return [2 /*return*/];
            });
        });
    };
    TransferirPage.prototype.goInicio = function () {
        this.router.navigate(['/inicio']);
    };
    TransferirPage.prototype.nextSlidePadre = function () {
        this.slidesPadre.lockSwipeToNext(false);
        this.slidesPadre.slideNext();
        this.slidesPadre.lockSwipeToNext(true);
    };
    TransferirPage.prototype.backSlidePadre = function () {
        this.slidesPadre.lockSwipeToPrev(false);
        this.slidesPadre.slidePrev();
        this.slidesPadre.lockSwipeToPrev(true);
    };
    TransferirPage.prototype.getClave = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var hash_PINsha256, position, n1, n2, dataSegure, number01, number02, privateKey, dataTransfer, loading_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pin = $event;
                        hash_PINsha256 = js_sha256_1.sha256(js_sha256_1.sha256(this.pin.toString()));
                        if (!(hash_PINsha256 == this.data.PIN)) return [3 /*break*/, 3];
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
                        dataTransfer = {
                            addressTo: this.transferForm.value.publicKey,
                            amount: this.transferForm.value.monto * this.divisor,
                            addressFrom: this.data.publicKey,
                            privateKey: privateKey
                        };
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Por favor espere...',
                                backdropDismiss: false,
                                showBackdrop: true,
                                spinner: "bubbles"
                            })];
                    case 1:
                        loading_1 = _a.sent();
                        return [4 /*yield*/, loading_1.present()];
                    case 2:
                        _a.sent();
                        if (this.moneda.nameAbrev == 'VSION') {
                            this._onboarding.trasfer(dataTransfer).subscribe(function (res) {
                                loading_1.dismiss();
                                _this.nextSlidePadre();
                            }, function (err) {
                                loading_1.dismiss();
                                if (err.error == 'Returned error: insufficient funds for gas * price + value') {
                                    _this.comprar();
                                }
                                else {
                                    _this.goInicio();
                                    _this._comp.presentToast(err.error.reason, 'danger', 2000);
                                }
                            });
                        }
                        if (this.moneda.nameAbrev == 'BNB') {
                            this._onboarding.trasferBNB(dataTransfer).subscribe(function (res) {
                                loading_1.dismiss();
                                _this.nextSlidePadre();
                            }, function (err) {
                                loading_1.dismiss();
                                if (err.error == 'Returned error: insufficient funds for gas * price + value') {
                                    _this.comprar();
                                }
                                else {
                                    _this.goInicio();
                                    _this._comp.presentToast(err.error.reason, 'danger', 2000);
                                }
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        this._comp.presentToast('El PIN no es correcto', 'danger', 2000);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TransferirPage.prototype.comprar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            cssClass: 'alert-validar',
                            message: ' <div class="container"><img class="imgIcon"   src="../assets/images/Binance-icon.png">' +
                                ' </div> <p class="text-wrap mt-2"><b style="font-size: 11px; color: rgba(0, 0, 0, 0.768);">Debe cargar ' + 'BNB' + ' a su cuenta</b> <br>' +
                                ' <small style="color: darkgrey;">Si desea hacerlo por transferencia interbancaria puede enviar un correo a:</small> <br>  <br>' +
                                '<small class="colorPregunta">recargas@0xaddress.com</small> <br> <small style="color: darkgrey;">Correo corporativo</small></p>',
                            buttons: [
                                {
                                    text: 'Ok',
                                    handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            this.goInicio();
                                            return [2 /*return*/];
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
    __decorate([
        core_1.Output()
    ], TransferirPage.prototype, "change");
    __decorate([
        core_1.ViewChild('slidesPadre', { static: false })
    ], TransferirPage.prototype, "slidesPadre");
    TransferirPage = __decorate([
        core_1.Component({
            selector: 'app-transferir',
            templateUrl: './transferir.page.html',
            styleUrls: ['./transferir.page.scss']
        })
    ], TransferirPage);
    return TransferirPage;
}());
exports.TransferirPage = TransferirPage;
