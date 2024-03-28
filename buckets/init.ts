import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const PUBLIC_SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const PUBLIC_SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
	console.log('Err in .env');
	process.exit(-1);
}

console.log('Setting up buckets');

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

const { data: dataT, error: errorT } = await supabase.storage.getBucket('banners');

if (dataT) {
	console.log(errorT);
	console.log('Bucket already exists... continuing');
	process.exit(-1);
}

const { data, error } = await supabase.storage.createBucket('banners');

if (data) {
	console.log("Created bucket. If using the bucket doesn't work, please look into RLS policies");
} else {
	console.log('Err occurred creating bucket.');
	console.log(error);
}
