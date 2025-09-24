import { getDb } from '$db/db';
import { json } from '@sveltejs/kit';

export async function GET() {
	const db = await getDb();
	const user = db.collection('user');
	const papers = db.collection('papers');

	const userCount = await user.countDocuments();
	const paperCount = await papers.countDocuments();

	return json({
		userCount: userCount,
		paperCount: paperCount
	});
}
