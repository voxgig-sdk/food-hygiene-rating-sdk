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

func TestAuthorityEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Authority(nil)
		if ent == nil {
			t.Fatal("expected non-nil AuthorityEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"authority": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Authority(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Authority(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := authorityBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "authority." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set FOOD_HYGIENE_RATING_TEST_AUTHORITY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		authorityRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.authority", setup.data)))
		var authorityRef01Data map[string]any
		if len(authorityRef01DataRaw) > 0 {
			authorityRef01Data = core.ToMapAny(authorityRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = authorityRef01Data

		// LIST
		authorityRef01Ent := client.Authority(nil)
		authorityRef01Match := map[string]any{}

		authorityRef01ListResult, err := authorityRef01Ent.List(authorityRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, authorityRef01ListOk := authorityRef01ListResult.([]any)
		if !authorityRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", authorityRef01ListResult)
		}

		// LOAD
		authorityRef01MatchDt0 := map[string]any{
			"id": authorityRef01Data["id"],
		}
		authorityRef01DataDt0Loaded, err := authorityRef01Ent.Load(authorityRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		authorityRef01DataDt0LoadResult := core.ToMapAny(entityData(authorityRef01DataDt0Loaded))
		if authorityRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if authorityRef01DataDt0LoadResult["id"] != authorityRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func authorityBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "authority", "AuthorityTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read authority test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse authority test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"authority01", "authority02", "authority03"},
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
	entidEnvRaw := os.Getenv("FOOD_HYGIENE_RATING_TEST_AUTHORITY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FOOD_HYGIENE_RATING_TEST_AUTHORITY_ENTID": idmap,
		"FOOD_HYGIENE_RATING_TEST_LIVE":      "FALSE",
		"FOOD_HYGIENE_RATING_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["FOOD_HYGIENE_RATING_TEST_AUTHORITY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FOOD_HYGIENE_RATING_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewFoodHygieneRatingSDK(core.ToMapAny(mergedOpts))
	}

	live := env["FOOD_HYGIENE_RATING_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FOOD_HYGIENE_RATING_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
