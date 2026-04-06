#!/usr/bin/env bash
set -euo pipefail

BUMP_TYPE="${1:-patch}"

case "$BUMP_TYPE" in
  patch|minor|major) ;;
  *)
    echo "Usage: npm run release:<patch|minor|major>"
    exit 1
    ;;
esac

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is not clean. Commit or stash changes before releasing."
  exit 1
fi

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "Releases must be run from main. Current branch: $CURRENT_BRANCH"
  exit 1
fi

echo "Syncing with origin/main..."
git pull --ff-only origin main

echo "Running build check..."
npm run build

echo "Bumping version ($BUMP_TYPE)..."
npm version "$BUMP_TYPE" --no-git-tag-version
NEW_VERSION="$(node -p "require('./package.json').version")"

echo "Committing version bump..."
git add package.json package-lock.json
git commit -m "chore: bump version to ${NEW_VERSION}"

echo "Tagging v${NEW_VERSION}..."
git tag "v${NEW_VERSION}"

echo "Pushing main and tag..."
git push origin main
git push origin "v${NEW_VERSION}"

echo "Release prepared: v${NEW_VERSION}"
echo "GitHub Actions Publish workflow should start automatically."
