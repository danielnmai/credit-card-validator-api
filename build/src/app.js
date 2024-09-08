"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const app = (0, fastify_1.default)({
    logger: true,
    ignoreTrailingSlash: true,
    trustProxy: true
});
app.post('/validate', async (request, reply) => {
    return 'pong\n';
});
exports.default = app;
