package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/food-hygiene-rating-sdk/go"
	"github.com/voxgig-sdk/food-hygiene-rating-sdk/go/core"

	vs "github.com/voxgig-sdk/food-hygiene-rating-sdk/go/utility/struct"
)

func TestBusinessTypeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BusinessType(nil)
		if ent == nil {
			t.Fatal("expected non-nil BusinessTypeEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := business_typeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "business_type." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set FOODHYGIENERATING_TEST_BUSINESS_TYPE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		businessTypeRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.business_type", setup.data)))
		var businessTypeRef01Data map[string]any
		if len(businessTypeRef01DataRaw) > 0 {
			businessTypeRef01Data = core.ToMapAny(businessTypeRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = businessTypeRef01Data

		// LIST
		businessTypeRef01Ent := client.BusinessType(nil)
		businessTypeRef01Match := map[string]any{}

		businessTypeRef01ListResult, err := businessTypeRef01Ent.List(businessTypeRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, businessTypeRef01ListOk := businessTypeRef01ListResult.([]any)
		if !businessTypeRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", businessTypeRef01ListResult)
		}

	})
}

func business_typeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "business_type", "BusinessTypeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read business_type test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse business_type test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"business_type01", "business_type02", "business_type03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("FOODHYGIENERATING_TEST_BUSINESS_TYPE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FOODHYGIENERATING_TEST_BUSINESS_TYPE_ENTID": idmap,
		"FOODHYGIENERATING_TEST_LIVE":      "FALSE",
		"FOODHYGIENERATING_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["FOODHYGIENERATING_TEST_BUSINESS_TYPE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FOODHYGIENERATING_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewFoodHygieneRatingSDK(core.ToMapAny(mergedOpts))
	}

	live := env["FOODHYGIENERATING_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FOODHYGIENERATING_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
