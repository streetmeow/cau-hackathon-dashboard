import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTeamData } from '../api';

export default function TeamDetail() {
  const { teamId } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchTeam = async () => {
      try {
        const res = await getTeamData(teamId);
        
        if (mounted) setRecords(res); // API 응답을 그대로 저장
      } catch (e) {
        console.error(e);
      }
    };
    fetchTeam();
    return () => { mounted = false; };
  }, [teamId]);

  return (
    <div className="team-detail">
      <h2>#{teamId} 팀의 상세 기록</h2>
      <table>
        <thead>
          <tr>
            <th>제출 시각</th>
            <th>성능 점수</th>
          </tr>
        </thead>
        <tbody>
          {/* -- 2. [수정됨] -- */}
          {/* 고유한 key를 위해 timestamp와 score를 조합 (같은 초에 2개 이상 등록 대비) */}
          {records.map((r) => (
            <tr key={r.timestamp + r.score}>
            
              {/* --- 3. [수정됨] --- */}
              {/* API가 이미 변환한 KST 문자열(r.timestamp)을 그대로 출력 */}
              <td>{r.timestamp}</td>
              <td>{r.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}