
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent
SOURCE_DIR = BASE_DIR / "certificates" / "thumbs"
OUTPUT_DIR = SOURCE_DIR / "optimized"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

print("\nCERTIFICATE THUMBNAIL OPTIMIZATION\n")

for source in SOURCE_DIR.glob("*.jpg"):
    try:
        with Image.open(source) as image:
            image.thumbnail((1000, 1000), Image.Resampling.LANCZOS)

            output = OUTPUT_DIR / f"{source.stem}.webp"
            image.save(output, "WEBP", quality=82, method=6)

        old_size = source.stat().st_size / 1024
        new_size = output.stat().st_size / 1024
        reduction = (1 - new_size / old_size) * 100

        print(f"{source.name}")
        print(f"Original: {old_size:.1f} KB")
        print(f"Optimized: {new_size:.1f} KB")
        print(f"Reduced: {reduction:.1f}%")
        print("-" * 35)

    except Exception as error:
        print(f"ERROR: {source.name} - {error}")

print("\nDONE! Check certificates/thumbs/optimized/")
