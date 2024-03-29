import type { SupabaseClient } from '@supabase/supabase-js';

const upload = async (name: string, bucket: string, file: File, supabase: SupabaseClient) => {
	return await supabase.storage.from(bucket).upload(name, file, {
		cacheControl: '3600',
		upsert: true
	});
};

export const uploadBanner = async (grantId: string, file: File, supabase: SupabaseClient) => {
	return await upload(`${grantId}`, 'banners', file, supabase);
};

export const uploadRequiredDocument = async (
	userId: string,
	docId: string,
	file: File,
	supabase: SupabaseClient
) => {
	return await upload(`${userId}/${docId}/${file.name}`, 'required_documents', file, supabase);
};

export const uploadGrantDocument = async (
	grantId: string,
	file: File,
	supabase: SupabaseClient
) => {
	return await upload(`${grantId}/${file.name}`, 'documents', file, supabase);
};
