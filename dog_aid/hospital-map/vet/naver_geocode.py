import json
import requests
import time

# 네이버 API 키 입력
NAVER_CLIENT_ID = 's5t1lub02c'       # ← 여기 본인 값으로 교체
NAVER_CLIENT_SECRET = 'HzMCK676CtPcyLfhsGv1MJFYKPWzbqJkd9kODSlJ'  # ← 여기 본인 값으로 교체

# 주소 변환 함수
def geocode_naver(address):
    url = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode'
    headers = {
        'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET
    }
    params = {'query': address}
    res = requests.get(url, headers=headers, params=params)
    data = res.json()
    if data.get('addresses'):
        addr_info = data['addresses'][0]
        return {
            '도로명주소': addr_info.get('roadAddress'),
            '위도': float(addr_info.get('y')),
            '경도': float(addr_info.get('x'))
        }
    return None

# 원본 JSON 로드
with open('hospitals_도로명주소.json', 'r', encoding='utf-8') as f:
    hospital_data = json.load(f)

# 전체 변환 실행
for region in hospital_data:
    for hospital in hospital_data[region]:
        address = hospital.get('주소', '')
        if address:
            print(f"📍 변환 중: {address}")
            result = geocode_naver(address)
            if result:
                hospital['도로명주소'] = result['도로명주소']
                hospital['lat'] = result['위도']
                hospital['lng'] = result['경도']
            time.sleep(0.15)  # 너무 빠른 요청 방지

# 저장
with open('hospitals_geocoded.json', 'w', encoding='utf-8') as f:
    json.dump(hospital_data, f, ensure_ascii=False, indent=2)

print("✅ 변환 완료: hospitals_geocoded.json 생성됨")
