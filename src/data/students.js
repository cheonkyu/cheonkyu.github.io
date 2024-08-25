import React from "react";
import ReactPlayer from 'react-player'

const projects = [
  {
    category: "Project",
    title: "전통시장 물품 주문 및 상담 플랫폼",
    slug: "#passta",
    imageUrl: "img/projects/students/passta/1.png",
    subtitle:
      "[수상 - 은상] 개방형 클라우드 플랫폼 파스-타(PaaS-TA)를 기반으로 공공·민간 데이터를 활용해 서비스 개발",
    period: "2018.07 - 2018.09 (2개월)",
    roles: "풀스택 1인개발",
    tech: "nodejs, fusetools, Pass-ta, cloud foundry",
    description: (
      <>
        <p>
          Pass-ta 기반 서비스 배포
        </p>
        <p>
          공공데이터 활용
        </p>

        <hr />
        <h3>프로젝트 이미지</h3> 
        <img src='/img/projects/students/passta/2.png' alt={'2'} />
        <img src='/img/projects/students/passta/3.png' alt={'3'} />
        {/* <img src='/img/projects/students/passta/4.png' alt={'4'} /> */}
      </>
    ),
    links: [
      {
        name: "Article",
        link: "http://daehannews.kr/mobile/article.html?no=457930",
      },
    ],
  },
  {
    category: "Project",
    title: "블록체인을 활용한 헌혈 정보 관리 플랫폼",
    slug: "#netchallenge",
    imageUrl: "img/projects/students/netchallenge/1.png",
    subtitle:
      "[수상 - 은상] 개방형 클라우드 플랫폼 파스-타(PaaS-TA), KOREN 망을 이용한 프로젝트",
    period: "2018.08 - 2018.11 (3개월)",
    roles: "풀스택",
    tech: "nodejs, fusetools, Pass-ta, Blockchain, Hyperledger-fabric, cloud foundry",
    description: (
      <>
        <p>
          아이디어
        </p>
        <p>
          1. 헌혈증서의 관리
        </p>
        <p>
          2. 신뢰 있는 헌혈증서의 디지털화 
        </p>
        <p>
          3. 헌혈증서의 효율적인 부 및 교환
        </p>
        <p>
          4. 디지털화 된 헌혈증서의 유동적인 순환 가능
        </p>

        <p>
          프라이빗 블록체인 하이퍼랫저 패브릭 활용
        </p>

        <hr />
        <h3>프로젝트 이미지</h3> 
        <img src='/img/projects/students/netchallenge/2.png' alt={'2'} />
        <img src='/img/projects/students/netchallenge/3.png' alt={'3'} />
        <img src='/img/projects/students/netchallenge/4.png' alt={'4'} />
      </>
    ),
    links: [
      {
        name: "Article",
        link: "https://www.jeonmae.co.kr/news/articleView.html?idxno=256084",
      },
    ],
  },
  {
    category: "Project",
    title: "Chaining - 블록체인 개발용 웹 IDE 서비스",
    slug: "#chaining",
    imageUrl: "img/projects/students/chaining/1.png",
    subtitle:
      "소프트웨어마에스트로 9기 활동",
    period: "2018.06 - 2018.12 (6개월)",
    roles: "팀장, 인프라",
    tech: "ethereum, k8s, rasberrypi, jupyter, javascript",
    description: (
      <>
        <p>
          컨트렉트 배포 네트워크 및 dApp 에코에 대한 (블록체인 개발)을
        </p>
        <p>
          지원 해주는 아이디어를 구상하게 됨.
        </p>
        <p>
          Development Asssitant : BC Development Cloud. (IDE-Infra) : - APP개발.
        </p>
        <h3>1. 스마트컨트렉트를 개발할 수 있는 IDE</h3>
        <p>
          기존 오픈소스를 활용
        </p>
        <p>
          - Remix IDE : solidity 개발 및 테스트 IDE
        </p>
        <p>
          - Blockly : 시각화 프로그래밍 라이브러리
        </p>
        <h3>
          2. 사용자별 특정 블록체인 네트워크를 배포할 수 있는 클라우드 환경 제공
        </h3>
        <p>
          Kubernetes를 활용, 이더리움과 하이버렛저를 사용자 별 배포
        </p>

        <hr />
        <h3>프로젝트 이미지</h3> 
        <img src='/img/projects/students/chaining/2.png' alt={'2'} />
        <img src='/img/projects/students/chaining/3.png' alt={'3'} />
        <img src='/img/projects/students/chaining/4.png' alt={'4'} />
        <img src='/img/projects/students/chaining/5.png' alt={'5'} />
        <img src='/img/projects/students/chaining/6.png' alt={'6'} />
        <img src='/img/projects/students/chaining/7.png' alt={'7'} />
      </>
    ),
    links: [
      {
        name: "9기 활동 사진",
        link: "https://www.swmaestro.org/sw/singl/activeIntc/list.do?menuNo=200014",
      },
    ],
  },
  {
        category: "Project",
        title: "건양대학교 글로벌 산학연계 교육활성화(퓨즈툴스 기업 연계 활동)",
        slug: "#fuse",
        imageUrl: "img/projects/students/fuse/1.png",
        subtitle:
          "노르웨이 스타트업 산학연계 프로젝트",
        period: "2018.10 - 2018.02 (5개월)",
        roles: "팀장, 로봇, 앱개발자",
        tech: "python, nodejs, fusetools",
        description: (
          <>
            <p>
                디자인 학부생과 첫 연계 프로젝트
            </p>
            <p>
                노르웨이 해외 일주일 연수 참여
            </p>
    
            <hr />
            <h3>프로젝트 이미지</h3> 
            <img src='/img/projects/students/fuse/2.png' alt={'2'} />
            <img src='/img/projects/students/fuse/3.png' alt={'3'} />
            <img src='/img/projects/students/fuse/4.png' alt={'4'} />
            <ReactPlayer playing controls url='/img/projects/students/fuse/1.mp4' />
            <ReactPlayer playing controls url='/img/projects/students/fuse/2.mp4' />
          </>
        ),
        links: [
          {
            name: "Article",
            link: "https://www.kbanker.co.kr/news/articleView.html?idxno=71599",
          },
        ],
  },
  {
    category: "Project",
    title: "웹 기반 원격 Docker 관리 도구",
    slug: "#oss",
    imageUrl: "img/projects/students/oss/0.png",
    subtitle:
      "[수상 - 금상] 오픈소스를 활용한 프로젝트",
    period: "2017.04 - 2017.11 (7개월)",
    roles: "풀스택, 1인개발",
    tech: "nodejs, docker, docker-swarm, open source",
    description: (
      <>
        <h3>1. Docker 관리 기능</h3>
        <ul>
          <li>컨테이너 관리 : Docker 내부 컨테이너 관리 기능</li>
          <li>네트워크 관리 : Docker 컨테이너 및 Swarm의 네트워크 관리 기능</li>
          <li>이미지 관리 : Docker 컨테이너 생성에 필요한 이미지 관리 기능</li>
          <li>볼륨 관리 : Docker 컨테이너에 필요한 Storage</li>
          <li>Dockerfile 관리 : Docker 이미지 생성에 필요한 Dockerfile 관리 기능</li>
          <li>Docker Swarm 관리 : Docker Swarm 관리 기능</li>
          <li>서비스 관리 : Docker 서비스 관리 기능</li>
        </ul>

        <h3>2. 메인 서버 관리 기능</h3>
        <ul>
          <li>Web terminal : 메인서버 관리를 위한 Web Terminal</li>
          <li>Web VNC : 메인서버 관리를 위한 원격 데스크탑 연결</li>
          <li>dashboard : 메인서버 자원 현황 모니터링</li>
        </ul>

        <h3>3. 보안</h3>
        <p>OpenSSL을 활용해 Web은 HTTPS, 메인서버와 Docker Daemon 서버간 통신을 HTTP or HTTPS를 이용해 보안을 강화</p>

        <hr />
        <h3>프로젝트 이미지</h3> 
        <img src='/img/projects/students/oss/1.png' alt={'2'} />
        <img src='/img/projects/students/oss/2.png' alt={'2'} />
        <img src='/img/projects/students/oss/3.png' alt={'3'} />
        <img src='/img/projects/students/oss/4.png' alt={'4'} />
      </>
    ),
    links: [
      {
        name: "Article",
        link: "https://www.oss.kr/dev_competition_activities/show/82225b9d-52fa-4ae6-8f5b-7b2af6f3150d?category_item_id=268&page=2",
      },
    ],
  },
  {
    category: "Project",
    title: "국방부 오픈소스 아카데미 해커톤 2016",
    slug: "#osam",
    imageUrl: "img/projects/students/osam/1.png",
    subtitle:
      "[수상 - 우수상] 인프라 분야 온라인 강의 시청 후 선정되서, 4일 간 해커톤",
    period: "2016.10.10 ~ 2016.10.14 (4일)",
    roles: "팀장, 인프라",
    tech: "Monit, HAProxy, KeepAlived, NginX, HeartBeat, MariaDB, DRBD, stress, nmon, monit, wireshark, strace, abrt, valgrind",
    description: (
      <>
        <h3>개발목표</h3>
        <p>
            1. 공개 SW 기반 다양한 고가용성 시스템 구축
        </p>
        <p>
            2. 시스템 안정성과 가용성 향상 및 무중지/무중단 서비스 구현
        </p>
        <p>
            3. 다중화, 스케일 아웃 등이 가능한 인프라 구축
        </p>
        <p>
            4. 고가용성 시스템 구축 스크립트 개발
        </p>

        <h3>시스템 개발 방안</h3>
        <p>
            - 로드벨런서로 부하분산과 Web 으로 프록시가 되도록 처리
        </p>
        <p>
            - WEB 를 이중화하여 서버의 부담을 분산
        </p>
        <p>
            - DB 를 DRBD 와 Replication 으로 데이터를 보존
        </p>   

        <hr />
        <h3>프로젝트 이미지</h3> 
        <img src='/img/projects/students/osam/2.png' alt={'2'} />
        <img src='/img/projects/students/osam/3.png' alt={'3'} />
        <img src='/img/projects/students/osam/4.png' alt={'4'} />
        <img src='/img/projects/students/osam/5.png' alt={'5'} />
        <img src='/img/projects/students/osam/6.png' alt={'6'} />
        <img src='/img/projects/students/osam/7.png' alt={'7'} />
        <img src='/img/projects/students/osam/8.png' alt={'8'} />
        <img src='/img/projects/students/osam/9.png' alt={'9'} />
        <img src='/img/projects/students/osam/10.png' alt={'10'} />
        <img src='/img/projects/students/osam/11.png' alt={'11'} />
      </>
    ),
  },
];

export default projects;
