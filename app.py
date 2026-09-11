from os import path
from pathlib import Path

from flask import Flask, render_template
from flask_frozen import Freezer


template_folder = path.abspath('./wiki')

app = Flask(__name__, template_folder=template_folder)
#app.config['FREEZER_BASE_URL'] = environ.get('CI_PAGES_URL')
app.config['FREEZER_DESTINATION'] = 'public'
app.config['FREEZER_RELATIVE_URLS'] = True
app.config['FREEZER_IGNORE_MIMETYPE_WARNINGS'] = True
freezer = Freezer(app)


# -----------------------------------------------------------
def inline_svg(rel_path: str) -> str:
    """Gib den Inhalt einer SVG-Datei unterhalb von app.static_folder zurück."""
    svg_abs = path.join(app.static_folder, rel_path)
    try:
        with open(svg_abs, encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return f"<!-- inline_svg: Datei nicht gefunden: {rel_path} -->"

# in Jinja überall verfügbar machen
app.jinja_env.globals["inline_svg"] = inline_svg
# -----------------------------------------------------------


@app.cli.command()
def freeze():
    freezer.freeze()

@app.cli.command()
def serve():
    freezer.run()

@app.route('/')
def home():
    return render_template('pages/home.html')

@app.route('/<page>')
def pages(page):
    return render_template(str(Path('pages')) + '/' + page.lower() + '.html')

# Main Function, Runs at http://0.0.0.0:8080
if __name__ == "__main__":
    app.run(port=8080)
