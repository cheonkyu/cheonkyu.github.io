# Terraform

DevOps 철학

- 문화(Culture) - 하나의 문화를 만들어 나가기
- 자동화(Automation) - 자동화를 통해 효율성과 빠른 속도를 지향하기
- 측정(Measurement) - 지표를 측정하여 지속적으로 개선하기
- 공유(Share) - 공유를 통한 발전
- 축적(File Up & Pile Up) - 기록을 축적하고 더욱 개선하기

## lifecycle

- create_before_destory : 리소스 수정 시 신규 리소스를 우선 생성하고 기존 리소스를 삭제
- prevent_destroy: 해당 리소스를 삭제하려 할 때 명시적으로 거부
- ignore_changes : 리소스 요소에 선언된 인수의 변경 사항을 테라폼 실행 시 무시
- precondition : 리스트 요소에 선언된 인수의 조건을 검증
- postcondition: Plan과 Apply 이후의 결과를 속성 값으로 검증

## homebrew 설치 권한 이슈

https://stackoverflow.com/questions/16432071/how-to-fix-homebrew-permissions

```
As Homebrew does not drop privileges on installation you would be giving all
build scripts full access to your system.
keke@MacBookPro ~ % sudo chown -R $(whoami) $(brew --prefix)/\*
```

terraform upgrade 1.2.3 -> 1.10.0

