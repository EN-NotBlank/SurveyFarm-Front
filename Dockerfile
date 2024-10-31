# 첫 번째 스테이지: 빌드
FROM node:18 AS build
WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# 애플리케이션 소스 복사
COPY . .

# Vite 빌드
RUN npm run build

# 두 번째 스테이지: 프로덕션 이미지
FROM node:18
WORKDIR /app

# 빌드된 파일 복사
COPY --from=build /app/dist ./dist

# 정적 파일을 서빙하기 위해 serve 설치
RUN npm install -g serve

# 포트 노출
EXPOSE 3000

# 정적 파일 서빙
CMD ["serve", "-s", "dist"]
