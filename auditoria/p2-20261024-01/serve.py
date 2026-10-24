from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

class AuditHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

ThreadingHTTPServer(('127.0.0.1', 8002), AuditHandler).serve_forever()
