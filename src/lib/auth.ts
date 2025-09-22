import { betterAuth } from 'better-auth';
import { anonymous } from 'better-auth/plugins';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { getDb } from '$db/db';
import { polar, checkout, portal } from '@polar-sh/better-auth';
import { Polar } from '@polar-sh/sdk';
// import { authClient } from './auth_client';

// Polar
const polarClient = new Polar({
	accessToken: process.env.POLAR_ACCESS_TOKEN
});

// Create a function to initialize auth with the database
const createAuth = async () => {
	try {
		const db = await getDb();
		return betterAuth({
			database: mongodbAdapter(db),
			emailAndPassword: {
				enabled: true
			},
			session: {
				expiresIn: 60 * 60 * 24 * 7, // 7 days
				updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
			},
			socialProviders: {
				google: {
					clientId: process.env.GOOGLE_CLIENT_ID as string,
					clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
					prompt: 'select_account+consent'
				},
				github: {
					clientId: process.env.GITHUB_CLIENT_ID as string,
					clientSecret: process.env.GITHUB_CLIENT_SECRET as string
				},
				huggingface: {
					clientId: process.env.HUGGINGFACE_CLIENT_ID as string,
					clientSecret: process.env.HUGGINGFACE_CLIENT_SECRET as string
				},
				twitter: {
					clientId: process.env.TWITTER_CLIENT_ID as string,
					clientSecret: process.env.TWITTER_CLIENT_SECRET as string
				}
			},
			plugins: [
				anonymous(),
				polar({
					client: polarClient,
					createCustomerOnSignUp: true,
					use: [
						portal(),
						checkout({
							products: [
								{
									productId: 'f44fbcbe-b2cc-48f4-acc8-ef6d888533a9',
									slug: 'free'
								},
								{
									productId: 'fff68be3-0d9e-4013-b446-24f68bb3f6b3',
									slug: 'plus'
								},
								{
									productId: '134b3384-7ecf-4d15-b774-f2e16e2aecc2',
									slug: 'pro'
								}
							],
							successUrl: process.env.POLAR_SUCCESS_URL,
							authenticatedUsersOnly: false,
							allowDiscountCodes: true
						})
					]
				})
			]
		});
	} catch (error) {
		console.error('Failed to initialize auth:', error);
		throw error; // This will prevent the app from starting if auth initialization fails
	}
};

// Initialize auth and export it
export const auth = createAuth();
