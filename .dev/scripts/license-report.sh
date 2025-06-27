#!/bin/bash

# defaults
TYPE=""
DIR=""
COMPOSER_NO_DEV=false
ORIG_PWD=$(pwd)

# parse arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
    --type)
        TYPE="$2"
        shift 2
        ;;
    --dir)
        DIR="$2"
        shift 2
        ;;
    --no-dev)
        COMPOSER_NO_DEV=true
        shift
        ;;
    -h | --help)
        cat <<EOF
Usage: $0 --type {npm} --dir <path> [--no-dev]

Options:
  --type       Type of report: "npm" or "composer"
  --dir        Path to project root
  --no-dev     (composer only) exclude dev dependencies
  -h, --help   Show this help message
EOF
        exit 0
        ;;
    *)
        echo "Unknown option: $1" >&2
        exit 1
        ;;
    esac
done

# validate
if [[ -z "$TYPE" || -z "$DIR" ]]; then
    echo "Error: --type and --dir are required." >&2
    exit 1
fi

# change into target directory
cd "$DIR" || {
    echo "Directory not found: $DIR" >&2
    exit 1
}

# timestamp for unique filename
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="licenses_${DIR}_${TYPE}_${TIMESTAMP}.csv"

if [[ "$TYPE" == "npm" ]]; then
    echo "Generating Node modules license report..."

    echo "Package,Version,License" >"$ORIG_PWD/$OUTPUT_FILE"

    jq -r '.dependencies | to_entries[] | "\(.key)"' package.json |
        while read -r pkg; do
            # Get resolved version from node_modules
            version=$(node -p "require('./node_modules/$pkg/package.json').version" 2>/dev/null)

            # Get license
            license=$(node -p "require('./node_modules/$pkg/package.json').license || 'UNKNOWN'" 2>/dev/null)

            if [[ -n "$version" ]]; then
                echo "\"$pkg\",\"$version\",$license" >>"$ORIG_PWD/$OUTPUT_FILE"
            fi
        done
else
    echo "Invalid type: $TYPE" >&2
    exit 1
fi

echo "✅ $OUTPUT_FILE created."
