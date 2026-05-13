# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

Freqtrade is an open-source cryptocurrency trading bot written in Python. It supports live trading, backtesting, hyperparameter optimization (hyperopt), and an AI/ML prediction subsystem (FreqAI). The bot communicates via Telegram, a REST API (with a bundled React UI), webhooks, and Discord.

## Commands

### Install for development
```bash
pip install -e ".[dev]"
pre-commit install
```

### Run the bot
```bash
freqtrade trade --config config.json --strategy MyStrategy
```

### Run tests
```bash
# All tests (parallel by default via pytest-xdist)
pytest

# Single file
pytest tests/test_freqtradebot.py

# Single test
pytest tests/test_freqtradebot.py::test_create_trades

# With coverage
pytest --cov=freqtrade --cov-report=term-missing

# Long-running exchange-compat tests (opt-in)
pytest --longrun
```

### Lint and format
```bash
ruff check .          # lint
ruff format .         # format
mypy freqtrade        # type-check
pre-commit run -a     # run all hooks (ruff, mypy, isort, flake8, codespell, etc.)
```

### Backtesting / Hyperopt
```bash
freqtrade backtesting --config config.json --strategy MyStrategy
freqtrade hyperopt --config config.json --strategy MyStrategy --hyperopt-loss SharpeHyperOptLoss --epochs 100
```

### Data download
```bash
freqtrade download-data --config config.json --pairs BTC/USDT ETH/USDT --timeframes 5m 1h
```

## Architecture Overview

### Core execution loop

`Worker` (`freqtrade/worker.py`) owns the run loop. It instantiates `FreqtradeBot` (`freqtrade/freqtradebot.py`), which is the heart of the bot. Every ~5 seconds `FreqtradeBot` runs one iteration:

1. Fetch open trades from the database.
2. Update the pairlist via `PairListManager`.
3. Download/refresh OHLCV candles via `DataProvider`.
4. Call strategy callbacks (`populate_indicators`, `populate_entry_trend`, `populate_exit_trend`).
5. Check and update open orders from the exchange.
6. Evaluate exits (ROI, stoploss, signal, `custom_exit`, `custom_stoploss`).
7. Evaluate position adjustments (`adjust_trade_position`).
8. Evaluate new entries.

### Strategy interface

Custom strategies subclass `IStrategy` (`freqtrade/strategy/interface.py`). The required interface is:

- `populate_indicators(dataframe, metadata)` – add technical indicator columns.
- `populate_entry_trend(dataframe, metadata)` – set `enter_long` / `enter_short` columns.
- `populate_exit_trend(dataframe, metadata)` – set `exit_long` / `exit_short` columns.

Optional callbacks include `custom_stoploss`, `custom_exit`, `confirm_trade_entry`, `confirm_trade_exit`, `custom_stake_amount`, `adjust_trade_position`, `leverage`, etc.

Strategy parameters for hyperopt use `IntParameter`, `DecimalParameter`, `CategoricalParameter` (from `freqtrade/strategy/hyper.py` via `HyperStrategyMixin`). The `@informative()` decorator (in `freqtrade/strategy/informative_decorator.py`) is the standard way to merge data from other pairs/timeframes.

`IStrategy.INTERFACE_VERSION = 3` is the current version; it adds short and leverage support.

Strategy files live in `user_data/strategies/` at runtime. The `StrategyResolver` (`freqtrade/resolvers/strategy_resolver.py`) loads them dynamically.

### Exchange layer

