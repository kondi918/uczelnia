#!/bin/sh
echo "window.env = { API_BASE_URL: '${API_BASE_URL}' };" > /usr/share/nginx/html/env.js
exec "$@"