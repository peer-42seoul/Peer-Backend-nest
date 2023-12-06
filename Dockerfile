# 1단계: Node.js 이미지를 기반으로 빌드 환경 설정
FROM node:20-bullseye as build

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json과 package-lock.json 파일을 컨테이너에 복사
COPY package*.json ./

# 프로젝트 의존성 설치
RUN npm install

# 프로젝트 파일을 컨테이너에 복사
COPY . .

# NestJS 프로젝트 빌드
RUN npm run build

# 2단계: 실행을 위한 이미지 설정
FROM node:20-bullseye 

WORKDIR /usr/src/app

# 빌드 단계에서 생성된 node_modules와 dist 디렉토리 복사
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# 애플리케이션 실행
CMD ["sh", "-c", "NODE_ENV=remote && node dist/main"]
