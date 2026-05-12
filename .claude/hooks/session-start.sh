#!/bin/bash
set -euo pipefail

# Install dependencies for testing and linting in Claude Code web sessions
cd "${CLAUDE_PROJECT_DIR:-.}"

# Install essential dependencies for tests and linting
# Install key packages needed for testing
pip install \
  numpy==2.3.2 \
  pandas==2.3.1 \
  requests==2.32.4 \
  SQLAlchemy==2.0.42 \
  --quiet

# Install testing and linting tools
pip install \
  ruff==0.12.7 \
  mypy==1.17.1 \
  pytest==8.4.1 \
  pytest-asyncio==1.1.0 \
  pytest-cov==6.2.1 \
  pytest-mock==3.14.1 \
  pytest-xdist==3.8.0 \
  isort==6.0.1 \
  --quiet

echo "✓ Testing and linting tools installed successfully"
