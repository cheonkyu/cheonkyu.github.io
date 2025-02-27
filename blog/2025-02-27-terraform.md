# terraform

## IaC란 (Understand Infrastructure as Code (IaC) concepts)

HashiCorp Terraform은 버전 관리, 재사용 및 공유가 가능한 사람이 읽을 수 있는 구성 파일로 클라우드 및 온프레미스 리소스를 모두 정의할 수 있는 코드 도구로서의 인프라이다.

- human-readable
- version
- reuse
- share
- automation

providers : Amazon Web Services, Azure, Google Cloud Platform, Oracle Cloud Infrastructure, and Docker.

Terraform workflow : write, plan, apply
![1](https://developer.hashicorp.com/_next/image?url=https%3A%2F%2Fcontent.hashicorp.com%2Fapi%2Fassets%3Fproduct%3Dterraform%26version%3Drefs%252Fheads%252Fv1.10%26asset%3Dwebsite%252Fimg%252Fdocs%252Fintro-terraform-workflow.png%26width%3D2038%26height%3D1773&w=3840&q=75&dpl=dpl_HQEf3W17qL1EjnSp3jAaigMmMgQT)

- Track your infrastructure : plan/apply로 프로비져닝, real-world 상태를 state 파일에 저장
- Automate changes : Terraform 구성 파일은 선언적. 즉, 인프라의 최종 상태를 설명
- Standardize configurations : module로 표준화
- Collaborate : VCS( Version Control System)

https://developer.hashicorp.com/terraform/intro

## Terraform vs Other Iac

Terraform State의 목적 (장점)

- Mapping to the Real World
- Metadata
- Performance
- Syncing

## Understand Terraform basics

### provider

alias, 다음 처럼 참조 `<PROVIDER NAME>.<ALIAS>`

```terraform
provider "aws" {
  alias  = "usw1"
  region = "us-west-1"
}

provider "aws" {
  alias  = "usw2"
  region = "us-west-2"
}

module "tunnel" {
  source    = "./tunnel"
  providers = {
    aws.src = aws.usw1
    aws.dst = aws.usw2
  }
}
```

LockFile

`terraform init` 수행 시 lock 파일 생성 (`.terraform.lock.hcl`)

## Terraform Core

- Infrastructure as code: reading and interpolating configuration files and modules
- Resource state management
- Construction of the Resource Graph
- Plan execution
- Communication with plugins over RPC

## Terraform Plugins

Go언어로 작성됨
RPC 기반 통신

https://developer.hashicorp.com/terraform/plugin/how-terraform-works

## Debugging Terraform

`TF_LOG` = 테라폼 구성 파일 로그 (`TRACE, DEBUG, INFO, WARN or ERROR`)

`TF_LOG_CORE` or `TF_LOG_PROVIDER`= 테라폼 자체 로그 디버깅용

`TF_LOG_PATH` = '로그 경로'

---
