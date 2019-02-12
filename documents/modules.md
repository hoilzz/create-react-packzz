# Module

웹팩 공홈의 [Module](https://webpack.js.org/concepts/modules/)을 내가 필요한 것만 번역했슴다.

modular 프밍에서, 개발자는 프로그램을 module이라 불리는 함수 덩어리 단위로 분해한다.

Node는 모듈러 프로그래밍을 처음부터 지원했다. 그러나, 웹에서는 modules에 대한 지원이 느리다. 웹팩은 여러 도구에서 배운 교훈을 토대로 프로젝트의 모든 파일에 모듈 개념을 적용한다.

## What is a webpack Module

Node.js module과 반대로, 웹팩 modules은 다양한 방식으로 dependencies를 표현할 수 있다. 

ES6의 import, commonJS의 require 등등

## Supported Module Type

webpack은 loader를 통해 다양한 언어와 전처리기로 작성된 모듈을 지원한다. Loader는 웹팩이 non-JS module을 처리하는 방식을 설명하고 너의 bundle에 의존성을 포함시킨다. 웹팩 커뮤니티는 유명한 언어에 대한 loader를 가진다.
(ts, esNext(babel), sass, Less, Stylus)