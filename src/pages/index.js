import React, { useEffect, useRef, useState } from "react";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./styles.module.css";
import SocialLinks from "./components/_SocialLinks";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const mainRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(1536);
  const [bannerHeight, setBannerHeight] = useState(256);

  useEffect(() => {
    const tempHeaderHeight = Math.max(384, window.innerHeight);
    setHeaderHeight(tempHeaderHeight);
    setBannerHeight(Math.max(256, tempHeaderHeight / 2));
    setIsLoading(false);
    mainRef.current.hidden = false;
  }, []);

  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <header className={styles.heroBanner} style={{ minHeight: headerHeight }}>
        <div
          className={styles.heroBannerWrapper}
          style={{
            minHeight: bannerHeight,
            display: isLoading ? "none" : "block",
          }}
        >
          <p>안녕하세요, 저는</p>
          <h1 className="text-success">김천규</h1>
          <p>입니다.</p>
          <p>
            저는 <span className="text-warning">풀스택 개발자</span> 입니다. {" "}
            <span className="text-danger">"린하게 일하자!"</span>에 가치를 두고 개발하고 있습니다.
          </p>
          <SocialLinks />
          <p>
            <a href="#main">
              <button className="border-0 rounded p-2 pl-4 pr-0 bg-primary-900 hover:bg-primary-800 transition text-white text-lg cursor-pointer">
                whoami<span className="pl-1 animate-pulse">▎</span>
              </button>
            </a>
          </p>
        </div>
      </header>
      <main id="main" ref={mainRef} hidden={true}>
        <div className={styles.aboutHeader}>
          <h2 className="border-0 border-b-4 border-solid border-success">
            Who am I
          </h2>
        </div>
        <div className={styles.about}>
          <div>
            <img
              className={styles.aboutProfilePic}
              src={useBaseUrl("img/profilepic.jpg")}
            />
          </div>
          <div className={styles.aboutText}>
            <h2>반갑습니다.😄</h2>
            <p>
              🇰🇷 저는 <strong>풀스택 개발자</strong>입니다.
            </p>
            <p>
              👨‍💻 5년차 개발자(4년 7개월 근무)이며 <strong>키트웍스</strong>에서 팀장 역할을 수행했습니다.
            </p>
            <p>
              🎒 <strong>컴퓨터 공학</strong>을 전공했으며 <br />
              <strong>교내 장학금과 공모전</strong> 상금으로 학비 및 생활비를 마련했습니다.
            </p>
            <p>
              🌏 <strong>소프트웨어 마에스트로</strong> 9기 출신입니다.
            </p>
            <p>
              🪖 개발이 좋아서 군대도 육군 <strong>ATCIS운용병(전산병)</strong>를 지원했고 복무 중에 <strong>국방부 오픈소스 대회</strong>에 참여해서 수상까지 했습니다.
            </p>
            <p>"<strong>린하게 일하자!</strong>"</p>
            <p>
              🚀 간결함: Simple is best!!!.
            </p>
            <p>
              🛼 실용주의{" "}: 문제 정의를 명확하게 하는 것을 중요시 생각합니다. <br /> 문제를 바탕으로 MVP를 빠르게 만들고 고객의 반응을 느끼고 싶은 개발자입니다.
            </p>
            <p>
              📚 러닝커브: 다른 언어나 프레임워크가 더 효과적이라고 하면, 공부하고 습득하는 과정을 두려워하지 않습니다.
              3일 이내로 학습하고 실제 업무 코드에 적용해 보았습니다.
            </p>
            <p>
            </p>
          </div>
        </div>
        <section className={styles.directory}>
          <div className="container">
            <nav className="pagination-nav">
              <div className="pagination-nav__item">
                <Link className="pagination-nav__link" to={useBaseUrl("blog/")}>
                  <div className="pagination-nav__sublabel">Read</div>
                  <div className="pagination-nav__label">My blog</div>
                </Link>
              </div>
              <div className="pagination-nav__item pagination-nav__item--next">
                <Link className="pagination-nav__link" to={useBaseUrl("docs/")}>
                  <div className="pagination-nav__sublabel">Refer to</div>
                  <div className="pagination-nav__label">My docs</div>
                </Link>
              </div>
            </nav>
            <nav className="pt-4 pagination-nav">
              <div className="pagination-nav__item">
                <Link
                  className="pagination-nav__link"
                  to={useBaseUrl("projects/")}
                >
                  <div className="pagination-nav__sublabel">Check out</div>
                  <div className="pagination-nav__label">My projects</div>
                </Link>
              </div>
              <div className="pagination-nav__item pagination-nav__item--next">
                <a
                  className="pagination-nav__link"
                  href={useBaseUrl("pdf/이력서_김천규.pdf")}
                >
                  <div className="pagination-nav__sublabel">Download</div>
                  <div className="pagination-nav__label">My resume</div>
                </a>
              </div>
            </nav>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
