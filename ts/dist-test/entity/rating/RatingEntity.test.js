"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('RatingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FOOD_HYGIENE_RATING_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FOOD_HYGIENE_RATING_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FoodHygieneRatingSDK.test();
        const ent = testsdk.Rating();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FOOD_HYGIENE_RATING_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'rating.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "ratingId": { "a": true, "h": "Rating Id", "n": "ratingId", "r": false, "sh": "Unique identifier for the rating", "t": "`$INTEGER`", "key$": "ratingId", "index$": 0 }, "ratingKey": { "a": true, "h": "Rating Key", "n": "ratingKey", "r": false, "sh": "Key for the rating value", "t": "`$STRING`", "key$": "ratingKey", "index$": 1 }, "ratingName": { "a": true, "h": "Rating Name", "n": "ratingName", "r": false, "sh": "Name of the rating (e.g., '5', '4', 'Pass', 'Exempt')", "t": "`$STRING`", "key$": "ratingName", "index$": 2 }, "schemeType": { "a": true, "h": "Scheme Type", "n": "schemeType", "r": false, "sh": "Scheme type this rating belongs to", "t": "`$STRING`", "key$": "schemeType", "index$": 3 } }, "name": "rating", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /Ratings", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/Ratings", "q": {}, "r": {}, "s": [{ "lit": "Ratings" }], "t": { "req": "`reqdata`", "res": "`body.ratings`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "rating", "name__orig": "rating", "Name": "Rating", "name_": "rating", "name-": "rating", "NAME": "RATING", "index$": 3 }, { "active": true, "entity": "rating", "key$": "BasicRatingFlow", "kind": "basic", "name": "BasicRatingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "rating_ref01" } }], "index$": 0 }] }, 'Rating', { "GET /Ratings": { "protocol": "http", "operationId": "getRatings", "responses": { "200": { "description": "Successful response with ratings list", "content": { "application/json": { "schema": { "type": "object", "properties": { "ratings": { "items": { "properties": { "ratingId": { "description": "Unique identifier for the rating", "type": "integer", "key$": "ratingId" }, "ratingKey": { "description": "Key for the rating value", "type": "string", "key$": "ratingKey" }, "ratingName": { "description": "Name of the rating (e.g., '5', '4', 'Pass', 'Exempt')", "type": "string", "key$": "ratingName" }, "schemeType": { "description": "Scheme type this rating belongs to", "enum": ["FHRS", "FHIS"], "type": "string", "key$": "schemeType" } }, "type": "object", "x-ref": "#/components/schemas/Rating", "index$": 0 }, "key$": "ratings", "type": "array" } }, "x-ref": "#/components/schemas/RatingsResponse" } }, "application/xml": { "schema": { "type": "object", "properties": { "ratings": { "items": { "properties": { "ratingId": { "description": "Unique identifier for the rating", "type": "integer", "key$": "ratingId" }, "ratingKey": { "description": "Key for the rating value", "type": "string", "key$": "ratingKey" }, "ratingName": { "description": "Name of the rating (e.g., '5', '4', 'Pass', 'Exempt')", "type": "string", "key$": "ratingName" }, "schemeType": { "description": "Scheme type this rating belongs to", "enum": ["FHRS", "FHIS"], "type": "string", "key$": "schemeType" } }, "type": "object", "x-ref": "#/components/schemas/Rating", "index$": 0 }, "key$": "ratings", "type": "array" } }, "x-ref": "#/components/schemas/RatingsResponse" } } } }, "500": { "description": "Internal server error" } }, "parameters": [], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let rating_ref01_data = Object.values(setup.data.existing.rating)[0];
        // LIST
        const rating_ref01_ent = client.Rating();
        const rating_ref01_match = {};
        const rating_ref01_list = (await rating_ref01_ent.list(rating_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/rating/RatingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FoodHygieneRatingSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['rating01', 'rating02', 'rating03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FOOD_HYGIENE_RATING_TEST_RATING_ENTID': idmap,
        'FOOD_HYGIENE_RATING_TEST_LIVE': 'FALSE',
        'FOOD_HYGIENE_RATING_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FOOD_HYGIENE_RATING_TEST_RATING_ENTID'];
    const live = 'TRUE' === env.FOOD_HYGIENE_RATING_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FOOD_HYGIENE_RATING_TEST_RATING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FoodHygieneRatingSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.FOOD_HYGIENE_RATING_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=RatingEntity.test.js.map