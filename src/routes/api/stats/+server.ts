import { getDb } from '$db/db';
import { json } from '@sveltejs/kit';

export async function GET() {
	const db = await getDb();
	const user = db.collection('user');

	const userCount = await user.countDocuments();

	return json({
		userCount: userCount
	});
}
