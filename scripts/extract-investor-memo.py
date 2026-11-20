"""Copy the country data and the model inputs out of the investor memo HTML into a TypeScript module."""
import re
import sys

src, out = sys.argv[1], sys.argv[2]
html = open(src, encoding="utf-8").read()

d = re.search(r"var D=\[\s*(.*?)\]\.map\(", html, re.S).group(1).strip()
p = re.search(r"var P=\{\s*(.*?)\n\};", html, re.S).group(1).strip()
conflict = re.search(r"var CONFLICT=\{(.*?)\};", html).group(1)
isos = re.findall(r"([A-Z]{3}):1", conflict)

rows = re.findall(r"\[[^\[\]]*\]", d)
p_lines = [line.strip().rstrip(",") for line in p.splitlines() if line.strip()]

ts = []
ts.append("/* Generated from the investor memo (index.html, November 2026). Do not edit by hand: */")
ts.append("/* change the memo, then regenerate, so the numbers stay identical to the source. */")
ts.append("")
ts.append("/** iso, name, population (M), birth rate per 1,000, life expectancy, GDP per capita (USD), road deaths per 100k, maternal deaths per 100k births, mobile subscriptions per 100, health insurance coverage (%) */")
ts.append("export type CountryRow = [string, string, number, number, number, number | null, number, number, number, number | null];")
ts.append("")
ts.append("export const COUNTRY_ROWS: CountryRow[] = [")
for r in rows:
    ts.append("  " + r + ",")
ts.append("];")
ts.append("")
ts.append("/** Countries where operating is impractical today (active conflict or sanctions). */")
ts.append("export const CONFLICT_ISOS = [" + ", ".join('"%s"' % i for i in isos) + "];")
ts.append("")
ts.append("/** label, default, min, max, step, kind (d = data, m = market, a = assumption), unit, note */")
ts.append('export type ParamRow = [string, number, number, number, number, "d" | "m" | "a", string, string];')
ts.append("")
ts.append("export const PARAM_ROWS = {")
for line in p_lines:
    key, rest = line.split(":", 1)
    ts.append("  " + key + ": " + rest + " as ParamRow,")
ts.append("};")
ts.append("")
ts.append("export type ParamKey = keyof typeof PARAM_ROWS;")
ts.append("")

open(out, "w", encoding="utf-8", newline="\n").write("\n".join(ts))
print(len(rows), "countries,", len(p_lines), "inputs,", len(isos), "conflict")
