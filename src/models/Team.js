import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, 'Please provide a team name'],
    unique: true,
    maxlength: [50, 'Team name cannot be more than 50 characters'],
  },
  totalTimeMs: {
    type: Number,
    required: true,
  },
  formattedTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
