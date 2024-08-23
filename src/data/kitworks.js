import React from "react";

const projects = [
  {
    category: "Project",
    title: "현대자동차 캐스퍼",
    slug: "#casper",
    imageUrl: "img/projects/casper/1.png",
    subtitle:
      "현대자동차 캐스퍼 프로젝트 벡엔드 개발 팀장으로 역할 수행, 풀스택개발, 7000건의 태스크 수행",
    period: "2022.07 ~ 2024.07 (24개월)",
    roles: "벡엔드 팀장, 풀스택",
    tech: "java, spring boot, nodejs, nuxt2, k8s, gitlab, jira, confluence, jenkins, mybatis, tibero, mysql, MSA, BFF, SSR",
    description: (
      <>
        <p>
          견적, 계약, 결제, 할부 등등 대부분의 도메인 지식의 이해와 개발
        </p>
        <p>
          서비스를 사용자 관점, 데이터 관점, 코드 관점 세가지 측면에서 의논하면서 개발
        </p>
        <p>
          구성원 역량에 맞는 업무를 분배했으며 2년 동안 7000개의 지라 태스크를 성공적으로 수행
        </p>

        <h3>
          1. 성능개선
        </h3>
        <h4>
          1.1. 엑셀다운로드 시간 개선(10분 - 30초)
        </h4>
        <p>
          어려웠던점:MSA 환경에서 특정 값을 조회하기 위해, 행마다 API 호출해서 조회하는 방식(수행도 O(n))
        </p>
        <p>
          해결: 필요한 로직을 전부 분석해서 하나의 쿼리로 수행할 수 있게 변경
        </p>
        <h4>
          1.2. 쿼리튜닝
        </h4>
        <p>
          실행계획을 볼 수 없는 제한된 환경에서 개선 경험
        </p>
        <p>
          불필요한 조인, 드라이빙 테이블 최소화 등등
        </p>  

        <h3>2. 알고리즘적 문제해결</h3>
        <p>
          쿠폰이 A, B, C, D가 있을때, 모두 복수 선택가능한 쿠폰이라고 판단해야했음
        </p>
        <p>
        경우의 수: (A, B), (A, C), (A, D), (B, C), (B, D), (C, D)
        </p>
        <p>
          로 도출되고 경우의 수를 도식화
        </p>
        <p>
          nC2(조합 - 콤비네이션) 조건을 충족하면 복수 선택가능한 쿠폰한 조합이라 판단
        </p>
        <p>
          고객이 쿠폰 조합의 모든 경우의 수를 계층형 쿼리로 개발
        </p>

        <h3>3. 오픈소스 분석 및 프로젝트 목적에 맞게 수정</h3> 
        <p>
          웹 에디터 메뉴에 하이터링크가 라디오버튼에 따라 링크이동/새탭열기를 제어해야하는 기능이 필요
        </p>
        <p>
          관리자 웹에디터 오픈소스가 이미 적용된 상태에서 원하는 기능을 지원 안한다는 것을 파악 
          <a href="https://github.com/chmln/vue-wysiwyg" target="_blank">
            vue-wysiwyg
          </a>
        </p>
        <p>
          <a href="https://github.com/chmln/vue-wysiwyg/blob/master/src/editor/bus.js#L35" target="_blank">
            기존 코드를 활용하기 위해 내부 컴포넌트를 분석해서 `insertHtml` 자체 이벤트 로직 파악
          </a>
        </p>
        <p>
          vue 라이프사이클에 맞추어 마운트/언마운트 때 라디오DOM 생성 및 컴포넌트에 이벤트 동적 할당
        </p>

        <h3>
          4. 보안취약점 대응(시큐어 코딩)
        </h3>
        <h4>
          4.1. http 요청 파라미터 RSA 암복호화
        </h4>
        <p>
          <strong>캐스퍼 RSA 암복호화 리딩</strong> (프론트, 벡엔드 코드 두 가지 베이스를 알아야 작업 가능했음)
        </p>
        <p>
          프론트에서 RSA 암호화가 안되는 현상
        </p>
        <p>
          RSA 키 길이보다 긴 문자열은 암호화가 안됨을 파악
        </p>      
        <p>
          문자열을 임의 길이로 나누고 암호화 후, 벡엔드에서 각각 복호화 후 문자열을 합치는 방향으로 작업
        </p>
        <p>
          URI 인코딩
        </p>
        <p>
          GET 요청으로 암호화 파라미터 전달 시, 특수문자가 URI 디코딩 되어 복호화가 안되는 현상
        </p>
        <p>
          URI 인코딩을 두 번 수행 후 복호화 처리
        </p>

        <h4>4.2. 개인정보마스킹</h4>
        <p>
          마스킹 처리를 하니, 그 API에 의존하는 다른 서비스에서 영향이 발생하는 것을 확인
        </p>
        <p>
          벡엔드끼리만 내부에서만 이용하는 별도 API 구축
        </p>

        <h4>4.3. SQL injection</h4>

        <h3>5. 외부 타회사 api 연계 경험 (할부 : 현대 캐피탈, 보험사 : kb보험, 캐롯 등, 전자서명 : esign)</h3>
        필요한 기능을 화상회의하여 논의
        타회사에서 제공 해준 API문서 기반으로 개발 경험
        통신하기 위한 규격(api, socket 등등)이나 개인식별값 암호화하는 방식이 달랐음

        <hr />
        <h3>프로젝트 이미지</h3> 
        <img src='/img/projects/casper/2.png' alt={'2'} />
        <img src='/img/projects/casper/3.png' alt={'3'} />
        <img src='/img/projects/casper/4.png' alt={'4'} />
        <img src='/img/projects/casper/5.png' alt={'5'} />
        <img src='/img/projects/casper/6.png' alt={'6'} />
        <img src='/img/projects/casper/7.png' alt={'7'} />
      </>
    ),
    links: [
      {
        name: "Website",
        link: "https://casper.hyundai.com/",
      },
    ],
  },
  {
    category: "Project",
    title: "캐스퍼 D2C 전시장 IT시스템 구축",
    slug: "#casper-d2c",
    imageUrl: "img/projects/casper-d2c/1.png",
    subtitle:
      "벡엔드 개발 및 업무 회의 지원",
    period: "2024.04 ~ 2024.07 (3개월)",
    tech: "spring boot, nuxt2, k8s",
    description: (
      <>
        <p>
          D2C측 외부 인터페이스 연계
        </p>
        <p>
          개인정보 식별 토큰 AES256 암복호화 처리
        </p>
       
        <img src='/img/projects/casper-d2c/2.png' alt={'2'} />
        <img src='/img/projects/casper-d2c/3.png' alt={'3'} />
        <img src='/img/projects/casper-d2c/4.png' alt={'4'} />
      </>
    ),
    links: [
      {
        name: "Website",
        link: "https://casper.hyundai.com/",
      },
    ],
  },
  {
    category: "Project",
    title: "스터디모아",
    slug: "#studymoa",
    imageUrl: "img/projects/studymoa/title.png",
    subtitle:
      "풀스택개발자로 스터디모아 개발 및 유지보수",
    period: "2019.12 ~ 2024.07 (4년 8개월 - 56개월)",
    tech: "NodeJS, Koa, React, Docker, Sequelize, Mysql, kotlin, ktor, ktorm, Apache, AWS, GitHub Actions, AWS CodeDeploy",
    roles: "풀스택",
    description: (
      <>
        <h3>
          1. 성능 개선
        </h3>
        <h4>1.1. 쿼리 성능 개선</h4>
        <p>
          ORM이여서 벡엔드 코드를 직접 수행 후 생성되는 쿼리 파악. SQL로 실행계획을 분석 후 다시 ORM 코드로 작성
        </p>
        <p>
          존재여부 판단하는 로직을 카운트 쿼리 대신 단건 조회 방식으로 변경
        </p>
        <p>
          뷰 쿼리에서 불필요 조건 제거 (3분에서 400ms로 개선)
        </p>
        <h4>1.2. API 성능 개선</h4>
        <p>
          nodejs가 운용 중에 다운되는 현상 파악
        </p>
        <p>
          APM으로 측정 결과 대부분 조회 API에서 <strong>event-loop-lag이 높게 측정</strong>
        </p>
        <p>
          async/await를 필요한 곳에서만 이용하며 `Promise.all`로 전환해서 여러 태스크를 비동기 처리할 수 있게 개선
        </p>

        <h3>2. 외부 API 연동</h3>
        <h4>
          결제 PG사 변경
        </h4>
        <p>
          결제 정산 수수료 이슈로 아임포트(REST API) 방식에서 KSNET(JSP, PHP, 소켓프로그래밍)를 적용했음
          JSP, PHP 코드를 분석해서 서버/클라이언트 단으로 각각 분리하고 자바스크립트로 전환
        </p>
        <h4>
          세금계산서 - 바로빌
        </h4>
        <p>
          RestAPI 통신이 아니라 SOAP 통신 규격을 지원해서 그거에 맞게 기능 개발
        </p>
        <h4>
          알림톡 - 인포뱅크
        </h4>
        <p>
          알림톡 템플릿 등록 및 스터디모아 알림서비스 개발 및 유지보수
        </p>
        <h3>3. 인프라 관리</h3>
        <h4>3.1 HTTP 설정</h4>
        <p>
          - HTTP2 적용
        </p>
        <p>
          - HTTP를 HTTPS로 리다이렉트: 
          처음 적용 시, 301로 리다이렉트해서 GET 방식 이외의 요청이 GET으로 리다이렉트로 되는 것을 확인 <br />
          HTTP 상태코드 문서를 공부 후, 307로 처리해서 정상화
        </p>
        <p>
          - TLS 적용: 유료인증서(운영계), 무료인증서(개발계 - letsencrypt) 별도 적용
        </p>
        <p>
          - 커널 파라미터 튜닝: 
        </p>
        <h4>
          3.2 웹서버, WAS간 Keepalive 세팅
        </h4>
        <p>
          AWS EC2 하나에 웹서버, WAS가 같이 운영됬는데 로컬 통신임에도 매번 요청마다 HTTP 커넥션을 계속 맺음을 확인 (와이어샤크, tcpdump로 디버깅)
        </p>
        <p>
          Nodejs에 60초 Http Keepalive 설정했고 HTTP 커넥션 맺는 횟수를 10배 이상 개선할 수 있었음
        </p>
        <h4>3.3 Mysql 메이지 버전 업데이트(5.7에서 8.0)</h4>
        <p>
         AWS RDS 스냅샷을 뜬 이후에, 8.0 버전으로 테스트베드 구축
        </p>
        <p>
          메이저버전을 업데이트하기에 로직과 UI 테스트를 하나씩 진행하면서 이상 있는 부분 파악 후 개선
        </p>

        <h3>
          4. 트랜젝션 처리 (Seqeulize 오픈소스분석)
        </h3>
        <p>
        트랜젝션이 중첩되었을때 `findOrCreate` 메서드 호출 시  의도한데로 동작이 안되는 현상을 확인
        </p>
        <p>
          시퀄라이즈 문서 상에는 없어서 오픈소스 분석 후 문제 해결
        </p>
        <p>
          분석 결과, 특정 트랜젝션을 옵션을 주지않으면 디폴트로 동작해서 발생한 오류로 파악 
          <a href="https://github.com/sequelize/sequelize/blob/0b7c86d063bfb43fd3d513640456a63304934231/packages/core/src/model.js#L2030-L2094" target="_blank">시퀄리이즈 findOrCreate 트랜젝션 분석 코드</a>
        </p>
        <p>
          파라미터로 현재 트랜젝션을 주니 정상 동작 함 
        </p>

        <h3>
          5. <strong>`전략패턴`</strong>을 이용한 동적 SQL 처리
        </h3>
        <p>
          관리자 페이지에서 설정한데로 게시글 목록 로직이 동적으로 변경되어야하는 기능 구현이 필요
        </p>
        <p>
          검색 파라미터, 조건, 결과 등등의 로직을 추상화했고
        </p>
        <p>
          전략 패턴으로 적용해서 코드 간결화
        </p>

        <hr />
        <h3>프로젝트 이미지</h3>
        <img src='/img/projects/studymoa/0.png' alt={'1'} />
        <img src='/img/projects/studymoa/1.png' alt={'1'} />
        <img src='/img/projects/studymoa/2.png' alt={'2'} />
        <img src='/img/projects/studymoa/3.png' alt={'3'} />
      </>
    ),
    links: [
      {
        name: "스터디모아",
        link: "https://studymoa.me",
      },
      {
        name: "스터디모아앱(안드로이드)",
        link: "https://play.google.com/store/apps/details?id=com.studymoa_app&hl=ko&gl=US",
      },
      {
        name: "스터디모아앱(애플)",
        link: "https://apps.apple.com/kr/app/스터디모아-스터디공간-예약-앱/id1482125295",
      },
      {
        name: "스터디모아 소개서 (PDF - 공개자료)",
        link: "https://kitworks.s3.ap-northeast-2.amazonaws.com/%EC%8A%A4%ED%84%B0%EB%94%94%EB%AA%A8%EC%95%84+%EC%86%8C%EA%B0%9C%EC%84%9C.pdf",
      },
    ],
  },
  {
    category: "Project",
    title: "MetLife",
    slug: "#metlife",
    imageUrl: "img/projects/metlife/1.png",
    subtitle:
      "프론트엔드 코어 팀으로 활동",
    period: "2021.07 ~ 2021.12(6개월)",
    tech: "React, Nextjs, Storybook",
    roles: "프론트엔드",
    description: (
      <>
        <h3>1. 에자일 방법론으로 주마다 스프린트 회의 및 개발방향 논의</h3>
        <p>
          아침 9시마다 회의해서 각 팀별로 태스크가 무엇인지 공유되어야 하는 사항을 의논했음
        </p>
        <h3>2. 공통 컴포넌트 개발 및 유지보수</h3>
        <p>
          코어팀을 제외한 모든 구성원들이 풀스캑개발로 참여했음. 역량, 경력, 배경이 전부 다른 프리렌서들과 타회사와의 코드로 커뮤니케이션 비용이 많이 발생함
        </p>
        <p>
          컴포넌트 코드를 개발하고 공유하는 자리에 질의응답 및 컴포넌트 의도/사용법 등을 설명
        </p>
        <h3>3. 웹접근성 100% 달성</h3>
        <p>
          프로젝트 초반에는 웹접근성 인증이 필요하다는 언급이 아예 없어서 개발했던 컴포넌트에 프로젝트 종료 한달 전에 웹접근성 심사를 받아야 했음
        </p>
        <p>
          컴포넌트에 일괄적으로 적용하니 스타일이나 기능에 영향이 가서 확인 후, 수정 완료
        </p>
        <p>
          외부기관에서 심사 후 100%를 달성
        </p>
        <a href="https://websoul.co.kr/accessibility/WA_guide22.asp" target="_blank">웹접근성 항목</a>
        <img src='https://www.metlife.co.kr/content/dam/metlife/kr/author/layout/footer/logo-wa-202111.png' alt={'2'} />

        <hr />
        <h3>프로젝트 이미지</h3>
        <img src='/img/projects/metlife/2.png' alt={'2'} />
        <img src='/img/projects/metlife/3.png' alt={'3'} />
        <img src='/img/projects/metlife/4.png' alt={'4'} />
        <img src='/img/projects/metlife/5.png' alt={'5'} />
        <img src='/img/projects/metlife/6.png' alt={'6'} />
      </>
    ),
    links: [
      {
        name: "WebSite",
        link: "https://www.metlife.co.kr/",
      },
    ],
    bgColor: "alternate",
  },
  {
    category: "Project",
    title: "서울대학교 행복연구센터 웹사이트",
    slug: "#happyfinder",
    imageUrl: "img/projects/happyfinder/1.png",
    subtitle:
      "신규 페이지 리뉴얼",
    period: "2021.06 ~ 2021.09 (3개월)",
    tech: "javascript, php, python, wordpress, aws s3",
    description: (
      <>
        <p>
          기존에 전자정부프레임워크(JSP)로 되어있는 사이트를 리뉴얼하는 프로젝트
        </p>
        <p>
          혼자서 다른 프로젝트로 병행해서 해야했기에 워드프레스로 빠르게 개발하기로 결정
        </p>
        <p>
          데이터 마이그레이션 (db 데이터, 이미지, 파일 등등) <br />
          ASIS db 데이터를 읽고, TOBE 사이트에 업로드 할 수 있게 파이썬 스크립트 작성
        </p>
        <p>
          워드프레스 php 코드 분석해 비밀번호 암호화하는 함수를 파악
          기존 회원 암호화된 데이터에 맞게 암호화 함수 변경
        </p>
        <hr />
        <h3>프로젝트 이미지</h3>
        <img src='/img/projects/happyfinder/2.png' alt={'2'} />
        <img src='/img/projects/happyfinder/3.png' alt={'3'} />
        <img src='/img/projects/happyfinder/4.png' alt={'4'} />
        <img src='/img/projects/happyfinder/5.png' alt={'5'} />
        <img src='/img/projects/happyfinder/6.png' alt={'6'} />
        <img src='/img/projects/happyfinder/7.png' alt={'7'} />
      </>
    ),
    links: [
      {
        name: "Website",
        link: "https://happyfinder.co.kr/",
      },
    ],
  },
  {
    category: "Project",
    title: "SK MIS",
    slug: "#sk-mis",
    imageUrl: "img/projects/sk-mis/1.png",
    subtitle:
      "SK 내부 전사시스템 개발 참여",
    period: "2021.09 ~ 2021.11 (3개월)",
    roles: "풀스택개발자",
    tech: "vue, string-boot, jpa, mybatis, realGrid",
    description: (
      <>
        <p>
          SK 내부 전사시스템 개발 참여
        </p>
        <p>
          CRUD 개발
        </p>
        <hr />
        <h3>프로젝트 이미지</h3>
        <img src='/img/projects/sk-mis/2.png' alt={'2'} />
        <img src='/img/projects/sk-mis/3.png' alt={'2'} />
        <img src='/img/projects/sk-mis/4.png' alt={'2'} />
        <img src='/img/projects/sk-mis/5.png' alt={'2'} />
        <img src='/img/projects/sk-mis/6.png' alt={'2'} />
        <img src='/img/projects/sk-mis/7.png' alt={'2'} />
      </>
    )
  },
  {
    category: "Project",
    title: "대검찰청 디지털 증거 분석 송치 시스템",
    slug: "#forensic",
    imageUrl: "img/projects/forensic/1.png",
    subtitle:
      "대검찰청 디지털 증거 분석 송치 시스템",
    period: "2021.03 ~ 2021.05 (3개월)",
    roles: "프론트엔드",
    tech: "vue, electron, realGrid",
    description: (
      <>
        <p>
          프로젝트 막판에 긴급 인력 투입
        </p>
        <p>
          CRUD 개발
        </p>
        <hr />
        <h3>프로젝트 이미지</h3>
        <img src='/img/projects/forensic/2.png' alt={'2'} />
      </>
    )
  },
  {
    category: "Project",
    title: "현대자동차 홈페이지 & 임직원몰",
    slug: "#hyundai",
    imageUrl: "img/projects/hyundai/1.png",
    subtitle:
      "프로젝트 개발 막판 참여, 이후 12개월 유지보수",
    period: "2020.02 ~ 2021.02 (12개월)",
    roles: "풀스택",
    tech: "java, spring boot, nodejs, nuxt2, k8s, gitlab, redmine, jenkins, mybatis, tibero, mysql, MSA, BFF, SSR",
    description: (
      <>
        <h3>1. Axios 인스턴스 싱글턴 및 처리</h3>
        <p>
          nodejs단에서 axios 래퍼 인스턴스가 API 요청마다 생성됨을 확인, 서비스마다 baseUrl 경로가 달라 동적생성  처리하고 있었음. 
        </p>
        <p>
          그로 인해 메모리 이슈 발생
        </p>
        <p>
          싱글톤패턴으로 문제해결
        </p>
        <p>
          baseUrl이 다를 때만 axios를 생성하고 캐시형태로 저장
        </p>

        <h3>2. VR360 이미지 fetching</h3>
        <p>
          360도 VR을 구현하기 위해 각도마다 별도의 이미지가 있고 각도가 변경될때마다 새 이미지를 불러오는 방식
        </p>
        <p>
          이미지를 불러오는게 느려서, 사전에 미리 fetching하는 로직 구현
        </p>

        <hr />
        <h3>프로젝트 이미지</h3>
        <img src='/img/projects/hyundai/2.png' alt={'2'} />
        <img src='/img/projects/hyundai/3.png' alt={'3'} />
        <img src='/img/projects/hyundai/4.png' alt={'4'} />
        <img src='/img/projects/hyundai/5.png' alt={'5'} />
      </>
    ),
    links: [
      {
        name: "WebSite",
        link: "https://www.hyundai.com/kr/ko/e",
      },
    ],
  },
  {
    category: "Project",
    title: "13B경기도워라벨링크",
    slug: "#13b",
    imageUrl: "img/projects/13b/1.png",
    subtitle:
      "관리자 페이지 개발",
    period: "2019.12 ~ 2020.02 (2개월)",
    roles: "프론트엔드",
    tech: "vue",
    description: (
      <>
        <p>관리자 CRUD 개발</p>
        <p>웹에디터 적용</p>
        <hr />
        <h3>프로젝트 이미지</h3>
        <img src='/img/projects/13b/2.png' alt={'2'} />
        <img src='/img/projects/13b/3.png' alt={'2'} />
        <img src='/img/projects/13b/4.png' alt={'2'} />
        <img src='/img/projects/13b/5.png' alt={'2'} />
        <img src='/img/projects/13b/6.png' alt={'2'} />
        <img src='/img/projects/13b/7.png' alt={'2'} />
      </>
    ),
    links: [
      {
        name: "WebSite",
        link: "https://13b.gg.go.kr/",
      },
    ],
  },
];

export default projects;
