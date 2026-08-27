#!/usr/bin/env python3
"""Print cached page text. `show.py <sourceId> [first] [last]`."""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sid = sys.argv[1]
doc = json.load(open(os.path.join(HERE, "pagetext", sid + ".json"), encoding="utf-8"))
first = int(sys.argv[2]) if len(sys.argv) > 2 else 1
last = int(sys.argv[3]) if len(sys.argv) > 3 else len(doc["pages"])
print("### %s  %s  mode=%s pages=%d" % (sid, doc["file"], doc["mode"], len(doc["pages"])))
for i in range(first, min(last, len(doc["pages"])) + 1):
    print("\n===== p%d =====" % i)
    print(doc["pages"][i - 1].rstrip())
