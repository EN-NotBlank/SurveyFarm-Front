FROM node:16-alpine
# 경로 설정하기
WORKDIR /app
COPY package.json .

# 의존성 설치
RUN npm install

COPY . .
# 현재 디렉토리의 모든 파일을 도커 컨테이너의 Working Directory에 복사합니다.

# 프로젝트의 포트 번호를 사용합니다
EXPOSE 3000

# npm start 스크립트 실행
CMD ["npm", "run", "dev"]
