"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApp = void 0;
const fastify_1 = __importDefault(require("fastify"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const validate_route_1 = __importDefault(require("./routes/validate.route"));
const getApp = () => {
    const app = (0, fastify_1.default)({
        // logger: true,
        ignoreTrailingSlash: true,
        trustProxy: true
    }).withTypeProvider();
    app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
    app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
    app.register(validate_route_1.default);
    return app;
};
exports.getApp = getApp;
const app = (0, exports.getApp)();
exports.default = app;
