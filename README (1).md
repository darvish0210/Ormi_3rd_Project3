# Ormi_3rd_Project3


https://paullabworkspace.notion.site/ChatGPT-74181b1211794d5cbb6d02197e2d0b11

ChatGPT를 이용한 챗봇 어플리케이션

- 프로젝트 일정: **11월 21일(화) ~ 11월 30일(목)**
- **12월 1일 개별 발표**(개인당 10분)

# 1. 주제 및 요구사항

[(1차 프로젝트인 HTML/CSS 프로젝트 확장)](https://www.notion.so/eb9761e8baae41ce9f7c405df8e19786?pvs=21)OpenAI의 GPT-3.5 모델을 이용해 챗봇 애플리케이션

- 기존 OpenAI에서 제공하는 API를 직접 만든 서버를 통해 요청하도록 변경합니다.
- DRF(Django Rest Framework)를 이용하여 서버를 구현합니다.
- 서버와 프론트를 분리하여 배포합니다.
- 과제1과 마찬가지로 WBS, ERD 등을 그립니다.

- 모든 구현은 **DRF를 이용하여 구현**합니다.
- 함수형 뷰 또는 클래스형 뷰 어떤 것을 선택하셔도 상관 없지만(혼합 사용도 좋습니다.) DRF로 구현해야 합니다.
- 회원가입을 구현합니다.
- 로그인을 구현합니다.
- ChatGPT로 요청을 보내주는 API를 Django내에 구현합니다.
    - (기존JS를 이용한방식) 프론트엔드에서 OpenAI API로 요청을 보냄
        - 프론트엔드 → OpenAI api 로 요청 → 응답값 프론트엔드에 반영
    - (변경해야 할 사항) 프론트엔드에서 Django서버를 통해 요청을 보내줍니다.
        - 프론트엔드 → Django서버 → Django서버에서 OpenAI api 로 요청 → Django서버에서 응답 받고 프론트엔드로 전달 → 응답값 프론트엔드에 반영
- 챗봇 API는 로그인을 한 유저만 사용가능합니다.
- 각 user 당 하루 5번만 요청할 수 있도록 구현합니다.
- 채팅을 데이터베이스에 저장합니다.
- 저장된 채팅 내역을 조회 할 수 있도록 구현합니다.
- 저장된 채팅 내역은 로그인한 본인만 볼 수 있습니다.



### 231121 

리포지토리 생성 및 주제 고민

### 231122

https://paullabworkspace.notion.site/ChatGPT-32c56a5acbc14932b92f8f4d43653988
기본 소스코드 실습 및 분석하기

만난에러

You tried to access openai.Completion, but this is no longer supported in openai>=1.0.0 - see the README at https://github.com/openai/openai-python for the API.

You can run `openai migrate` to automatically upgrade your codebase to use the 1.0.0 interface.

Alternatively, you can pin your installation to the old version, e.g. `pip install openai==0.28`

--------------
`pip install openai==0.28` 실행시

error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
      [end of output]

### 231123

error: Microsoft Visual C++ 14.0 or greater is required -> Microsoft C++ Build Tools 에서 'c++을 이용한 데스크톱 개발' 을 설치 후(6gb) openai 0.28 설치 후 해결

해결하고 나니, key 인증에러 발생 : openai.error.AuthenticationError: No API key provided.

key 재발급을 해도 풀리지 않아서 여러가지 시도하던 중, '.env' 파일을 chatbot app 폴더에 넣으니 해결됨 (기존에는 chat_project폴더에 있었음)

### 231124

Swagger UI Test


참고 : https://velog.io/@iedcon/AbstractBaseUser%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-Django-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%9C%A0%EC%A0%80-%EB%AA%A8%EB%8D%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0


### 231127

drf-TEST