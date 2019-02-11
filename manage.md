# manage

## published pkg version number

1. 버전 정하기

package.json의 버전 번호를 변경하기 위해, package root dir에서 다음 cli 입력하자.

```
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]

npm version prepatch --preid=${jira name} // 개발 테스트, qa
npm version patch// release
```

2. 배포하기

run `npm publish --tag=${tagName}`

```
npm publish --tag=dev // 개발테스트
npm publish --tag=qa // qa
npm publish
```

- 릴리즈 배포가 아니라면 tagName 명시하여 어떤 사람이 npm install시 `latest` tag를 가져오기 대문에 안정성 확보

3. 테스트 및 확인

```
npm i {package.name}@{tag}

npm i {package.name}@dev
npm i {package.name}@qa
npm i {package.name}
```

- `http://pkgrepos.tmonc.net:8080/nexus/content/groups/npm-repo/` 여기 가서 버전 정보 확인

## package dist-tag

- 태그는 version numbers 대신에 alias를 제공할 때 사용됨
- 예를 들어, 프로젝트는 여러개의 개발 스트림을 선택해야 하고 각 스트림마다 다른 태그를 사용
  - stable, beta, dev, canary
- default로는, 패키지의 현재 버전을 확인하기 위해 `latest` tag가 사용
- `npm install <pkg>` 하면 (without `@<version>` or `@<tag>` ) `latest` tag를 설치
  - 그래서 stable release version으로는 `latest` 만을 사용
  - prerelease와 같이 unstable version에는 다른 태그 사용
- `next` tag는 upcoming version을 위해 사용

- 배포할 때는
  - npm publish —tag=\${tagName}
  - —tag 없으면 latest로 배포

패키지 설치시 특정 버전을 이용하는거 대신에 참보된 버전으로 tag 사용할 수 있다.

## 참고

[https://docs.npmjs.com/cli/version.html](https://docs.npmjs.com/cli/version.html)
[https://docs.npmjs.com/cli/dist-tag](https://docs.npmjs.com/cli/dist-tag)
[https://docs.npmjs.com/cli/publish.html](https://docs.npmjs.com/cli/publish.html)
