#!/bin/zsh
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER nest;
  GRANT ALL PRIVILEGES ON DATABASE uaa TO nest;
EOSQL