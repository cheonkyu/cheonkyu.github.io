# terraform

## terraform 설치하기

https://developer.hashicorp.com/terraform/install?product_intent=terraform

## terraform workflow

![1](https://cdn.prod.website-files.com/63eb9bf7fa9e2724829607c1/64960ea7632f25da2ebe7449_lxJzhDuIBBvckonUSbRFXQsRtehzncJ1Q1HnK1LwuRiXhlnbb4GZPpCCi9Q18NFHAKtUZ6Z_Oo3Cc101eU5JkRMhRvH1sxg9ugZ8Wb6SEnejIsT0w-FkKJYXB8cla4BUErgGibyUeRI5kUb1fxphUw.png)

Terraform 주요 특징

- Infrastructure as Code
  정의한 코드를 쉽게 공유할 수 있어 효율적으로 협업 가능

- Execution Plan
  변경 계획과 변경 적용을 분리하여 변경 내용을 적용할 때 발생할 수 있는 실수를 줄일 수 있음

- Resource Graph
  사소한 변경이 인프라 전체에 어떤 영향을 미칠지 미리 확인
  종속성 그래프를 작성하여 이 그래프를 바탕으로 계획을 세우고, 이 계획을 적용했을 때 변경되는 인프라 상태를 확인

- Change Automation
  여러 장소에 같은 구성의 인프라를 구축하고 변경할 수 있도록 자동화할 수 있습니다. 인프라를 구축하는 데 드는 시간을 절약할 수 있고, 실수도 줄일 수 있습니다.
