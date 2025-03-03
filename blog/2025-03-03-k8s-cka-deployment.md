# k8s cka deployment

```
문제1.
작업 클러스터 : k8s
Deployment를 이용해 nginx 파드를 3개 배포한 다음 컨테이너 이미지 버전을 rolling update하고
update record를 기록합니다. 마지막으로 컨테이너 이미지를 previous version으로 roll back 합니다.
•name: eshop-payment
•Image : nginx
•Image version: 1.16
•update image version: 1.17
•label: app=payment, environment=production
```

```
% kubectl create deployment eshop-payment --image=nginx:1.17 --dry-run=client -o wide > eshop-payment.yaml
```

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: payment
    environment: production
  name: eshop-payment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payment
      environment: production
  template:
    metadata:
      labels:
        app: payment
        environment: production
    spec:
      containers:
        - image: nginx:1.16
          name: nginx
```

```
%  kubectl rollout history deployment eshop-payment
deployment.apps/eshop-payment
REVISION  CHANGE-CAUSE
1         kubectl apply --filename=eshop-payment.yaml --record=true
2         kubectl set image deployment eshop-payment nginx=nginx:1.17 --record=true
```

```
% kubectl rollout undo deployment eshop-payment
deployment.apps/eshop-payment rolled back
```
