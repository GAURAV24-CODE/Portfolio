
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent

LOGOS = [
    "images/college-logos/ssbt-college.png",
    "images/college-logos/moolji-jaitha-college.png",
    "images/company-logos/rubixe.png",
    "images/company-logos/codealpha.png",
    "images/company-logos/datamites.png",
]

OUTPUT_DIR = BASE_DIR / "images" / "optimized"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

print("\nLOGO OPTIMIZATION STARTED\n")

for relative_path in LOGOS:
    source = BASE_DIR / relative_path

    if not source.exists():
        print(f"SKIPPED: {relative_path} not found")
        continue

    with Image.open(source) as image:
        image.thumbnail((600, 600), Image.Resampling.LANCZOS)

        output = OUTPUT_DIR / f"{source.stem}.webp"

        image.save(
            output,
            "WEBP",
            quality=85,
            method=6
        )

    old_size = source.stat().st_size / 1024
    new_size = output.stat().st_size / 1024
    reduction = (1 - new_size / old_size) * 100

    print(f"Logo: {source.name}")
    print(f"Original: {old_size:.1f} KB")
    print(f"Optimized: {new_size:.1f} KB")
    print(f"Reduced: {reduction:.1f}%")
    print("-" * 35)

print("\nDONE! Optimized logos saved in images/optimized/")
