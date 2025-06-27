#!/bin/bash

# --- defaults ---
CERTS_DIR=".dev/ssl"
CONFIG_FILE="openssl.cnf"
TEMPLATE="openssl.template.cnf"
DOMAIN=""
DIR=""
VALID=825
FILENAME="certificate"
ORIG_PWD=$(pwd)

# --- parse arguments ---
while [[ $# -gt 0 ]]; do
    case "$1" in
    --domain)
        DOMAIN="$2"
        shift 2
        ;;
    --dir)
        DIR="$2"
        shift 2
        ;;
    --valid)
        VALID="$2"
        shift 2
        ;;
    --filename)
        FILENAME="$2"
        shift 2
        ;;
    -h | --help)
        cat <<EOF
Usage: $0 --domain <domain> --dir <path> [--valid <days>] [--filename <name>]

Options:
  --domain     Domain name for the certificate (e.g. myapp.local)
  --dir        Output directory path (e.g. . or ./certs)
  --valid      Certificate validity in days (default: 825)
  --filename   Output base name (defaults to certificate)
  -h, --help   Show this help message
EOF
        exit 0
        ;;
    *)
        echo "❌ Unknown option: $1" >&2
        exit 1
        ;;
    esac
done

# --- validation ---
if [[ -z "$DOMAIN" || -z "$DIR" ]]; then
    echo "❌ Error: --domain and --dir are required." >&2
    exit 1
fi

mkdir -p "$CERTS_DIR/$DIR" || {
    echo "❌ Failed to create directory: $DIR" >&2
    exit 1
}

cd "$CERTS_DIR/$DIR" || {
    echo "❌ Directory not found: $DIR" >&2
    exit 1
}

echo "Creating self-signed certificate valid for $VALID days for domain $DOMAIN"

# Generate OpenSSL config with SAN
sed "s/{{DOMAIN}}/$DOMAIN/g" "../$TEMPLATE" >>"$CONFIG_FILE"

# Generate private key
openssl genrsa -out "$FILENAME.key" 2048

# Generate CSR using config
openssl req -new -key "$FILENAME.key" \
    -out "$FILENAME.csr" \
    -config "$CONFIG_FILE"

# Generate self-signed certificate
openssl x509 -req -in "$FILENAME.csr" \
    -in "$FILENAME.csr" \
    -signkey "$FILENAME.key" \
    -out "$FILENAME.crt" \
    -days "$VALID" \
    -extfile "$CONFIG_FILE" \
    -extensions ext

echo "✅ Certificate generated completed:"
echo "  - $CERTS_DIR/$DIR:"
echo "  - $FILENAME.crt"
echo "  - $FILENAME.key"
echo "  - $FILENAME.key"

# Exit the script
echo "📌 To trust it:"
echo "  - macOS: sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $CERTS_DIR/$DOMAIN.crt"
echo "  - Linux: Copy to /usr/local/share/ca-certificates and run sudo update-ca-certificates"
echo "  - Windows: Use certmgr.msc and import the .crt into 'Trusted Root Certification Authorities'"

exit 0
