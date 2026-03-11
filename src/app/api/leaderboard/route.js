import connectMongo from '@/lib/mongodb';
import Team from '@/models/Team';

export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();
    const { teamName, totalTimeMs, formattedTime } = body;

    if (!teamName || !totalTimeMs || !formattedTime) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    // Check if team exists to avoid duplicates
    const existingTeam = await Team.findOne({ teamName });
    if (existingTeam) {
      return new Response(JSON.stringify({ error: "Team name already taken" }), { status: 400 });
    }

    const team = await Team.create({
      teamName,
      totalTimeMs,
      formattedTime,
    });

    return new Response(JSON.stringify({ success: true, team }), { status: 201 });
  } catch (error) {
    console.error("MongoDB Error:", error);
    return new Response(JSON.stringify({ error: "Failed to submit score" }), { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongo();
    // Fetch top 10 teams sorted by lowest time taken
    const teams = await Team.find({}).sort({ totalTimeMs: 1 }).limit(10);
    return new Response(JSON.stringify({ success: true, data: teams }), { status: 200 });
  } catch (error) {
    console.error("MongoDB Fetch Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch leaderboard" }), { status: 500 });
  }
}
