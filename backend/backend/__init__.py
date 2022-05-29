import os
__version__ = '0.1.0'

def main():
    from backend.app import DevApp, ProdApp
    app = DevApp() if 'DEVEL' in os.environ else ProdApp()
    app.serve()