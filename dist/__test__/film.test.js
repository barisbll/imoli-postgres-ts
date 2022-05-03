"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../util/server"));
const parametersAndPayloads_1 = require("./parametersAndPayloads");
const app = (0, server_1.default)();
describe("film", () => {
    describe("get films route", () => {
        describe("given the /films route is called", () => {
            it("should return a movies array with 6 movie objects", () => __awaiter(void 0, void 0, void 0, function* () {
                const { body, statusCode } = yield (0, supertest_1.default)(app).get("/films");
                console.log(body);
                expect(body.movies.length).toBe(6);
                expect(statusCode).toBe(200);
            }));
        });
        describe("get favorites route", () => {
            describe("given favorites route with pagination", () => {
                it("should return a 200 with response object", () => __awaiter(void 0, void 0, void 0, function* () {
                    const { body, statusCode } = yield (0, supertest_1.default)(app).get("/favorites?page=1&limit=3");
                    expect(statusCode).toBe(200);
                    expect(body).toEqual(parametersAndPayloads_1.getFavoritesResponse);
                }));
            });
        });
        describe("get favorite/:id route", () => {
            describe("given favorite route with id", () => {
                it("should return a 200 with response object", () => __awaiter(void 0, void 0, void 0, function* () {
                    const { body, statusCode } = yield (0, supertest_1.default)(app).get("/favorite/5");
                    expect(statusCode).toBe(200);
                    expect(body).toEqual(parametersAndPayloads_1.getFavoriteIdResponse);
                }));
            });
        });
        describe("get favorite/:id/file route", () => {
            describe("given favorite route with id and file", () => {
                it("should return a 200", () => __awaiter(void 0, void 0, void 0, function* () {
                    const { body, statusCode } = yield (0, supertest_1.default)(app).get("/favorite/2/file");
                    expect(statusCode).toBe(200);
                }));
            });
        });
    });
});
