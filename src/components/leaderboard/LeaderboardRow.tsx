interface Props {
  rank: number;
  user: any;
}

export default function LeaderboardRow({
  rank,
  user,
}: Props) {
  return (
    <tr className="border-b border-white/10">

      <td className="p-5 text-white font-bold">
        #{rank}
      </td>

      <td className="p-5 text-white">
        {user.full_name || user.username}
      </td>

      <td className="p-5 text-indigo-400">
        {user.level || 1}
      </td>

      <td className="p-5 text-orange-400">
        🔥 {user.streak}
      </td>

      <td className="p-5 text-green-400">
        {user.career_score}
      </td>

      <td className="p-5 text-yellow-400">
        ⭐ {user.xp}
      </td>

    </tr>
  );
}