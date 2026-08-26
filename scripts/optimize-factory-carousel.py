import argparse
from pathlib import Path

from PIL import Image, ImageOps


def main() -> None:
    parser = argparse.ArgumentParser(description="Optimize factory carousel source photos.")
    parser.add_argument("source_dir", type=Path, help="Directory containing the original factory photos")
    parser.add_argument("--output-dir", type=Path, default=Path(__file__).resolve().parents[1] / "assets" / "factory")
    args = parser.parse_args()
    source_dir = args.source_dir.resolve()
    output_dir = args.output_dir.resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    source_files = sorted(path for path in source_dir.iterdir() if path.suffix.lower() in {".jpg", ".jpeg", ".png", ".avif", ".heic"})
    for index, source in enumerate(source_files, start=1):
        output = output_dir / f"factory-carousel-{index:02d}.webp"
        with Image.open(source) as image:
            image = ImageOps.exif_transpose(image).convert("RGB")
            image.thumbnail((1920, 1440), Image.Resampling.LANCZOS)
            image.save(output, "WEBP", quality=84, method=6)
            fallback = output.with_suffix(".jpg")
            image.save(fallback, "JPEG", quality=84, optimize=True, progressive=True)
            print(f"{source.name} -> {output.name} / {fallback.name}: {image.width}x{image.height}")


if __name__ == "__main__":
    main()
