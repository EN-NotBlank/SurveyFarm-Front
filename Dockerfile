
FROM node:18
WORKDIR /app
COPY --from=build /app/dist ./dist  # dist 폴더만 복사
RUN npm install -g serve  # 정적 파일을 서빙하기 위해 serve 설치
EXPOSE 3000
CMD ["serve", "-s", "dist"]  # 정적 파일 서빙