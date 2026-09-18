import json
from pathlib import Path

ingredients = [
    {"name":"Rice","avgPrice":60,"unit":"kg","seasonal":False,"substitutes":["Poha"]},
    {"name":"Wheat Flour","avgPrice":45,"unit":"kg","seasonal":False,"substitutes":["Maida"]},
    {"name":"Maida","avgPrice":50,"unit":"kg","seasonal":False,"substitutes":["Wheat Flour"]},
    {"name":"Sugar","avgPrice":48,"unit":"kg","seasonal":False,"substitutes":["Jaggery"]},
    {"name":"Jaggery","avgPrice":70,"unit":"kg","seasonal":False,"substitutes":["Sugar"]},
    {"name":"Salt","avgPrice":25,"unit":"kg","seasonal":False,"substitutes":[]},
    {"name":"Turmeric Powder","avgPrice":220,"unit":"kg","seasonal":False,"substitutes":[]},
    {"name":"Red Chilli Powder","avgPrice":320,"unit":"kg","seasonal":False,"substitutes":["Green Chilli"]},
    {"name":"Coriander Powder","avgPrice":240,"unit":"kg","seasonal":False,"substitutes":[]},
    {"name":"Cumin Seeds","avgPrice":500,"unit":"kg","seasonal":False,"substitutes":["Coriander Powder"]},
    {"name":"Mustard Seeds","avgPrice":180,"unit":"kg","seasonal":False,"substitutes":[]},
    {"name":"Black Pepper","avgPrice":700,"unit":"kg","seasonal":False,"substitutes":["Red Chilli Powder"]},
    {"name":"Cooking Oil","avgPrice":160,"unit":"litre","seasonal":False,"substitutes":["Butter"]},
    {"name":"Butter","avgPrice":550,"unit":"kg","seasonal":False,"substitutes":["Cooking Oil"]},
    {"name":"Ghee","avgPrice":700,"unit":"litre","seasonal":False,"substitutes":["Butter"]},
    {"name":"Milk","avgPrice":60,"unit":"litre","seasonal":False,"substitutes":["Almond Milk"]},
    {"name":"Almond Milk","avgPrice":220,"unit":"litre","seasonal":False,"substitutes":["Milk"]},
    {"name":"Curd","avgPrice":80,"unit":"kg","seasonal":False,"substitutes":["Milk"]},
    {"name":"Paneer","avgPrice":380,"unit":"kg","seasonal":False,"substitutes":["Tofu"]},
    {"name":"Tofu","avgPrice":280,"unit":"kg","seasonal":False,"substitutes":["Paneer"]},
    {"name":"Tomato","avgPrice":40,"unit":"kg","seasonal":True,"substitutes":["Tomato Puree"]},
    {"name":"Onion","avgPrice":35,"unit":"kg","seasonal":True,"substitutes":[]},
    {"name":"Potato","avgPrice":30,"unit":"kg","seasonal":False,"substitutes":["Sweet Potato"]},
    {"name":"Sweet Potato","avgPrice":50,"unit":"kg","seasonal":True,"substitutes":["Potato"]},
    {"name":"Green Chilli","avgPrice":80,"unit":"kg","seasonal":True,"substitutes":["Red Chilli Powder"]},
    {"name":"Ginger","avgPrice":120,"unit":"kg","seasonal":True,"substitutes":["Ginger Paste"]},
    {"name":"Garlic","avgPrice":180,"unit":"kg","seasonal":False,"substitutes":["Garlic Paste"]},
    {"name":"Coriander Leaves","avgPrice":20,"unit":"bunch","seasonal":True,"substitutes":["Mint Leaves"]},
    {"name":"Mint Leaves","avgPrice":15,"unit":"bunch","seasonal":True,"substitutes":["Coriander Leaves"]},
    {"name":"Lemon","avgPrice":8,"unit":"piece","seasonal":True,"substitutes":["Vinegar"]}
]

output_file = Path(__file__).parent.parent / "data" / "ingredients.json"

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(ingredients, f, indent=2)

print(f"Created: {output_file}")