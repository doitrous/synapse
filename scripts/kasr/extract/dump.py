import json, sys, re
d=json.load(open('scripts/kasr/questions.json'))
qs=d['questions']
def norm(t):
    t=re.sub(r'\s+',' ',t).strip()
    return t
for i,q in enumerate(qs):
    print(f"[{i}] {q['category']}|{q.get('year')}|{q.get('section') or '-'}|p{q.get('page')}|n{q.get('number')}|m{q.get('marks')}|{q['file'][:34]}")
    print('    '+norm(q['text']))
