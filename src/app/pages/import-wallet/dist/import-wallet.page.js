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
exports.ImportWalletPage = void 0;
var core_1 = require("@angular/core");
var js_sha256_1 = require("js-sha256");
var sha1 = require("js-sha1");
var ImportWalletPage = /** @class */ (function () {
    function ImportWalletPage(_storage, router, barcodeScanner, loadingController, _onboarding, _comp, imagePicker) {
        this._storage = _storage;
        this.router = router;
        this.barcodeScanner = barcodeScanner;
        this.loadingController = loadingController;
        this._onboarding = _onboarding;
        this._comp = _comp;
        this.imagePicker = imagePicker;
        this.slideOptsOnboarding = {
            allowSlideNext: false,
            allowSlidePrev: false,
            slidesPerView: 1,
            initialSlide: 0,
            speed: 400
        };
        this.alias = "Nueva wallet";
        this.section = 'frase';
        this.frase = '';
        this.llavePublica = '';
        this.foto = '';
        /* Codigo pin */
        this.dataSlideImportPhoto = {
            titulo: "Importar",
            subTitulo: "Ingresar PIN",
            texto: "PIN de 6 dígitos con la que creo la cuenta"
        };
        this.dataSlideCreate = {
            titulo: "PASO 1",
            subTitulo: "Registrar PIN",
            texto: "Nuevo PIN de 6 dígitos"
        };
        this.dataSlideValidacion = {
            titulo: "PASO 2",
            subTitulo: "Confirme su PIN",
            texto: "Ingrese nuevamente PIN de 6 dígitos"
        };
        this.pin = "";
    }
    ImportWalletPage.prototype.ngOnInit = function () {
    };
    ImportWalletPage.prototype.verificarFrase = function () {
        var hashData = js_sha256_1.sha256(this.frase);
        this.getAccount('0x' + hashData);
    };
    ImportWalletPage.prototype.verificarPhoto = function () {
        var hashData = js_sha256_1.sha256(this.foto);
        this.getAccount('0x' + hashData);
    };
    ImportWalletPage.prototype.segmentChanged = function (event) {
        this.section = event.detail.value;
    };
    ImportWalletPage.prototype.scan = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.barcodeScanner.scan({ prompt: "Lee la llave publica" }).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (type == 'pk')
                            this.llavePublica = data.text;
                        if (type == 'frase')
                            this.frase = data.text;
                        return [2 /*return*/];
                    });
                }); })["catch"](function (err) {
                    console.log('Error', err);
                });
                return [2 /*return*/];
            });
        });
    };
    ImportWalletPage.prototype.goHome = function () {
        this.router.navigate(['/home']);
    };
    ImportWalletPage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._storage.resetData();
                this.frase = '';
                this.llavePublica = '';
                this.pin = '';
                this.backSlidePadre();
                this.backSlidePadre();
                return [2 /*return*/];
            });
        });
    };
    ImportWalletPage.prototype.terminarWallet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wallets, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._storage.datos.NAME = this.alias;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this._storage.getLocalStorage('WALLETS')];
                    case 2:
                        wallets = (_a.sent()) || [];
                        wallets.push(this._storage.datos);
                        return [4 /*yield*/, this._storage.setLocalStorage('WALLETS', wallets)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this._storage.setLocalStorage('DATA', this._storage.datos)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        alert('Ocurrió un problema de compatibilidad con navegador: ' + e_1);
                        return [3 /*break*/, 6];
                    case 6:
                        this.router.navigate(['/inicio']);
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportWalletPage.prototype.getAccount = function (hashData) {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Por favor espere...',
                            backdropDismiss: false,
                            showBackdrop: true,
                            spinner: "bubbles"
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this._onboarding.getAccount(hashData).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var index, wallets;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!res) {
                                            alert('Error en servidor');
                                            return [2 /*return*/];
                                        }
                                        return [4 /*yield*/, this._storage.getLocalStorage('WALLETS')];
                                    case 1:
                                        wallets = (_a.sent()) || [];
                                        if (wallets.length == 0)
                                            index = -1;
                                        else
                                            index = wallets.findIndex(function (d) { return d.publicKey == res.publicKey; });
                                        if (index != -1) {
                                            this._comp.presentToast('Wallet ya está registrada en dispositivo', 'danger', 2000);
                                            loading.dismiss();
                                        }
                                        else {
                                            loading.dismiss();
                                            this.nextSlidePadre();
                                            this._storage.datos.ADDRESS = res.address;
                                            this._storage.datos.DID = sha1(js_sha256_1.sha256(res.address));
                                            this._storage.datos.privateKey = res.privateKey;
                                            this._storage.datos.publicKey = res.publicKey;
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) {
                            loading.dismiss();
                            _this._comp.presentToast('Error parametros enviados', 'danger', 2000);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportWalletPage.prototype.gallery = function () {
        var _this = this;
        var options = {
            outputType: 1,
            maximumImagesCount: 1
        };
        this.imagePicker.getPictures(options).then(function (results) {
            _this.foto = 'data:image/jpeg;base64,' + results[0];
        }, function (err) {
            console.log('MOSTRAR', err);
        });
    };
    ImportWalletPage.prototype.fileChangeEvent = function (fileInput) {
        var _this = this;
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            console.log('fileInput.target.files[0]', fileInput.target.files[0]);
            var reader = new FileReader();
            reader.onload = function (e) {
                var imgBase64Path = e.target.result;
                _this.cardImageBase64 = imgBase64Path;
                var hashPhoto = js_sha256_1.sha256(_this.cardImageBase64);
                _this.nextSlidePadre();
            };
            reader.readAsDataURL(fileInput.target.files[0]);
        }
    };
    ImportWalletPage.prototype.nextSlidePadre = function () {
        this.slidesPadre.lockSwipeToNext(false);
        this.slidesPadre.slideNext();
        this.slidesPadre.lockSwipeToNext(true);
    };
    ImportWalletPage.prototype.backSlidePadre = function () {
        this.slidesPadre.lockSwipeToPrev(false);
        this.slidesPadre.slidePrev();
        this.slidesPadre.lockSwipeToPrev(true);
    };
    ImportWalletPage.prototype.getClave = function ($event) {
        this.pin = $event;
        this.nextSlidePadre();
    };
    ImportWalletPage.prototype.getClaveValidPhoto = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var hashPk, loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pin = $event;
                        hashPk = js_sha256_1.sha256(js_sha256_1.sha256(this.cardImageBase64) + js_sha256_1.sha256(this.pin));
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Por favor espere...',
                                backdropDismiss: false,
                                showBackdrop: true,
                                spinner: "bubbles"
                            })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this._onboarding.getAccount('0x' + hashPk).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var index, wallets;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._storage.getLocalStorage('WALLETS')];
                                    case 1:
                                        wallets = (_a.sent()) || [];
                                        if (wallets.length == 0)
                                            index = -1;
                                        else
                                            index = wallets.findIndex(function (d) { return d.publicKey == res.publicKey; });
                                        if (index != -1) {
                                            this._comp.presentToast('Wallet ya está registrada en dispositivo', 'danger', 2000);
                                            loading.dismiss();
                                        }
                                        else {
                                            loading.dismiss();
                                            this.nextSlidePadre();
                                            this._storage.datos.ADDRESS = res.address;
                                            this._storage.datos.DID = sha1(js_sha256_1.sha256(res.address));
                                            this._storage.datos.privateKey = res.privateKey;
                                            this._storage.datos.publicKey = res.publicKey;
                                            this.getClaveValid($event);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) {
                            _this._comp.presentToast('Error parametros enviados', 'danger', 2000);
                            loading.dismiss();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportWalletPage.prototype.getClaveValid = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var position, n1, n2, str, hex1, number1, hex2, number2;
            return __generator(this, function (_a) {
                if (this.pin == $event || this.section == 'foto') {
                    this._storage.datos.PIN = js_sha256_1.sha256(js_sha256_1.sha256(this.pin.toString()));
                    position = Number(this.pin.substr(0, 2));
                    if (position > 62)
                        position = position - 62;
                    if (position == 0)
                        position = 2;
                    n1 = Number(this.pin.substr(2, 2));
                    n2 = Number(this.pin.substr(4, 2));
                    str = this._storage.datos.privateKey.substr(position, 4);
                    hex1 = str.substr(0, 2);
                    number1 = parseInt(hex1, 16) + n1;
                    hex2 = str.substr(2, 2);
                    number2 = parseInt(hex2, 16) + n2;
                    this._storage.datos.privateKey = this._storage.datos.privateKey.substr(0, position) +
                        this._storage.datos.privateKey.substr(position + 4, this._storage.datos.privateKey.length) +
                        number1 + 'G' + number2;
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
    ], ImportWalletPage.prototype, "slidesPadre");
    ImportWalletPage = __decorate([
        core_1.Component({
            selector: 'app-import-wallet',
            templateUrl: './import-wallet.page.html',
            styleUrls: ['./import-wallet.page.scss']
        })
    ], ImportWalletPage);
    return ImportWalletPage;
}());
exports.ImportWalletPage = ImportWalletPage;
