import { useEffect, useState } from 'react';
import { getScores } from '../api';

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchScores = async () => {
      try {
        const result = await getScores(); // API가 이미 best_score로 정렬 완료
        
        // --- 1. [추가됨] 순위 계산 로직 ---
        let rank = 1;
        const rankedData = result.map((team, index) => {
          
          // 첫 번째 항목(index 0)이 아니면서,
          // 현재 점수가 이전 항목의 점수보다 낮을 때만 순위를 업데이트
          if (index > 0 && team.best_score < result[index - 1].best_score) {
            // 순위는 (배열 인덱스 + 1)이 됨 (예: 3등)
            rank = index + 1;
          }
          
          // 점수가 같다면 'rank' 변수 값이 유지되어 동일 순위가 됨
          return {
            ...team,
            rank: rank // 계산된 순위를 객체에 추가
          };
        });
        // --- 로직 끝 ---

        if (mounted) setData(rankedData); // 순위가 포함된 데이터로 state 업데이트
      } catch (e) {
        console.error(e);
      }
    };
    fetchScores();
    const interval = setInterval(fetchScores, 30000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  return (
    <div className="leaderboard">
      <h2>실시간 리더보드</h2>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>팀 번호</th>
            <th>최고 성능</th>
            <th>제출 시각</th>
            <th>상세 보기</th>
          </tr>
        </thead>
        <tbody>
          {data.map((team, idx) => ( // idx는 이제 top3 스타일에만 사용
            <tr key={team.team_id} className={team.rank <= 3 ? 'top3' : ''}>
              
              {/* --- 2. [수정됨] --- */}
              {/* idx+1 대신, 미리 계산한 team.rank를 출력 */}
              <td>{team.rank}</td>
              
              <td>{team.team_id}</td>
              <td>{team.best_score ?? '-'}</td>
              <td>{team.best_time ?? '-'}</td>
              <td><a href={`#/${team.team_id}`}>상세 보기</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}