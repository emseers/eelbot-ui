import os

def main():
    from app import DevApp, ProdApp
    app = DevApp() if 'DEVEL' in os.environ else ProdApp()
    app.serve()

main()