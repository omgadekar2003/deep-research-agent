"""
Phase 5 test — runs a full research then downloads the PDF.
DO NOT RUN YET — uses API quota. Run at the end, together with frontend.
"""
import time
import requests

BASE = "http://localhost:8000"


def main():
    email = f"phase5_{int(time.time())}@example.com"
    password = "testpass123"

    # Register
    r = requests.post(
        f"{BASE}/auth/register",
        json={"email": email, "password": password, "full_name": "Phase5 Test"},
    )
    assert r.status_code == 201, f"Register failed: {r.text}"
    token = r.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print(f"[register] 201 OK")

    # Create run
    r = requests.post(
        f"{BASE}/research/start",
        json={"question": "What are the latest advancements in solid-state batteries?"},
        headers=headers,
    )
    assert r.status_code == 201, f"Start failed: {r.text}"
    run_id = r.json()["id"]
    print(f"[start]    run_id={run_id}")

    # Stream to completion
    print("[stream]   streaming...")
    final_status = None
    with requests.get(
        f"{BASE}/research/{run_id}/stream", headers=headers, stream=True, timeout=300
    ) as resp:
        for line in resp.iter_lines(decode_unicode=True):
            if line and line.startswith("data: "):
                import json as _json
                event = _json.loads(line[6:])
                print(f"           [{event['node']}] {event.get('message','')}")
                if event["node"] == "done":
                    final_status = event.get("status")
                    break

    assert final_status == "completed", f"Pipeline ended with: {final_status}"

    # Download PDF
    print("\n[pdf]      downloading...")
    r = requests.get(f"{BASE}/research/{run_id}/pdf", headers=headers)
    assert r.status_code == 200, f"PDF failed: {r.text[:300]}"
    assert r.headers["content-type"] == "application/pdf", r.headers["content-type"]

    out_path = f"report_{run_id}.pdf"
    with open(out_path, "wb") as f:
        f.write(r.content)

    size_kb = len(r.content) / 1024
    print(f"[pdf]      {out_path}  ({size_kb:.1f} KB)")
    print(f"\n✅ Phase 5 complete. Open {out_path} to verify.")


if __name__ == "__main__":
    main()