`Exchange` (`freqtrade/exchange/exchange.py`) wraps the [ccxt](https://github.com/ccxt/ccxt) library. Exchange-specific subclasses (e.g., `Binance`, `Kraken`, `Bybit`, `Okx`) override only what differs. `ExchangeResolver` selects the right class at startup. WebSocket-based live data uses `ExchangeWS` (`freqtrade/exchange/exchange_ws.py`).

### Persistence

SQLAlchemy 2.x ORM. Main models in `freqtrade/persistence/trade_model.py`:

- `Trade` (live DB-backed) and `LocalTrade` (in-memory, used in backtesting) share a common interface via `LocalTrade` as the base.
- `Order` represents individual exchange orders attached to a `Trade`.
- `PairLock` prevents re-entering a pair during cooldown/protection periods.
- `CustomDataWrapper` and `KeyValueStore` provide arbitrary per-trade and global key/value storage for strategies.

`init_db(db_url)` from `freqtrade/persistence/models.py` must be called before any DB operations.

### Optimization (Backtesting / Hyperopt)

`Backtesting` (`freqtrade/optimize/backtesting.py`) simulates trades on historical OHLCV data. It uses `LocalTrade` in place of `Trade` and controls `DataProvider`'s time slice. `Hyperopt` wraps backtesting and uses Optuna to search strategy parameter spaces.

`RunMode` enum distinguishes `LIVE`, `DRY_RUN`, `BACKTEST`, `HYPEROPT`, `PLOT`, `UTIL_*`. Many code paths branch on `config["runmode"]`.

### RPC / API

`RPCManager` (`freqtrade/rpc/rpc_manager.py`) dispatches messages to all registered RPC handlers (Telegram, Discord, webhook, API server). The REST API is a FastAPI app in `freqtrade/rpc/api_server/`. It exposes endpoints under `/api/v1/` and serves the FreqUI static bundle from `freqtrade/rpc/api_server/ui/installed/`.

### Plugins

- **Pairlists**: chain of `IPairList` handlers in `freqtrade/plugins/pairlist/`. New handlers must be registered in `AVAILABLE_PAIRLISTS` in `freqtrade/constants.py`.
- **Protections**: chain of protection handlers in `freqtrade/plugins/protections/`. New handlers must be registered in `AVAILABLE_PROTECTIONS`.

### FreqAI

`freqtrade/freqai/` is a separate ML subsystem. `IFreqaiModel` is the base class; concrete models live in `freqtrade/freqai/prediction_models/`. Feature engineering flows through `FreqaiDataKitchen`. It is loaded only when `config["freqai"]` is present.

### Configuration

Config is a plain `dict` typed as `Config` (alias in `freqtrade/constants.py`). JSON schema validation happens via `freqtrade/config_schema/`. `Configuration` class loads and merges CLI args, config files, and env vars.

## Key Conventions

### Exception hierarchy

All custom exceptions inherit from `FreqtradeException`. Use the specific subclass:
- `OperationalException` / `ConfigurationError` – bad config or startup errors.
- `DependencyException` / `ExchangeError` / `TemporaryError` / `DDosProtection` / `InvalidOrderException` – exchange-related failures.
- `StrategyError` – errors caused by user strategy code.

### Testing patterns

- The default test strategy is `StrategyTestV3` (constant `CURRENT_TEST_STRATEGY` in `tests/conftest.py`).
- Mock the entire Exchange class with `EXMS = "freqtrade.exchange.exchange.Exchange"`.
- Use `log_has(msg, caplog)` and `log_has_re(pattern, caplog)` from `tests/conftest.py` to assert log output.
- `conftest_trades.py` and `conftest_trades_usdt.py` contain pre-built `Trade` fixtures.
- Tests are parallelised with `pytest-xdist` using `loadscope` scheduling; be careful with shared state.
- Use `time-machine` for deterministic time in tests rather than mocking `datetime.now`.

### Line length and formatting

Max line length is **100 characters**. Formatting is enforced by `ruff format`. Import order follows isort's `black` profile with `lines-after-imports=2` and `freqtrade_client` treated as first-party.

### Type annotations

All public functions should have type hints. `mypy freqtrade` must pass. `# type: ignore` is allowed only when necessary and should be narrow. The `Config` type alias (`dict[str, Any]`) is used throughout instead of raw `dict`.

### Adding a new exchange

Subclass `Exchange` in `freqtrade/exchange/<name>.py`, then add it to the auto-detection logic in `ExchangeResolver` (`freqtrade/resolvers/exchange_resolver.py`).

### Schema changes

After modifying config schema classes in `freqtrade/config_schema/`, run `python build_helpers/extract_config_json_schema.py` to regenerate `build_helpers/schema.json`. The pre-commit hook enforces this.

## ft_client

`ft_client/` is a separate minimal Python package (`freqtrade-client`) providing a REST client for the Freqtrade API. It is versioned independently and published to PyPI separately. Changes to API schemas in `freqtrade/rpc/api_server/api_schemas.py` should be reflected here.
