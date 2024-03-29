import type { SupabaseClient } from '@supabase/supabase-js';

const download = async (name: string, bucket: string, supabase: SupabaseClient) => {
	return await supabase.storage.from(bucket).download(name);
};

export const downloadBanner = async (grantId: string, supabase: SupabaseClient) => {
	return await download(`${grantId}.png`, 'banners', supabase);
};

export const listGrantDocuments = async (grantId: string, supabase: SupabaseClient) => {
	return await supabase.storage.from('documents').list(grantId);
};

export const downloadGrantDocument = async (
	grantId: string,
	fileName: string,
	supabase: SupabaseClient
) => {
	return await download(`${grantId}/${fileName}`, 'documents', supabase);
};

export const downloadRequiredDocument = async (
	userId: string,
	docId: string,
	supabase: SupabaseClient
) => {
	const { data, errors } = await supabase.storage
		.from('required_documents')
		.list(`${userId}/${docId}`, {
			limit: 1
		});

	if (!data) {
		console.log("Couldn't find document");
		return { data, errors };
	}

	return await download(`${userId}/${docId}/${data[0].name}`, 'required_documents', supabase);
};
