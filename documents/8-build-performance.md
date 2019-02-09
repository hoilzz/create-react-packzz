# 8. build performance

build/compilation 퍼포먼스의 개선을 위한 유용한 팁 모음집.

## General

일단 prod와 dev를 나눠서 세팅하는 것을 전제로한다.
dev와 prod의 목표는 다르기 때문이다.

> `development`
- strong source map
- localhost server with live reloading or Hot module replacement

> `production`
- minified bundles
- lighter weight source maps
- load 시간을 개선하기 위한 optimized assets

...

### Smaller == Faster

빌드 퍼포먼스를 증가시키기 위해 컴파일의 total size를 감소시켜야한다. chunk를 작게 유지하자.

- fewer/smaller libraries를 이용하자.
- Multi-page Application이거나 async로드 되는 모듈을 위해 `CommonsChunkPlugin`을 사용하자
- 현재 개발 중인 코드의 __부분만__ 컴파일하자.

## Development

### compile in memory

webpack-dev-server는 컴파일하여 assets을 disk에 쓰는게 아닌 메모리에서 제공하기 때문에 퍼포먼스를 개선시킨다.

### Devtool

cheap-module-eval-source-map이 대부분의 경우에 베스트 옵션이다.

### Production에만 쓰이는 툴 피하자

예컨대 개발 중에 code를 minify, mangle 하는 것은 말이 안된다. 이 툴은 dev에서 제외되어야 한다. [참고](https://webpack.js.org/guides/build-performance/#avoid-production-specific-tooling)

- TerserPlugin
- ExtractTextPlugin
- hash / chunkhash

## Production

### Source Maps

Source maps are really expensive. Do you really need them?

production 세팅할 때, sourcemap 넣었는데.. 필요한 상황이 아니면 빼야겠다..