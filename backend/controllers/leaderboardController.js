import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

/**
 * @desc    Send the leaderboard
 * @route   GET /api/leaderboard
 * @access  Public
*/

const getLeaderboard = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("name score _id").sort({ score: "desc" })

    res.json(users)
})

export {
    getLeaderboard
}