import json
import time
import requests

BASE = "http://localhost:8000"


def main():
    email = f"phase4_{int(time.time())}@example.com"
    password = "testpass123"

    # 1. Register
    r = requests.post(
        f"{BASE}/auth/register",
        json={"email": email, "password": password, "full_name": "Phase4 Test"},
    )
    assert r.status_code == 201, f"Register failed: {r.text}"
    token = r.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print(f"[register] 201 OK  ({email})")

    # 2. Create the run (does not start pipeline)
    r = requests.post(
        f"{BASE}/research/start",
        json={"question": "What is the current state of quantum computing?"},
        headers=headers,
    )
    assert r.status_code == 201, f"Start failed: {r.text}"
    run_id = r.json()["id"]
    print(f"[start]    201 OK  (run_id={run_id})")

    # 3. Open the SSE stream
    print("\n[stream]   opening SSE connection...\n")

    with requests.get(
        f"{BASE}/research/{run_id}/stream",
        headers=headers,
        stream=True,
        timeout=300,
    ) as resp:
        assert resp.status_code == 200, f"Stream failed: {resp.status_code}"

        for raw_line in resp.iter_lines(decode_unicode=True):
            if not raw_line:
                continue
            if not raw_line.startswith("data: "):
                continue

            payload = raw_line[len("data: "):]
            event = json.loads(payload)

            node = event.get("node", "?")
            msg = event.get("message", "")

            # Show errors inline if present
            errors = event.get("errors", [])
            err_suffix = ""
            if errors:
                err_suffix = "  [" + "; ".join(
                    f"{e['node']}:{e['error'][:40]}" for e in errors
                ) + "]"

            print(f"  [{node:10s}] {msg}{err_suffix}")

            if node == "done":
                print(f"\nFinal status: {event.get('status')}")
                break
            if node == "error" and event.get("fatal"):
                print(f"\nFATAL: {msg}")
                break

    # 4. Verify report saved
    r = requests.get(f"{BASE}/research/{run_id}", headers=headers)
    run = r.json()
    print(f"\n[verify]   status={run['status']}")
    if run["report_md"]:
        print(f"           report length={len(run['report_md'])} chars")
    if run["error"]:
        print(f"           error={run['error'][:100]}")


if __name__ == "__main__":
    main()