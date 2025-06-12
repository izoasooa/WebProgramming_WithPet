const svgObject = document.getElementById('svg-map');
  const hospitalList = document.getElementById('hospital-list');
  let geojsonData = {};


  const regionNameMap = {
    seoul: "서울", busan: "부산", daegu: "대구", jeju: "제주",
    chungnam: "충남", gyeongnam: "경남", gyeongbuk: "경북",
    jeonbuk: "전북", chungbuk: "충북", gangwon: "강원",
    gyeonggi: "경기", jeonnam: "전남", daejeon: "대전",
    incheon: "인천", gwangju: "광주", ulsan: "울산", sejong: "세종"
  };

  const regionCenters = {
    seoul:    { x: 270.73, y: 253.478 },
    busan:    { x: 630.729, y: 746.478 },
    daegu:    { x: 540.729, y: 615.478 },
    incheon:  { x: 190, y: 265.608 },
    gwangju:  { x: 240.73, y: 762.478 },
    daejeon:  { x: 332.73, y: 517.478 },
    ulsan:    { x: 660.729, y: 674.478 },
    sejong:   { x: 306.73, y: 451.478 },
    gyeonggi: { x: 320.73, y: 325.478 },
    gangwon:  { x: 466, y: 196.608 },
    chungbuk: { x: 387, y: 395.608 },
    chungnam: { x: 222, y: 480.336 },
    jeonbuk:  { x: 294.73, y: 635.478 },
    jeonnam:  { x: 265.73, y: 820.478 },
    gyeongbuk:{ x: 560.729, y: 468.478 },
    gyeongnam:{ x: 466.729, y: 710.478 },
    jeju:     { x: 180.73, y: 1143.478 }
  };

  fetch('hospitals_en_fixed.geojson')
    .then(res => res.json())
    .then(data => {
      geojsonData = data;
    });

  svgObject.addEventListener('load', () => {
    const svgDoc = svgObject.contentDocument;
    const svg = svgDoc.documentElement;

    Object.entries(regionCenters).forEach(([id, coords]) => {
      const { x, y } = coords;
      const displayName = regionNameMap[id] || id;

      const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textEl.setAttribute('x', x);
      textEl.setAttribute('y', y);
      textEl.setAttribute('font-size', '35');
      textEl.setAttribute('font-weight', 'bold');
      textEl.setAttribute('fill', '#4e944f');
      textEl.setAttribute('text-anchor', 'middle');
      textEl.style.cursor = 'pointer';
      textEl.textContent = displayName;

      textEl.addEventListener('click', () => {
        const hospitals = geojsonData.features.filter(f => f.properties.region === id);
        const scrollArea = hospitalList.querySelector('.hospital-scroll-area');
        const title = hospitalList.querySelector('.hospital-title');

        title.textContent = `${displayName} 24시 병원 목록`;

        if (hospitals.length === 0) {
          scrollArea.innerHTML = `<strong>${displayName}</strong><br>등록된 병원이 없습니다.`;
          return;
        }

        scrollArea.innerHTML = '';
        hospitals.forEach(f => {
          const p = f.properties;
          const coords = f.geometry.coordinates;
          const mapLink = `https://map.naver.com/v5/map?c=${coords[0]},${coords[1]},18,0,0,0,d`;

        scrollArea.innerHTML += `
        <a href="${mapLink}" target="_blank" class="hospital-item" style="display: block; text-decoration: none; color: inherit;">
        <div style="font-weight: bold;">${p.name}</div>
        <div>${p.address}</div>
        <div>${p.phone}</div>
        </a>
        `;
      });
      });

      svg.appendChild(textEl);
    });
  });