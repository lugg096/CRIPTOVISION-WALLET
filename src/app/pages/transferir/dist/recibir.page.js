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
exports.RecibirPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var js_sha256_1 = require("js-sha256");
var RecibirPage = /** @class */ (function () {
    function RecibirPage(formBuilder, _comp, barcodeScanner, _storage, router, _data, _onboarding, loadingController) {
        this.formBuilder = formBuilder;
        this._comp = _comp;
        this.barcodeScanner = barcodeScanner;
        this._storage = _storage;
        this.router = router;
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
        /* PIN */
        this.dataSlideValid = {
            titulo: "",
            subTitulo: "Ingresar ePIN",
            texto: "Ingresar ePIN de VisionToken de 6 dígitos"
        };
        this.transferForm = formBuilder.group({
            publickey: ['', forms_1.Validators.required],
            monto: ['', forms_1.Validators.required]
        });
    }
    RecibirPage.prototype.ngOnInit = function () {
        var _this = this;
        this._data.currentMessage.subscribe(function (moneda) {
            _this.moneda = moneda;
        });
        this.getData();
    };
    RecibirPage.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._storage.getLocalStorage('DATA')];
                    case 1:
                        _a.data = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RecibirPage.prototype.scan = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.transferForm.controls['publickey'].setValue('0x5ad703fD9DA60C7982E23D25cF7d31D7F72AA2Ba');
                return [2 /*return*/];
            });
        });
    };
    RecibirPage.prototype.continuar = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.submitAttempt = true;
                if (this.transferForm.valid) {
                    console.log(this.transferForm.value);
                    this.nextSlidePadre();
                }
                return [2 /*return*/];
            });
        });
    };
    RecibirPage.prototype.transfer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('MOSTRAR00001');
                this.submitAttempt = true;
                console.log(this.transferForm.value);
                this.nextSlidePadre();
                return [2 /*return*/];
            });
        });
    };
    RecibirPage.prototype.goInicio = function () {
        this.router.navigate(['/inicio']);
    };
    RecibirPage.prototype.nextSlidePadre = function () {
        this.slidesPadre.lockSwipeToNext(false);
        this.slidesPadre.slideNext();
        this.slidesPadre.lockSwipeToNext(true);
    };
    RecibirPage.prototype.backSlidePadre = function () {
        this.slidesPadre.lockSwipeToPrev(false);
        this.slidesPadre.slidePrev();
        this.slidesPadre.lockSwipeToPrev(true);
    };
    RecibirPage.prototype.getClave = function ($event) {
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
                        console.log('privateKey', privateKey);
                        dataTransfer = {
                            addressTo: this.transferForm.value.publickey,
                            amount: this.transferForm.value.monto,
                            addressFrom: this.data.ADDRESS,
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
                        this._onboarding.trasfer(dataTransfer).subscribe(function (res) {
                            loading_1.dismiss();
                            console.log('MOSTRAR RESPUESTA DE TRASFERENCIA', res);
                        }, function (err) {
                            loading_1.dismiss();
                            _this._comp.presentToast('Error con el servidor', 'danger', 1000);
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        this._comp.presentToast('Clave no es la misma', 'danger', 1000);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Output()
    ], RecibirPage.prototype, "change");
    __decorate([
        core_1.ViewChild('slidesPadre', { static: false })
    ], RecibirPage.prototype, "slidesPadre");
    RecibirPage = __decorate([
        core_1.Component({
            selector: 'app-recibir',
            templateUrl: './recibir.page.html',
            styleUrls: ['./recibir.page.scss']
        })
    ], RecibirPage);
    return RecibirPage;
}());
exports.RecibirPage = RecibirPage;
