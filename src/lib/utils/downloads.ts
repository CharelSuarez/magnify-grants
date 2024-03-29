import type { SupabaseClient } from '@supabase/supabase-js';

const download = async (name: string, bucket: string, supabase: SupabaseClient) => {
	return await supabase.storage.from(bucket).download(name);
};

export const downloadBanner = async (grantId: string, supabase: SupabaseClient) => {
	return await download(`${grantId}.png`, 'banners', supabase);
};

export const downloadRequiredDocument = async (
	userId: string,
	docId: string,
	supabase: SupabaseClient
) => {
	const { data, error } = await supabase.storage
		.from('required_documents')
		.list(`${userId}/${docId}`, {
			limit: 1
		});

	if (!data) {
		return { data, error };
	}

	return await download(`${userId}/${docId}/${file.name}`, 'required_documents', supabase);
};