```
keke@MacBookPro ~ % brew upgrade terraform
==> Auto-updating Homebrew...
Adjust how often this is run with HOMEBREW_AUTO_UPDATE_SECS or disable with
HOMEBREW_NO_AUTO_UPDATE. Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
==> Downloading https://ghcr.io/v2/homebrew/portable-ruby/portable-ruby/blobs/sha256:d9faa506c014dedc0b034a68103ba75c9a58242f4d6c67b6ca0f649c39602bcf
######################################################################### 100.0%
==> Pouring portable-ruby-3.3.7.arm64_big_sur.bottle.tar.gz
==> Auto-updated Homebrew!
Updated 1 tap (homebrew/services).
No changes to formulae or casks.

==> Upgrading 1 outdated package:
terraform 1.2.3 -> 1.5.7
Warning: terraform has been deprecated because it changed its license to BUSL on the next release! It will be disabled on 2025-04-04.
==> Downloading https://ghcr.io/v2/homebrew/core/terraform/manifests/1.5.7-1
######################################################################### 100.0%
==> Fetching terraform
==> Downloading https://ghcr.io/v2/homebrew/core/terraform/blobs/sha256:87e8faf4
######################################################################### 100.0%
==> Upgrading terraform
  1.2.3 -> 1.5.7
==> Pouring terraform--1.5.7.arm64_sequoia.bottle.1.tar.gz
==> Caveats
We will not accept any new Terraform releases in homebrew/core (with the BUSL license).
The next release changed to a non-open-source license:
https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license
See our documentation for acceptable licences:
  https://docs.brew.sh/License-Guidelines
==> Summary
🍺  /opt/homebrew/Cellar/terraform/1.5.7: 7 files, 62.3MB
==> Running `brew cleanup terraform`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
Removing: /opt/homebrew/Cellar/terraform/1.2.3... (6 files, 66.2MB)
==> `brew cleanup` has not been run in the last 30 days, running now...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
Removing: /Users/keke/Library/Caches/Homebrew/act_bottle_manifest--0.2.61... (7.2KB)
Removing: /Users/keke/Library/Caches/Homebrew/aom_bottle_manifest--3.9.1... (21.7KB)
Removing: /Users/keke/Library/Caches/Homebrew/aom--3.9.1... (3.8MB)
Removing: /Users/keke/Library/Caches/Homebrew/boost_bottle_manifest--1.85.0... (30.3KB)
Removing: /Users/keke/Library/Caches/Homebrew/boost--1.85.0... (94MB)
Removing: /Users/keke/Library/Caches/Homebrew/c-ares_bottle_manifest--1.33.0... (7.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/c-ares--1.33.0... (266.5KB)
Removing: /Users/keke/Library/Caches/Homebrew/ca-certificates_bottle_manifest--2024-07-02... (1.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/ca-certificates--2024-07-02... (129.1KB)
Removing: /Users/keke/Library/Caches/Homebrew/edencommon_bottle_manifest--2024.08.12.00... (24.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/edencommon--2024.08.12.00... (420.7KB)
Removing: /Users/keke/Library/Caches/Homebrew/fb303_bottle_manifest--2024.08.12.00... (23.9KB)
Removing: /Users/keke/Library/Caches/Homebrew/fb303--2024.08.12.00... (732KB)
Removing: /Users/keke/Library/Caches/Homebrew/fbthrift_bottle_manifest--2024.08.12.00... (23.3KB)
Removing: /Users/keke/Library/Caches/Homebrew/fbthrift--2024.08.12.00... (5MB)
Removing: /Users/keke/Library/Caches/Homebrew/fizz_bottle_manifest--2024.08.12.00... (20.6KB)
Removing: /Users/keke/Library/Caches/Homebrew/fizz--2024.08.12.00... (993.3KB)
Removing: /Users/keke/Library/Caches/Homebrew/folly_bottle_manifest--2024.08.12.00... (19.5KB)
Removing: /Users/keke/Library/Caches/Homebrew/folly--2024.08.12.00... (6.3MB)
Removing: /Users/keke/Library/Caches/Homebrew/fribidi_bottle_manifest--1.0.15... (7.5KB)
Removing: /Users/keke/Library/Caches/Homebrew/fribidi--1.0.15... (141.2KB)
Removing: /Users/keke/Library/Caches/Homebrew/gdbm_bottle_manifest--1.24... (7.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/gdbm--1.24... (272.6KB)
Removing: /Users/keke/Library/Caches/Homebrew/gdk-pixbuf_bottle_manifest--2.42.12... (22.2KB)
Removing: /Users/keke/Library/Caches/Homebrew/gdk-pixbuf--2.42.12... (766.3KB)
Removing: /Users/keke/Library/Caches/Homebrew/giflib_bottle_manifest--5.2.2... (7.2KB)
Removing: /Users/keke/Library/Caches/Homebrew/giflib--5.2.2... (149.2KB)
Removing: /Users/keke/Library/Caches/Homebrew/git_bottle_manifest--2.46.0... (15.4KB)
Removing: /Users/keke/Library/Caches/Homebrew/glib_bottle_manifest--2.80.4... (23.0KB)
Removing: /Users/keke/Library/Caches/Homebrew/glib--2.80.4... (8.5MB)
Removing: /Users/keke/Library/Caches/Homebrew/gnutls_bottle_manifest--3.8.4... (17.9KB)
Removing: /Users/keke/Library/Caches/Homebrew/gnutls--3.8.4... (3.0MB)
Removing: /Users/keke/Library/Caches/Homebrew/gradle_bottle_manifest--8.10... (37.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/gradle--8.10... (189.1MB)
Removing: /Users/keke/Library/Caches/Homebrew/graphviz_bottle_manifest--12.1.0... (54.9KB)
Removing: /Users/keke/Library/Caches/Homebrew/graphviz--12.1.0... (2.9MB)
Removing: /Users/keke/Library/Caches/Homebrew/harfbuzz_bottle_manifest--9.0.0... (31.3KB)
Removing: /Users/keke/Library/Caches/Homebrew/harfbuzz--9.0.0... (2.5MB)
Removing: /Users/keke/Library/Caches/Homebrew/highway_bottle_manifest--1.2.0... (7.7KB)
Removing: /Users/keke/Library/Caches/Homebrew/highway--1.2.0... (733.9KB)
Removing: /Users/keke/Library/Caches/Homebrew/jasper_bottle_manifest--4.2.4... (8.3KB)
Removing: /Users/keke/Library/Caches/Homebrew/jasper--4.2.4... (465.7KB)
Removing: /Users/keke/Library/Caches/Homebrew/jenv_bottle_manifest--0.5.7... (1.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/jenv--0.5.7... (22.1KB)
Removing: /Users/keke/Library/Caches/Homebrew/jpeg-turbo_bottle_manifest--3.0.3... (7.7KB)
Removing: /Users/keke/Library/Caches/Homebrew/jpeg-turbo--3.0.3... (1.1MB)
Removing: /Users/keke/Library/Caches/Homebrew/jpeg-xl_bottle_manifest--0.10.3... (23.0KB)
Removing: /Users/keke/Library/Caches/Homebrew/jpeg-xl--0.10.3... (11.9MB)
Removing: /Users/keke/Library/Caches/Homebrew/kotlin_bottle_manifest--2.0.10... (5.9KB)
Removing: /Users/keke/Library/Caches/Homebrew/kotlin--2.0.10... (79.8MB)
Removing: /Users/keke/Library/Caches/Homebrew/libavif_bottle_manifest--1.1.1... (22.9KB)
Removing: /Users/keke/Library/Caches/Homebrew/libavif--1.1.1... (195.0KB)
Removing: /Users/keke/Library/Caches/Homebrew/libnghttp2_bottle_manifest--1.61.0... (7.4KB)
Removing: /Users/keke/Library/Caches/Homebrew/libnghttp2--1.61.0... (224.2KB)
Removing: /Users/keke/Library/Caches/Homebrew/librsvg_bottle_manifest--2.58.2... (37.2KB)
Removing: /Users/keke/Library/Caches/Homebrew/librsvg--2.58.2... (14.8MB)
Removing: /Users/keke/Library/Caches/Homebrew/libslirp_bottle_manifest--4.8.0... (17.3KB)
Removing: /Users/keke/Library/Caches/Homebrew/libslirp--4.8.0... (148.1KB)
Removing: /Users/keke/Library/Caches/Homebrew/libsodium_bottle_manifest--1.0.20... (7.4KB)
Removing: /Users/keke/Library/Caches/Homebrew/libsodium--1.0.20... (309.2KB)
Removing: /Users/keke/Library/Caches/Homebrew/libssh_bottle_manifest--0.11.0... (9.3KB)
Removing: /Users/keke/Library/Caches/Homebrew/libx11_bottle_manifest--1.8.10... (15KB)
Removing: /Users/keke/Library/Caches/Homebrew/libx11--1.8.10... (2.1MB)
Removing: /Users/keke/Library/Caches/Homebrew/libxcb_bottle_manifest--1.17.0... (15.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/libxcb--1.17.0... (977.2KB)
Removing: /Users/keke/Library/Caches/Homebrew/llvm_bottle_manifest--18.1.8... (38.2KB)
Removing: /Users/keke/Library/Caches/Homebrew/llvm--18.1.8... (481.2MB)
Removing: /Users/keke/Library/Caches/Homebrew/mvfst_bottle_manifest--2024.08.12.00... (20.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/mvfst--2024.08.12.00... (1.6MB)
Removing: /Users/keke/Library/Caches/Homebrew/ncurses_bottle_manifest--6.5... (11.2KB)
Removing: /Users/keke/Library/Caches/Homebrew/ncurses--6.5... (2.4MB)
Removing: /Users/keke/Library/Caches/Homebrew/netpbm_bottle_manifest--11.02.09... (13.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/netpbm--11.02.09... (1.7MB)
Removing: /Users/keke/Library/Caches/Homebrew/nettle_bottle_manifest--3.10... (8.4KB)
Removing: /Users/keke/Library/Caches/Homebrew/nettle--3.10... (970.0KB)
Removing: /Users/keke/Library/Caches/Homebrew/node_bottle_manifest--22.6.0... (18.2KB)
Removing: /Users/keke/Library/Caches/Homebrew/node--22.6.0... (19.8MB)
Removing: /Users/keke/Library/Caches/Homebrew/openexr_bottle_manifest--3.2.4... (8.4KB)
Removing: /Users/keke/Library/Caches/Homebrew/openexr--3.2.4... (1.9MB)
Removing: /Users/keke/Library/Caches/Homebrew/openjdk_bottle_manifest--22.0.2... (38.7KB)
Removing: /Users/keke/Library/Caches/Homebrew/openjdk--22.0.2... (190.3MB)
Removing: /Users/keke/Library/Caches/Homebrew/openjdk@17_bottle_manifest--17.0.12... (38.6KB)
Removing: /Users/keke/Library/Caches/Homebrew/openjdk@21_bottle_manifest--21.0.4... (38.7KB)
Removing: /Users/keke/Library/Caches/Homebrew/openjdk@21--21.0.4... (191.7MB)
Removing: /Users/keke/Library/Caches/Homebrew/openssl@1.1_bottle_manifest--1.1.1w... (10.9KB)
Removing: /Users/keke/Library/Caches/Homebrew/openssl@3_bottle_manifest--3.3.1... (9.2KB)
Removing: /Users/keke/Library/Caches/Homebrew/openssl@3--3.3.1... (9.5MB)
Removing: /Users/keke/Library/Caches/Homebrew/p11-kit_bottle_manifest--0.25.5-1... (10.0KB)
Removing: /Users/keke/Library/Caches/Homebrew/p11-kit--0.25.5... (874.3KB)
Removing: /Users/keke/Library/Caches/Homebrew/pango_bottle_manifest--1.54.0... (32.0KB)
Removing: /Users/keke/Library/Caches/Homebrew/pango--1.54.0... (817KB)
Removing: /Users/keke/Library/Caches/Homebrew/pcre2_bottle_manifest--10.44... (8.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/pcre2--10.44... (2MB)
Removing: /Users/keke/Library/Caches/Homebrew/pyenv_bottle_manifest--2.4.10... (26.7KB)
Removing: /Users/keke/Library/Caches/Homebrew/python@3.10_bottle_manifest--3.10.14_1... (25.0KB)
Removing: /Users/keke/Library/Caches/Homebrew/python@3.10--3.10.14_1... (14.1MB)
Removing: /Users/keke/Library/Caches/Homebrew/python@3.11_bottle_manifest--3.11.9_1... (24.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/python@3.12_bottle_manifest--3.12.5... (24.4KB)
Removing: /Users/keke/Library/Caches/Homebrew/python@3.12--3.12.5... (15.5MB)
Removing: /Users/keke/Library/Caches/Homebrew/qemu_bottle_manifest--9.0.2... (53.6KB)
Removing: /Users/keke/Library/Caches/Homebrew/qemu--9.0.2... (104.4MB)
Removing: /Users/keke/Library/Caches/Homebrew/ruby_bottle_manifest--3.3.4... (16.4KB)
Removing: /Users/keke/Library/Caches/Homebrew/snappy_bottle_manifest--1.2.1... (7.3KB)
Removing: /Users/keke/Library/Caches/Homebrew/snappy--1.2.1... (45.3KB)
Removing: /Users/keke/Library/Caches/Homebrew/sqlite_bottle_manifest--3.46.1... (8.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/sqlite--3.46.1... (2.2MB)
Removing: /Users/keke/Library/Caches/Homebrew/unbound_bottle_manifest--1.21.0... (14.5KB)
Removing: /Users/keke/Library/Caches/Homebrew/unbound--1.21.0... (2.8MB)
Removing: /Users/keke/Library/Caches/Homebrew/virtualenv_bottle_manifest--20.26.3... (15.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/wangle_bottle_manifest--2024.08.12.00... (21.1KB)
Removing: /Users/keke/Library/Caches/Homebrew/wangle--2024.08.12.00... (836.0KB)
Removing: /Users/keke/Library/Caches/Homebrew/watchman_bottle_manifest--2024.08.12.00... (32.6KB)
Removing: /Users/keke/Library/Caches/Homebrew/watchman--2024.08.12.00... (3.5MB)
Removing: /Users/keke/Library/Caches/Homebrew/webp_bottle_manifest--1.4.0... (14.1KB)
Removing: /Users/keke/Library/Caches/Homebrew/webp--1.4.0... (874.8KB)
Removing: /Users/keke/Library/Caches/Homebrew/xorgproto_bottle_manifest--2024.1... (14.1KB)
Removing: /Users/keke/Library/Caches/Homebrew/xorgproto--2024.1... (699.7KB)
Removing: /Users/keke/Library/Caches/Homebrew/xz_bottle_manifest--5.6.2... (9.4KB)
Removing: /Users/keke/Library/Caches/Homebrew/xz--5.6.2... (569KB)
Removing: /Users/keke/Library/Caches/Homebrew/z3_bottle_manifest--4.13.0... (7.4KB)
Removing: /Users/keke/Library/Caches/Homebrew/z3--4.13.0... (12.2MB)
Removing: /Users/keke/Library/Caches/Homebrew/zstd_bottle_manifest--1.5.6... (9.1KB)
Removing: /Users/keke/Library/Caches/Homebrew/zstd--1.5.6... (758.6KB)
Removing: /Users/keke/Library/Caches/Homebrew/portable-ruby-3.3.4_1.arm64_big_sur.bottle.tar.gz... (11.1MB)
Removing: /Users/keke/Library/Logs/Homebrew/gdk-pixbuf... (208B)
Removing: /Users/keke/Library/Logs/Homebrew/python@3.12... (2 files, 2KB)
Removing: /Users/keke/Library/Logs/Homebrew/glib... (64B)
Removing: /Users/keke/Library/Logs/Homebrew/openssl@3... (64B)
Removing: /Users/keke/Library/Logs/Homebrew/ca-certificates... (64B)
Removing: /Users/keke/Library/Logs/Homebrew/librsvg... (197B)
Removing: /Users/keke/Library/Logs/Homebrew/python@3.10... (2 files, 2.5KB)
Removing: /Users/keke/Library/Logs/Homebrew/node... (64B)
Removing: /Users/keke/Library/Logs/Homebrew/unbound... (64B)
Removing: /Users/keke/Library/Logs/Homebrew/gnutls... (64B)
```
