"""Tests for the /tasks CRUD endpoints."""


def test_create_task(client):
    response = client.post("/tasks", json={
        "title": "Write unit tests",
        "description": "Add pytest tests for the API",
        "priority": "high",
    })
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Write unit tests"
    assert data["priority"] == "high"
    assert data["status"] == "todo"
    assert "id" in data


def test_list_tasks(client):
    # Create two tasks
    client.post("/tasks", json={"title": "Task 1"})
    client.post("/tasks", json={"title": "Task 2"})

    response = client.get("/tasks")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2


def test_get_task(client):
    create_resp = client.post("/tasks", json={"title": "My Task"})
    task_id = create_resp.json()["id"]

    response = client.get(f"/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["title"] == "My Task"


def test_get_task_not_found(client):
    response = client.get("/tasks/9999")
    assert response.status_code == 404


def test_update_task(client):
    create_resp = client.post("/tasks", json={"title": "Old Title"})
    task_id = create_resp.json()["id"]

    response = client.put(f"/tasks/{task_id}", json={
        "title": "New Title",
        "status": "in_progress",
    })
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "New Title"
    assert data["status"] == "in_progress"


def test_update_task_not_found(client):
    response = client.put("/tasks/9999", json={"title": "No Task"})
    assert response.status_code == 404


def test_delete_task(client):
    create_resp = client.post("/tasks", json={"title": "Delete Me"})
    task_id = create_resp.json()["id"]

    response = client.delete(f"/tasks/{task_id}")
    assert response.status_code == 204

    # Verify it's gone
    get_resp = client.get(f"/tasks/{task_id}")
    assert get_resp.status_code == 404


def test_delete_task_not_found(client):
    response = client.delete("/tasks/9999")
    assert response.status_code == 404
