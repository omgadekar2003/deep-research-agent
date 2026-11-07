import requests

BASE = "http://localhost:8000"


def test_health():
    r = requests.get(f"{BASE}/health")
    print("HEALTH:", r.status_code, r.json())


def test_register():
    r = requests.post(
        f"{BASE}/auth/register",
        json={
            "email": "test@example.com",
            "password": "testpass123",
            "full_name": "Test User",
        },
    )
    print("REGISTER:", r.status_code, r.json())
    return r.json() if r.status_code in (200, 201) else None


def test_login():
    r = requests.post(
        f"{BASE}/auth/login",
        json={"email": "test@example.com", "password": "testpass123"},
    )
    print("LOGIN:", r.status_code, r.json())
    return r.json() if r.status_code == 200 else None


def test_me(token):
    r = requests.get(
        f"{BASE}/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    print("ME:", r.status_code, r.json())


def test_refresh(refresh_token):
    r = requests.post(
        f"{BASE}/auth/refresh",
        json={"refresh_token": refresh_token},
    )
    print("REFRESH:", r.status_code, r.json())
    return r.json() if r.status_code == 200 else None


def test_start_research(token):
    r = requests.post(
        f"{BASE}/research/start",
        json={"question": "What is the current state of quantum computing?"},
        headers={"Authorization": f"Bearer {token}"},
    )
    print("START:", r.status_code, r.json())
    return r.json() if r.status_code in (200, 201) else None


def test_history(token):
    r = requests.get(
        f"{BASE}/research/history",
        headers={"Authorization": f"Bearer {token}"},
    )
    print("HISTORY:", r.status_code, r.json())


def main():
    test_health()

    tokens = test_register()
    if not tokens:
        print("Register failed — cannot continue.")
        return

    tokens = test_login()
    if not tokens:
        print("Login failed — cannot continue.")
        return

    access = tokens["access_token"]
    refresh = tokens["refresh_token"]

    test_me(access)
    new_tokens = test_refresh(refresh)
    if new_tokens:
        access = new_tokens["access_token"]

    test_start_research(access)
    test_history(access)


if __name__ == "__main__":
    main()