import time
import requests

BASE = "http://localhost:8000"


def main():
    email = f"phase3_{int(time.time())}@example.com"
    password = "testpass123"

    # 1. Register
    r = requests.post(
        f"{BASE}/auth/register",
        json={"email": email, "password": password, "full_name": "Phase3 Test"},
    )
    assert r.status_code == 201, f"Register failed: {r.text}"
    tokens = r.json()
    token = tokens["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print(f"[register] 201 OK  ({email})")

    # 2. Start a research run
    r = requests.post(
        f"{BASE}/research/start",
        json={"question": "What is the current state of quantum computing?"},
        headers=headers,
    )
    assert r.status_code == 201, f"Start failed: {r.text}"
    run = r.json()
    run_id = run["id"]
    print(f"[start]    201 OK  (run_id={run_id})")

    # 3. Poll until done
    print("[poll]     waiting for pipeline...")
    for attempt in range(60):   # 60 × 5s = 5 min max
        time.sleep(5)
        r = requests.get(f"{BASE}/research/{run_id}", headers=headers)
        assert r.status_code == 200, f"Get run failed: {r.text}"
        run = r.json()
        status = run["status"]
        print(f"           [{attempt * 5 + 5}s] status={status}")

        if status in ("completed", "failed"):
            break

    # 4. Show result
    print(f"\nFinal status: {run['status']}")
    if run["status"] == "completed":
        print(f"Report length: {len(run['report_md'] or '')} chars")
        print("\n--- Report preview (first 400 chars) ---")
        print((run["report_md"] or "")[:400])
    else:
        print(f"Error: {run['error']}")

    # 5. History
    r = requests.get(f"{BASE}/research/history", headers=headers)
    assert r.status_code == 200
    print(f"\n[history]  {len(r.json())} run(s) in history")


if __name__ == "__main__":
    main()