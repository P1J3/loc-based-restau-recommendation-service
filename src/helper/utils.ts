import * as proj4 from 'proj4';

// EPSG:5174 (보정된 중부원점 좌표계) 정의
proj4.defs(
  'EPSG:5174',
  '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43',
);

// EPSG:4326 (WGS84) 정의
proj4.defs('EPSG:4326', proj4.WGS84);

export function convertCoordinates(
  x: number,
  y: number,
): { lat: number; lon: number } {
  // EPSG:5174 -> EPSG:4326 (WGS84) 변환
  const [lon, lat] = proj4('EPSG:5174', 'EPSG:4326', [x, y]);

  // 결과 반환
  return { lat: parseFloat(lat.toFixed(6)), lon: parseFloat(lon.toFixed(6)) };
}

export function formatDateString(dateString: string): Date {
  if (!dateString.includes('-')) {
    // 날짜 형식이 숫자만 있는 경우 (예: 20010915)
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1; // 월은 0부터 시작
    const day = parseInt(dateString.substring(6, 8), 10);
    return new Date(year, month, day);
  } else {
    // 날짜 형식이 YYYY-MM-DD인 경우
    return new Date(dateString);
  }
}

export function formatDateTimeString(dateTimeString: string): Date {
  // 이미 YYYY-MM-DD HH:mm:ss 형식이라고 가정하고 처리
  return new Date(dateTimeString);
}
