# Authority entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from foodhygienerating_sdk import FoodHygieneRatingSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestAuthorityEntity:

    def test_should_create_instance(self):
        testsdk = FoodHygieneRatingSDK.test(None, None)
        ent = testsdk.Authority(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _authority_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "authority." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set FOODHYGIENERATING_TEST_AUTHORITY_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        authority_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.authority")))
        authority_ref01_data = None
        if len(authority_ref01_data_raw) > 0:
            authority_ref01_data = helpers.to_map(authority_ref01_data_raw[0][1])

        # LIST
        authority_ref01_ent = client.Authority(None)
        authority_ref01_match = {}

        authority_ref01_list_result, err = authority_ref01_ent.list(authority_ref01_match, None)
        assert err is None
        assert isinstance(authority_ref01_list_result, list)

        # LOAD
        authority_ref01_match_dt0 = {}
        authority_ref01_data_dt0_loaded, err = authority_ref01_ent.load(authority_ref01_match_dt0, None)
        assert err is None
        assert authority_ref01_data_dt0_loaded is not None



def _authority_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/authority/AuthorityTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = FoodHygieneRatingSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["authority01", "authority02", "authority03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "FOODHYGIENERATING_TEST_AUTHORITY_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "FOODHYGIENERATING_TEST_AUTHORITY_ENTID": idmap,
        "FOODHYGIENERATING_TEST_LIVE": "FALSE",
        "FOODHYGIENERATING_TEST_EXPLAIN": "FALSE",
        "FOODHYGIENERATING_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("FOODHYGIENERATING_TEST_AUTHORITY_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("FOODHYGIENERATING_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("FOODHYGIENERATING_APIKEY"),
            },
            extra or {},
        ])
        client = FoodHygieneRatingSDK(helpers.to_map(merged_opts))

    _live = env.get("FOODHYGIENERATING_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("FOODHYGIENERATING_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
