// import axios from 'axios';
import { getDb } from '$db/db';
import { json } from '@sveltejs/kit';

import { addValuesToPapers } from '../utils/add_values_to_papers';
import { getSession } from '../utils/session_manager';

const db = await getDb();
const papers = db.collection('papers');
const likedPapers = db.collection('likedpapers');

export async function GET({ request }) {
	// Get User ID
	const session = await getSession(request);
	const userID = session?.user.id;

	// Get User Liked Papers
	const result = await likedPapers.find({ userID: userID }).toArray();

	// Extract paperIDs from the likes
	const paperIDs = result.map((like) => like.paperID);

	// Fetch papers using the extracted paperIDs
	const rawLikedPapers = await papers.find({ extractedID: { $in: paperIDs } }).toArray();

	for (const eachLikedPaper of rawLikedPapers) {
		eachLikedPaper.isBookmarked = true;
	}

	// Add dynamic values
	const likedPapersWithValues = await addValuesToPapers(rawLikedPapers, userID);

	// Response
	return json(likedPapersWithValues);
}
