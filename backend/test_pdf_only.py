"""Isolated PDF test — no API, no pipeline, just render a fixed markdown."""
from app.services.pdf_service import render_pdf, PDF_BACKEND

SAMPLE_MARKDOWN = """## Executive Summary
Solid-state batteries are emerging as a promising alternative to lithium-ion, offering higher energy density and improved safety. Recent breakthroughs focus on sulfide electrolytes and lithium-metal anodes.

## Material Innovations
- Sulfide-based electrolytes have reached ionic conductivity above 10 mS/cm at room temperature [1].
- Oxide electrolytes offer better stability but lower conductivity [2].
- Polymer electrolytes are flexible but need elevated temperatures to operate [2].

## Performance Metrics
Stellantis and Factorial validated a 77 Ah cell with 375 Wh/kg specific energy in 2025 [3]. Toyota targets 500 Wh/kg by 2027 [1].

## Challenges
- Dendrite formation at the anode remains a critical issue [2].
- Manufacturing costs are 3-4x higher than lithium-ion [3].
- Interface resistance increases over cycling, reducing cycle life [1].

## Sources
[1] Solid-State Battery Breakthrough - https://example.com/source1
[2] Recent Advances in Solid-State Electrolytes - https://example.com/source2
[3] EV Next-Gen Battery Market Report - https://example.com/source3
"""


def main():
    print(f"Backend: {PDF_BACKEND}")
    print("Rendering sample PDF...")
    try:
        pdf_bytes = render_pdf(
            question="What are the latest breakthroughs in solid-state batteries?",
            markdown_text=SAMPLE_MARKDOWN,
        )
        with open("test_output.pdf", "wb") as f:
            f.write(pdf_bytes)
        print(f"OK - {len(pdf_bytes)} bytes saved to test_output.pdf")
    except Exception as e:
        print(f"FAILED: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()