# Service Onboarding

`giwon-home`는 독립 서비스들을 연결하는 허브다. 새 프로젝트를 추가할 때는 아래 기준으로 붙인다.

## 1. 서비스 자체는 독립 repo로 만든다
- 예: `emergency-room-backend`, `emergency-room-frontend`
- 각 서비스는 자체 Dockerfile과 실행 방법을 가진다.
- 허브 repo 안에 비즈니스 코드를 넣지 않는다.

## 2. 허브 카드에 링크를 추가한다
프로젝트 카탈로그는 `giwon-home-api`에서 관리한다.

- `liveUrl`: 실제 서비스 URL
- `repositoryUrl`: 공개 저장소 URL
- `docsUrl`: 문서, 포트폴리오, 별도 프론트 repo 등 설명용 링크

예:
```kotlin
Project(
    id = "PROJECT-004",
    name = "My Service",
    status = "LIVE",
    category = "Tooling",
    summary = "짧은 소개",
    liveUrl = "https://service.example.com",
    repositoryUrl = "https://github.com/giwon1130/my-service",
    docsUrl = "https://www.notion.so/...",
    tags = listOf("Kotlin", "React"),
)
```

## 3. Docker로 같이 띄우는 방법은 두 가지다

### A. 독립 서비스로 배포
- 서비스별로 별도 compose, Fly.io, Render, EC2, Kubernetes 등 원하는 방식으로 배포
- `giwon-home`에서는 `liveUrl`만 연결
- 가장 단순하고 권장되는 방식

### B. 허브 도메인 아래 reverse proxy로 배포
예를 들어 `/services/my-service/`로 붙이고 싶으면:

1. `docker-compose.yml`에 서비스 추가
2. `nginx.conf`에 location 추가
3. 서비스 컨테이너 이름과 내부 포트를 맞춘다

예:
```yaml
services:
  my-service:
    build:
      context: ../my-service
    container_name: my-service
```

```nginx
location /services/my-service/ {
    proxy_pass http://my-service:3000/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 4. 허브의 역할은 유지한다
- 허브는 소개, 링크, 진입점 역할만 한다.
- 서비스 비즈니스 로직은 각 서비스 repo에서 관리한다.
- 새 서비스가 생겨도 허브는 카드와 링크만 추가하는 방향을 우선한다.
