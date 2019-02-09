# 9. Resolve

Resolve에 대한 기초는 [여기서](https://github.com/hoilzz/TIL/blob/master/FrontEnd/webpack/%EA%B3%B5%ED%99%88%EB%B2%88%EC%97%AD/module-resolution.md) 확인하자.

여태 세팅하지 않고도 resolve를 잘해줬는데, 이유는 webpack이 합리적인 defaults 옵션을 제공하기 때문이다. 

여튼 Resolve 옵션은 module이 resolve 되는 방식을 변경시킨다.
예컨대 `import 'lodash'` 호출시, `resolve` 옵션은 웹팩이 `lodash`를 찾는 방법을 변경시킬 수 있다.

```js
module.exports = {
  resolve: {
    // config options
  }
}
```




## Resolving for build performance

다음 스텝은 resolve 속도를 올려준다.

- `resolve.modules`, `resolve.extensions`, `resolve.mainFiles`, `resolve.descriptionFiles`의 값의 개수를 최소화하자. 얘네들은 filesystem call 수를 증가시킨다.

- 만약 symlink를 사용하지 않는다면 `resolve.symlinnks: false`를 사용하자.


### `resolve.modules`
- 웹팩에게 module을 resolve할 때, 어떤 디렉토리를 찾아야 하는지 알려준다.
- 절대 경로와 상대 경로 둘 다 사용되는데, 두 경로가 약간 다르게 행동한다. 
- 상대경로는 Node가 `node_modules`를 스캔하는 방식과 비슷하다. 현재 디렉토리의 node_module을 뒤지고 없으면 그 위의 node_module.. 루트까지 올라간다.

- 절대 경로는 주어진 절대경로만 검색한다.

보통은 다음과 같이 세팅한다.

```js
resolve: {
  modules: [path.resolve(__dirname, 'src'), 'node_modules']
}
```

__특정 디렉토리를 추가하게 될 경우 node_modules의 앞에 오게하자__

### `resolve.extensions`

- 자동으로 특정 확장자만 resolve한다.

```js
module.exports = {
  //...
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
    extensions: ['.js', '.jsx']// , .scss ,.css]
  }
};
```

- scss나 css가 추가되어 같이 빌드하려면 추가해주면 된다.

---

요기까지 해서 js 개발시 최소로 필요한 세팅을 완료하였다. 다음은 포스팅은 react 개발 가능하도록 세팅을 하고 마무리하도록 하겠다.
