import os
import json
import base64
import random

# Path to your notebook
notebook_path = "analytics2.ipynb"
output_dir = "extracted_images"
os.makedirs(output_dir, exist_ok=True)

with open(notebook_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

img_count = 0

for cell in nb['cells']:
    if cell['cell_type'] == 'code':
        for output in cell.get('outputs', []):
            if 'data' in output:
                if 'image/png' in output['data']:
                    img_data = output['data']['image/png']
                    img_bytes = base64.b64decode(img_data)
                    img_path = os.path.join(
                        output_dir, f"image_{random.random()}.png")
                    with open(img_path, 'wb') as img_file:
                        img_file.write(img_bytes)
                    img_count += 1

print(f"✅ Extracted {img_count} image(s) to '{output_dir}'")
