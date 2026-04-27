#!/usr/bin/env python3
"""
SISS-Mina — Servidor Local
Ejecuta este script para abrir la app en cualquier dispositivo de tu red.
"""
import http.server
import socketserver
import socket
import os
import webbrowser
import threading

PORT = 8080

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler

def abrir_navegador():
    import time
    time.sleep(1)
    webbrowser.open(f"http://localhost:{PORT}/SISS.html")

print("=" * 55)
print("  SISS-Mina — Servidor Local")
print("=" * 55)

ip_local = get_local_ip()

print(f"\n  ✅ Servidor iniciado en el puerto {PORT}")
print(f"\n  🖥️  En tu computadora:")
print(f"     http://localhost:{PORT}/SISS.html")
print(f"\n  📱  Desde otros dispositivos (celular del profe, etc.):")
print(f"     http://{ip_local}:{PORT}/SISS.html")
print(f"\n  ⚠️  Deben estar conectados al mismo WiFi.")
print(f"\n  Para cerrar el servidor: presiona Ctrl + C")
print("=" * 55 + "\n")

threading.Thread(target=abrir_navegador, daemon=True).start()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n  Servidor detenido. ¡Hasta luego!")
