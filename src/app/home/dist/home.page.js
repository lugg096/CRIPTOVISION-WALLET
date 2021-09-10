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
exports.HomePage = void 0;
var core_1 = require("@angular/core");
var js_sha256_1 = require("js-sha256");
var sha1 = require("js-sha1");
var core_2 = require("@capacitor/core");
var Camera = core_2.Plugins.Camera, Filesystem = core_2.Plugins.Filesystem;
var environment_1 = require("src/environments/environment");
var generar_code_qr_component_1 = require("../components/generar-code-qr/generar-code-qr.component");
var HomePage = /** @class */ (function () {
    function HomePage(_storage, router, _comp, loadingController, _onboarding, clipboard, _modal, imagePicker) {
        this._storage = _storage;
        this.router = router;
        this._comp = _comp;
        this.loadingController = loadingController;
        this._onboarding = _onboarding;
        this.clipboard = clipboard;
        this._modal = _modal;
        this.imagePicker = imagePicker;
        this.claveValida = false;
        this.dic = environment_1.environment.diccionario;
        this.pin = "";
        this.alias = "Nueva wallet";
        this.wallets = [];
        this.imagen = '';
        this.fraseSeguridad = false;
        this.fotoSeguridad = false;
        this.palabrasPrincipal = []; //Palbras Slide 1 
        this.textValue = '';
        this.palabras = [];
        this.palabrasVerif = [];
        this.slideOptsOnboarding = {
            allowSlideNext: false,
            allowSlidePrev: false,
            slidesPerView: 1,
            initialSlide: 0,
            speed: 400
        };
        /* Codigo pin */
        this.dataSlideCreate = {
            titulo: "PASO 2",
            subTitulo: "Registrar PIN",
            texto: "Nuevo PIN de 6 dígitos"
        };
        this.dataSlideValidacion = {
            titulo: "PASO 3",
            subTitulo: "Confirme su PIN",
            texto: "Ingrese nuevamente PIN de 6 dígitos"
        };
    }
    HomePage.prototype.ngOnInit = function () { };
    HomePage.prototype.initFraseSegura = function () {
        this.palabrasPrincipal = [];
        this.palabras = [];
        this.textValue = '';
        for (var a = 0; a < 12; a++) {
            var wordIndex = Math.floor(Math.random() * 2400);
            this.palabrasPrincipal.push(this.dic[wordIndex]);
            this.palabras.push(this.dic[wordIndex]);
            var separador = ' ';
            if (a == 0)
                separador = '';
            this.textValue = this.textValue + separador + this.dic[wordIndex];
        }
    };
    HomePage.prototype.getWallets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('WALLETS')];
                    case 1:
                        _a.wallets = (_b.sent()) || [];
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.selectPalabra = function (index) {
        this.palabrasVerif.push(this.palabras[index]);
        this.palabras.splice(index, 1);
        this.claveValida = this.errorClave();
    };
    HomePage.prototype.quitarPalabra = function (index) {
        this.palabras.push(this.palabrasVerif[index]);
        this.palabrasVerif.splice(index, 1);
        this.claveValida = this.errorClave();
    };
    HomePage.prototype.goWallets = function () {
        this.router.navigate(['/wallets']);
    };
    HomePage.prototype.terminarWallet = function () {
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
    HomePage.prototype.copyText = function () {
        this.clipboard.copy(this.textValue);
        this._comp.presentToast('Frase copiada', 'primary', 500);
    };
    HomePage.prototype.verificarFrase = function () {
        var hashData = js_sha256_1.sha256(this.textValue);
        this.getAccount('0x' + hashData);
    };
    HomePage.prototype.errorClave = function () {
        var claveValida = true;
        for (var a = 0; a < this.palabrasVerif.length; a++) {
            if (this.palabrasPrincipal[a] != this.palabrasVerif[a])
                claveValida = false;
        }
        if (this.palabrasVerif.length == 0)
            return false;
        return claveValida;
    };
    HomePage.prototype.shuffleArray = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };
    HomePage.prototype.generarQR = function () {
        this._modal.create({
            component: generar_code_qr_component_1.GenerarCodeQRComponent,
            componentProps: {
                codeQR: this.textValue,
                texto: 'Frase de seguridad'
            }
        }).then(function (modal) { return modal.present(); });
    };
    HomePage.prototype.palabrasClave = function () {
        this.palabras = this.shuffleArray(this.palabras);
        this.nextSlidePadre();
    };
    HomePage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.initFraseSegura();
                this.getWallets();
                this.pin = '';
                this.alias = "Nueva wallet";
                this.backSlidePadre();
                this.backSlidePadre();
                this.backSlidePadre();
                this.backSlidePadre();
                this.backSlidePadre();
                this.backSlidePadre();
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.getAccount = function (hashData) {
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
                        this._onboarding.getAccount(hashData).subscribe(function (res) {
                            if (!res) {
                                loading.dismiss();
                                _this._comp.presentToast('Error en servidor', 'danger', 2000);
                                return;
                            }
                            loading.dismiss();
                            _this.nextSlidePadre();
                            _this._storage.datos.ADDRESS = res.address;
                            _this._storage.datos.DID = sha1(js_sha256_1.sha256(res.address));
                            _this._storage.datos.privateKey = res.privateKey;
                            _this._storage.datos.publicKey = res.publicKey;
                        }, function (err) {
                            loading.dismiss();
                            _this._comp.presentToast('Error parametros enviados', 'danger', 2000);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.downloadPhoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path, result, e_2;
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
                                _this.nextSlidePadre();
                            })];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        alert('Unable to write file ' + e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.procesarImagen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var capturedPhoto;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Camera.getPhoto({
                            resultType: core_2.CameraResultType.Base64,
                            source: core_2.CameraSource.Camera,
                            correctOrientation: true
                        }).then(function (imageData) {
                            if (imageData) {
                                _this.imagen = "data:image/jpeg;base64," + imageData.base64String;
                                _this.nextSlidePadre();
                            }
                        }, function (err) {
                            console.log('Ocurrió un problema, vuelva a intentarlo porfavor: ' + err);
                        })];
                    case 1:
                        capturedPhoto = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.nextSlidePadre = function () {
        this.slidesPadre.lockSwipeToNext(false);
        this.slidesPadre.slideNext();
        this.slidesPadre.lockSwipeToNext(true);
    };
    HomePage.prototype.backSlidePadre = function () {
        this.slidesPadre.lockSwipeToPrev(false);
        this.slidesPadre.slidePrev();
        this.slidesPadre.lockSwipeToPrev(true);
    };
    HomePage.prototype.getClave = function ($event) {
        this.pin = $event;
        this.nextSlidePadre();
    };
    HomePage.prototype.getClaveValidPhoto = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var hashPk, loading_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.pin == $event)) return [3 /*break*/, 3];
                        hashPk = js_sha256_1.sha256(js_sha256_1.sha256(this._storage.datos.PHOTO) + js_sha256_1.sha256(this.pin));
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
                        this._onboarding.getAccount('0x' + hashPk).subscribe(function (res) {
                            if (!res) {
                                loading_1.dismiss();
                                _this._comp.presentToast('Error en servidor', 'danger', 2000);
                                return;
                            }
                            loading_1.dismiss();
                            _this.nextSlidePadre();
                            _this._storage.datos.ADDRESS = res.address;
                            _this._storage.datos.DID = sha1(js_sha256_1.sha256(res.address));
                            _this._storage.datos.privateKey = res.privateKey;
                            _this._storage.datos.publicKey = res.publicKey;
                            _this.getClaveValid($event);
                        }, function (err) {
                            _this._comp.presentToast('Error en servidor', 'danger', 2000);
                            loading_1.dismiss();
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.getClaveValid = function ($event) {
        return __awaiter(this, void 0, void 0, function () {
            var position, n1, n2, str, hex1, number1, hex2, number2;
            return __generator(this, function (_a) {
                if (this.pin == $event) {
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
    HomePage.prototype.goImport = function () {
        this.router.navigate(['/import-wallet']);
    };
    __decorate([
        core_1.ViewChild('slidesPadre', { static: false })
    ], HomePage.prototype, "slidesPadre");
    HomePage = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss']
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
