import type { SupabaseClient } from '@supabase/supabase-js';

const getURL = async (name: string, bucket: string, supabase: SupabaseClient) => {
	return await supabase.storage.from(bucket).createSignedUrl(name, 6000);
};

export const getBannerURL = async (grantId: string, supabase: SupabaseClient) => {
	return await getURL(grantId, 'banners', supabase);
};

export const listGrantDocuments = async (grantId: string, supabase: SupabaseClient) => {
	return await supabase.storage.from('documents').list(grantId);
};

export const getGrantDocumentURL = async (
	grantId: string,
	fileName: string,
	supabase: SupabaseClient
) => {
	return await getURL(`${grantId}/${fileName}`, 'documents', supabase);
};

export const getRequiredDocumentURL = async (
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
		console.log("Couldn't find document");
		console.log(error);
		return { data, error };
	}

	return {
		urlObject: await getURL(`${userId}/${docId}/${data[0].name}`, 'required_documents', supabase),
		fileName: data[0].name
	};
};
