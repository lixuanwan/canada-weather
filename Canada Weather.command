#!/bin/bash
cd "$(dirname "$0")" || exit 1
PORT=8765
URL="http://127.0.0.1:${PORT}/"

if lsof -nP -iTCP:"${PORT}" -sTCP:LISTEN >/dev/null 2>&1; then
  open "$URL"
  exit 0
fi

echo "Canada Weather"
echo "$URL"
echo "Leave this window open. Closing it stops the app."
python3 -m http.server "$PORT" &
SERVER_PID=$!
sleep 0.4
open "$URL"
wait "$SERVER_PID"
